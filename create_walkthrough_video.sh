#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
asset_dir="$project_dir/docs/assets"
tmp_dir="$project_dir/tmp/video"
output_dir="$project_dir/output/video"
font_regular="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
font_bold="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

mkdir -p "$tmp_dir" "$output_dir"

images=(
  "prototype-hero.jpg"
  "evidence-workbench.jpg"
  "health-timeline.jpg"
  "visit-brief.jpg"
  "decision-record.jpg"
  "method-safety.jpg"
)

labels=(
  "01 / OVERVIEW"
  "02 / CONTEXT MAP"
  "03 / HEALTH TIMELINE"
  "04 / VISIT BRIEF"
  "05 / HUMAN REVIEW"
  "06 / METHOD AND SAFETY"
)

titles=(
  "YOUR HEALTH DATA IS FRAGMENTED"
  "SEE THE PERSON AROUND THE DATA"
  "SEQUENCE IS NOT CAUSATION"
  "THE PATIENT CHOOSES THE QUESTIONS"
  "ACCOUNTABILITY STAYS HUMAN"
  "A PROTOTYPE WITH VISIBLE LIMITS"
)

bodies=(
  "PHIL turns scattered information into a clearer clinical conversation."
  "Biology, behavior, context, and care remain connected to their sources."
  "Events become prompts for inquiry, never an automated clinical conclusion."
  "Maya controls which priorities and questions belong in the brief."
  "Incomplete verification blocks approval and clinical judgment is not delegated."
  "No diagnosis. No treatment advice. No invented validation or outcomes."
)

for index in "${!images[@]}"; do
  number=$(printf "%02d" "$((index + 1))")
  input="$asset_dir/${images[$index]}"
  segment="$tmp_dir/segment-${number}.mp4"

  ffmpeg -hide_banner -loglevel error -y \
    -loop 1 -i "$input" \
    -frames:v 450 \
    -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=0x0B100F,zoompan=z='min(zoom+0.00007,1.026)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=450:s=1280x720:fps=30,drawbox=x=0:y=518:w=1280:h=202:color=0x0B100F@0.90:t=fill,drawtext=fontfile=${font_bold}:text='${labels[$index]}':fontcolor=0xD2B86C:fontsize=15:x=54:y=548,drawtext=fontfile=${font_bold}:text='${titles[$index]}':fontcolor=0xF4F0E7:fontsize=29:x=54:y=580,drawtext=fontfile=${font_regular}:text='${bodies[$index]}':fontcolor=0xB9BDB7:fontsize=18:x=54:y=628,drawtext=fontfile=${font_bold}:text='PHIL  |  PERSONAL HEALTH INTELLIGENCE LAYER':fontcolor=0x58B4A7:fontsize=12:x=54:y=680,drawtext=fontfile=${font_regular}:text='IMANI KIRIKA':fontcolor=0x8E958E:fontsize=12:x=w-tw-54:y=680,fade=t=in:st=0:d=0.55,fade=t=out:st=14.45:d=0.55" \
    -an -c:v libx264 -preset medium -crf 21 -pix_fmt yuv420p \
    "$segment"
done

concat_file="$tmp_dir/segments.txt"
: > "$concat_file"
for index in "${!images[@]}"; do
  number=$(printf "%02d" "$((index + 1))")
  printf "file '%s'\n" "$tmp_dir/segment-${number}.mp4" >> "$concat_file"
done

silent_video="$tmp_dir/PHIL_90_Second_Walkthrough_silent.mp4"
ffmpeg -hide_banner -loglevel error -y \
  -f concat -safe 0 -i "$concat_file" \
  -c copy "$silent_video"

final_video="$output_dir/PHIL_90_Second_Walkthrough.mp4"
ffmpeg -hide_banner -loglevel error -y \
  -i "$silent_video" \
  -f lavfi -t 90 -i anullsrc=r=48000:cl=stereo \
  -i "$project_dir/WALKTHROUGH_CAPTIONS.srt" \
  -map 0:v:0 -map 1:a:0 -map 2:s:0 \
  -c:v copy -c:a aac -b:a 128k -c:s mov_text \
  -metadata:s:s:0 language=eng -shortest \
  -movflags +faststart "$final_video"

printf "%s\n" "$final_video"
