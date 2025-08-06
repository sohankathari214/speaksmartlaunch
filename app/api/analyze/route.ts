import { type NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("video") as unknown as File;
    const contextNotes = (data.get("contextNotes") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 🧠 Buffer the video file instead of streaming it
    const arrayBuffer = await file.arrayBuffer();
    const videoBuffer = Buffer.from(arrayBuffer);

    // 🧪 Send the buffer to FFmpeg for audio extraction
    const result = await new Promise((resolve, reject) => {
      const ffmpegProcess = spawn("ffmpeg", [
        "-i", "pipe:0", // Read from stdin
        "-vn",          // No video output
        "-acodec", "pcm_s16le", // Audio codec
        "-ar", "16000", // Sample rate
        "-ac", "1",     // Mono
        "-f", "wav",    // Output format
        "pipe:1"        // Write to stdout
      ]);

      let audioBuffer = Buffer.alloc(0);
      let errorOutput = "";

      // Pipe video buffer to stdin
      ffmpegProcess.stdin!.write(videoBuffer);
      ffmpegProcess.stdin!.end();

      // Capture audio output
      ffmpegProcess.stdout!.on("data", (chunk) => {
        audioBuffer = Buffer.concat([audioBuffer, chunk]);
      });

      ffmpegProcess.stderr!.on("data", (data) => {
        errorOutput += data.toString();
      });

      ffmpegProcess.on("close", async (code) => {
        if (code !== 0) {
          reject(new Error(`FFmpeg failed: ${errorOutput}`));
          return;
        }

        try {
          const pythonResult = await analyzeAudioWithPython(audioBuffer, contextNotes);
          resolve(pythonResult);
        } catch (err) {
          reject(err);
        }
      });

      ffmpegProcess.on("error", (error) => {
        reject(new Error(`FFmpeg process error: ${error.message}`));
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 }
    );
  }
}

// Same analyzeAudioWithPython function as before
async function analyzeAudioWithPython(audioBuffer: Buffer, contextNotes: string) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      path.join(process.cwd(), "python", "analyze_video.py"),
      contextNotes || ""
    ]);

    let output = "";
    let errorOutput = "";

    pythonProcess.stdin!.write(audioBuffer);
    pythonProcess.stdin!.end();

    pythonProcess.stdout!.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr!.on("data", (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed: ${errorOutput}`));
      } else {
        try {
          const analysis = JSON.parse(output.trim());
          resolve(analysis);
        } catch (e) {
          reject(new Error(`Failed to parse analysis result: ${output}`));
        }
      }
    });

    pythonProcess.on("error", (error) => {
      reject(new Error(`Python process error: ${error.message}`));
    });
  });
}
