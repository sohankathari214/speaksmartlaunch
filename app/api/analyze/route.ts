import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import { spawn } from "child_process"

export async function POST(request: NextRequest) {
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
    const filePath = path.join(tempDir, `upload_${Date.now()}_${file.name}`)
    await writeFile(filePath, buffer)

    // Run Python analysis script
    const result = await new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        path.join(process.cwd(), "python", "analyze_video.py"),
        filePath,
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
  }
}
