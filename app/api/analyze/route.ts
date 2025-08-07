import { type NextRequest, NextResponse } from "next/server"
import { spawn } from "child_process"
import path from "path"
import { Readable } from "stream"
import { adminStorage } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const { videoUrl, contextNotes, fileName } = await request.json()

    if (!videoUrl) {
      return NextResponse.json({ error: "No video URL provided" }, { status: 400 })
    }

    console.log("Processing video from Firebase:", fileName)

    // Extract the file path from the Firebase URL to delete it later
    const urlParts = videoUrl.split('/o/')[1]?.split('?')[0]
    const filePath = decodeURIComponent(urlParts || '')

    // Stream the video directly from Firebase to FFmpeg for audio extraction
    const result = await new Promise((resolve, reject) => {
      const ffmpegProcess = spawn("ffmpeg", [
        "-i", videoUrl, // Read directly from Firebase URL
        "-vn", // No video output
        "-acodec", "pcm_s16le", // Audio codec
        "-ar", "16000", // Sample rate optimized for speech
        "-ac", "1", // Mono audio
        "-f", "wav", // Output format
        "pipe:1" // Write to stdout
      ], {
        stdio: ['pipe', 'pipe', 'pipe']
      })

      let audioBuffer = Buffer.alloc(0)
      let errorOutput = ""

      // Collect audio output
      ffmpegProcess.stdout!.on('data', (chunk) => {
        audioBuffer = Buffer.concat([audioBuffer, chunk])
      })

      // Collect error output
      ffmpegProcess.stderr!.on('data', (data) => {
        errorOutput += data.toString()
      })

      // Handle FFmpeg completion
      ffmpegProcess.on('close', async (code) => {
        if (code !== 0) {
          reject(new Error(`FFmpeg failed: ${errorOutput}`))
          return
        }

        try {
          // Now analyze the extracted audio with Python
          const pythonResult = await analyzeAudioWithPython(audioBuffer, contextNotes || "")
          
          // Clean up Firebase file after successful processing
          if (filePath) {
            try {
              await adminStorage.bucket().file(filePath).delete()
              console.log(`Successfully deleted Firebase file: ${filePath}`)
            } catch (deleteError) {
              console.error(`Failed to delete Firebase file: ${filePath}`, deleteError)
              // Don't fail the request if cleanup fails
            }
          }
          
          resolve(pythonResult)
        } catch (error) {
          reject(error)
        }
      })

      ffmpegProcess.on('error', (error) => {
        reject(new Error(`FFmpeg process error: ${error.message}`))
      })
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Analysis failed" 
    }, { status: 500 })
  }
}

async function analyzeAudioWithPython(audioBuffer: Buffer, contextNotes: string) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      path.join(process.cwd(), "python", "analyze_video.py"),
      contextNotes || ""
    ], {
      stdio: ['pipe', 'pipe', 'pipe']
    })

    let output = ""
    let errorOutput = ""

    // Send audio data directly to Python script via stdin
    pythonProcess.stdin!.write(audioBuffer)
    pythonProcess.stdin!.end()

    // Collect Python output
    pythonProcess.stdout!.on("data", (data) => {
      output += data.toString()
    })

    pythonProcess.stderr!.on("data", (data) => {
      errorOutput += data.toString()
    })

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed: ${errorOutput}`))
      } else {
        try {
          const analysis = JSON.parse(output.trim())
          resolve(analysis)
        } catch (e) {
          reject(new Error(`Failed to parse analysis result: ${output}`))
        }
      }
    })

    pythonProcess.on('error', (error) => {
      reject(new Error(`Python process error: ${error.message}`))
    })
  })
}
