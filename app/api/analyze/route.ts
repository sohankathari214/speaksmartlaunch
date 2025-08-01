import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir, unlink } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import { spawn } from "child_process"

export async function POST(request: NextRequest) {
  let videoFilePath: string | null = null
  let audioFilePath: string | null = null

  try {
    const formData = await request.formData()
    const file = formData.get("video") as File
    const notes = formData.get("notes") as string

    if (!file) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 })
    }

    // Create temp directory if it doesn't exist
    const tempDir = path.join(process.cwd(), "temp")
    if (!existsSync(tempDir)) {
      await mkdir(tempDir, { recursive: true })
    }

    // Save uploaded file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    videoFilePath = path.join(tempDir, `upload_${Date.now()}_${file.name}`)
    await writeFile(videoFilePath, buffer)

    // Set audio file path
    audioFilePath = path.join(tempDir, `audio_${Date.now()}.wav`)

    // Run Python analysis script with both file paths
    const result = await new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        path.join(process.cwd(), "python", "analyze_video.py"),
        videoFilePath!,
        audioFilePath!,
        notes || "",
      ])

      let output = ""
      let error = ""

      pythonProcess.stdout.on("data", (data) => {
        output += data.toString()
      })

      pythonProcess.stderr.on("data", (data) => {
        error += data.toString()
      })

      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Python script failed: ${error}`))
        } else {
          try {
            const analysis = JSON.parse(output)
            resolve(analysis)
          } catch (parseError) {
            reject(new Error(`Failed to parse analysis result: ${parseError}`))
          }
        }
      })
    })

    return NextResponse.json({
      success: true,
      analysis: result,
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Analysis failed" }, { status: 500 })
  } finally {
    // Clean up files regardless of success or failure
    // Add a small delay to ensure Python script has finished with files
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      if (videoFilePath && existsSync(videoFilePath)) {
        await unlink(videoFilePath)
        console.log("Cleaned up video file:", videoFilePath)
      }
      if (audioFilePath && existsSync(audioFilePath)) {
        await unlink(audioFilePath)
        console.log("Cleaned up audio file:", audioFilePath)
      }
    } catch (cleanupError) {
      console.error("Error cleaning up files:", cleanupError)
      // Try again after another delay if first attempt fails
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        if (videoFilePath && existsSync(videoFilePath)) {
          await unlink(videoFilePath)
          console.log("Cleaned up video file on retry:", videoFilePath)
        }
        if (audioFilePath && existsSync(audioFilePath)) {
          await unlink(audioFilePath)
          console.log("Cleaned up audio file on retry:", audioFilePath)
        }
      } catch (retryError) {
        console.error("Failed to cleanup files even on retry:", retryError)
      }
    }
  }
}
