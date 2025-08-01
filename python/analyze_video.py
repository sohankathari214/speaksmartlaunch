from moviepy import VideoFileClip
import openai
import os
import sys
import json
import time

import os
from dotenv import load_dotenv

load_dotenv()  # loads variables from .env into the environment

api_key = os.getenv("OPENAI_API_KEY")

def analyze_video(video_path, audio_path, context_notes=""):
    try:
        # Start timer
        start_time = time.time()

        client = openai.OpenAI(api_key=api_key)
        
        # 1. Extract audio from video
        video = VideoFileClip(video_path)
        video.audio.write_audiofile(audio_path, codec='pcm_s16le', logger=None)
        
        # Properly close and cleanup video resources
        video.close()
        del video  # Explicitly delete the video object
        
        # 2. Transcribe audio with Whisper
        with open(audio_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )
        transcript_text = transcription.text

        # 3. Prepare prompt for analysis
        prompt = f"""
You are an expert public speaking coach and evaluator. You will analyze a speaker's transcript and return a JSON object with structured feedback.
You need to give specific advice that is targeted towards the specific speech the user gave. Do not be vauge. For example, if the user needs to improve a transition, clearly state what two points the transition is between and what specifically needs to be changed about it. 
When telling strengths, weaknesses, and feedback, mention SPECIFIC things the speech talked about and reference them. Do not be vague. Be as specific to the transcript as possible. 
Do not be afraid to give a low score, the goal of your task is to be as critical as possible. A low score is not mean, it just signals improvement. Only give out high scores (7+) if you truly believe the speech deserves it based on the metrics mentioned below.
If you do not mention something specific to the speech that couldn't apply to any speech, you did the job wrong. Please be specific.
Please return your output in the following exact JSON format (with real values filled in)::

{{
  "overall_score": float (from 1.0 to 10.0),
  "strengths": [list of 2-4 bullet points describing strengths],
  "improvements": [list of 2-4 bullet points describing areas for improvement],
  "detailed_metrics": {{
    "fluency": float,
    "logical flow": float,
    "coherence": float,
    "structure": float,
    "clarity of purpose": float,
    "engagement": float,
    "vocabulary variety": float,
    "filler words": float,
    "tone and delivery": float,
    "persuasiveness": float
  }},
  "recommendations": "One paragraph summarizing how the speaker can improve overall.",
  "transcript": "The original transcript here.",
  "analysis_duration": "Estimated analysis time in seconds (as a string, e.g. '42 seconds')"
}}

Transcript to analyze:
\"\"\"
{transcript_text}
\"\"\"

User notes for context (if any):
\"{context_notes}\"
"""

        # 4. Get structured analysis from LLM
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # or "gpt-4" if available
            messages=[
                {"role": "system", "content": "You are a helpful assistant that outputs analysis in strict JSON."},
                {"role": "user", "content": prompt}
            ]
        )

        raw_output = response.choices[0].message.content.strip()

        # 5. Extract valid JSON
        try:
            # Find the first and last curly brace to safely parse
            json_start = raw_output.find("{")
            json_end = raw_output.rfind("}") + 1
            json_string = raw_output[json_start:json_end]
            analysis_result = json.loads(json_string)
        except Exception as parse_err:
            return {"error": f"Failed to parse JSON output: {str(parse_err)}", "raw_output": raw_output}

        # 6. Attach original transcript and duration
        analysis_result["transcript"] = transcript_text
        analysis_result["analysis_duration"] = f"{int(time.time() - start_time)} seconds"

        return analysis_result

    except Exception as e:
        return {"error": f"Analysis failed: {str(e)}"}


def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Video path and audio path are required"}))
        sys.exit(1)

    video_path = sys.argv[1]
    audio_path = sys.argv[2]
    context_notes = sys.argv[3] if len(sys.argv) > 3 else ""

    if not os.path.exists(video_path):
        print(json.dumps({"error": "Video file not found"}))
        sys.exit(1)

    result = analyze_video(video_path, audio_path, context_notes)

    print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()
