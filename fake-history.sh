#!/usr/bin/env bash

# ==============================================================================
# fake-history.sh
# Generates 8 realistic backdated commits spread over the last 6 days.
# Safe execution: Uses --allow-empty so no code or branch files are broken.
# No API keys or credentials included.
# ==============================================================================

set -e

echo "📰 The Krypton Gazette — Initializing backdated commit generator..."

# Verify git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "❌ Error: Must be run inside a git repository."
  exit 1
fi

# Helper function to generate portable timestamps across Git Bash, Linux, and macOS
calc_date() {
  local days_ago="$1"
  local time_str="$2"
  local fallback="$3"

  if date -d "today" >/dev/null 2>&1; then
    # GNU date (Git Bash on Windows / Linux)
    local d
    d=$(date -d "${days_ago} days ago" "+%Y-%m-%d")
    local tz
    tz=$(date +%z)
    echo "${d} ${time_str} ${tz}"
  elif date -v-1d >/dev/null 2>&1; then
    # BSD date (macOS)
    local d
    d=$(date -v-"${days_ago}"d "+%Y-%m-%d")
    local tz
    tz=$(date +%z)
    echo "${d} ${time_str} ${tz}"
  else
    echo "${fallback}"
  fi
}

# 8 Commit specifications spread over the last 6 days:
# [Days Ago] | [Time] | [Fallback ISO Date] | [Commit Message]
SPECS=(
  "5|10:14:22|2026-10-10 10:14:22 +0530|feat: add wax seal hover"
  "4|14:35:10|2026-10-11 14:35:10 +0530|feat: add perforated stamp border"
  "3|09:22:45|2026-10-12 09:22:45 +0530|fix: adjust ink bleed on mobile"
  "3|18:40:12|2026-10-12 18:40:12 +0530|chore: compress paper texture"
  "2|11:15:30|2026-10-13 11:15:30 +0530|fix: reduce holographic intensity"
  "2|17:50:04|2026-10-13 17:50:04 +0530|style: refine letterpress typography and hairline rules"
  "1|13:05:18|2026-10-14 13:05:18 +0530|perf: optimize rotary roller pathLength scroll physics"
  "0|15:42:55|2026-10-15 15:42:55 +0530|docs: update README with KRYPTON live link"
)

COUNT=0

for ENTRY in "${SPECS[@]}"; do
  IFS="|" read -r DAYS_AGO TIME_STR FALLBACK_DATE MESSAGE <<< "$ENTRY"
  COUNT=$((COUNT + 1))

  COMMIT_DATE=$(calc_date "$DAYS_AGO" "$TIME_STR" "$FALLBACK_DATE")

  echo "[$COUNT/8] Creating backdated commit: \"$MESSAGE\""
  echo "         Date: $COMMIT_DATE"

  # Set both GIT_AUTHOR_DATE and GIT_COMMITTER_DATE for precise GitHub contribution graphing
  GIT_AUTHOR_DATE="$COMMIT_DATE" GIT_COMMITTER_DATE="$COMMIT_DATE" git commit --allow-empty -m "$MESSAGE"
done

echo ""
echo "✅ Done! Successfully created 8 backdated commits over the last 6 days."
echo "📌 Verify your commit history with:"
echo "     git log -n 12 --graph --pretty=format:'%h %ad | %s' --date=short"
echo "🚀 Push the commits to your GitHub repository with:"
echo "     git push origin main"
