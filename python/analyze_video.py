import openai
import os
import sys
import json
import time
import tempfile
from dotenv import load_dotenv

load_dotenv()  # loads variables from .env into the environment

api_key = os.getenv("OPENAI_API_KEY")

def analyze_audio_from_stdin(context_notes=""):
    try:
        # Start timer
        start_time = time.time()

        client = openai.OpenAI(api_key=api_key)
        
        # Read audio data from stdin (piped from Node.js)
        audio_data = sys.stdin.buffer.read()
        
        if not audio_data:
            return {"error": "No audio data received from stdin"}

        # Create a temporary file for the audio data
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_audio:
            temp_audio.write(audio_data)
            temp_audio_path = temp_audio.name

        try:
            # Transcribe audio with Whisper
            with open(temp_audio_path, "rb") as audio_file:
                transcription = client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file
                )
            transcript_text = transcription.text

            # Clean up temporary file immediately after transcription
            os.unlink(temp_audio_path)

        except Exception as e:
            # Clean up temp file even if transcription fails
            if os.path.exists(temp_audio_path):
                os.unlink(temp_audio_path)
            raise e

        # Prepare prompt for analysis
        prompt = f"""
You are an expert public speaking coach and evaluator. You will analyze a speaker's transcript and return a JSON object with structured feedback.
You need to give specific advice that is targeted towards the specific speech the user gave. Do not be vague. For example, if the user needs to improve a transition, clearly state what two points the transition is between and what specifically needs to be changed about it. 
When telling strengths, weaknesses, and feedback, mention SPECIFIC things the speech talked about and reference them. Do not be vague. Be as specific to the transcript as possible. 
Do not be afraid to give a low score, the goal of your task is to be as critical as possible. A low score is not mean, it just signals improvement. Only give out high scores (7+) if you truly believe the speech deserves it based on the metrics mentioned below.
If you do not mention something specific to the speech that couldn't apply to any speech, you did the job wrong. Please be specific.
Please return your output in the following exact JSON format (with real values filled in):

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

        # Get structured analysis from LLM
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that outputs analysis in strict JSON."},
                {"role": "user", "content": prompt}
            ]
        )

        raw_output = response.choices[0].message.content.strip()

        # Extract valid JSON
        try:
            json_start = raw_output.find("{")
            json_end = raw_output.rfind("}") + 1
            json_string = raw_output[json_start:json_end]
            analysis_result = json.loads(json_string)
        except Exception as parse_err:
            return {"error": f"Failed to parse JSON output: {str(parse_err)}", "raw_output": raw_output}

        # Attach original transcript and duration
        analysis_result["transcript"] = transcript_text
        analysis_result["analysis_duration"] = f"{int(time.time() - start_time)} seconds"

        return analysis_result

    except Exception as e:
        return {"error": f"Analysis failed: {str(e)}"}


def main():
    context_notes = sys.argv[1] if len(sys.argv) > 1 else ""
    
    result = analyze_audio_from_stdin(context_notes)
    
    print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()
