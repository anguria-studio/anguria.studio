#!/bin/zsh
#
# Capture a fixed screen region with one app's window placed at exact
# coordinates — or the bare wallpaper, for the collapsed-card background.
#
#   ./tools/shot.sh obolo              capture Obolo
#   ./tools/shot.sh desktop            capture the wallpaper only, same region
#   ./tools/shot.sh obolo --windows    list the app's windows, capture nothing
#   ./tools/shot.sh obolo --hide-icons hide desktop icons for the capture
#   ./tools/shot.sh obolo --quit       quit the app afterwards
#   ./tools/shot.sh obolo --no-restore leave the other apps hidden
#
# Every other app is hidden for the capture and un-hidden afterwards. All four
# shots MUST use the same REGION or the wallpaper won't line up between the
# collapsed and expanded cards on the site.
#
# One-time setup: Terminal needs BOTH Accessibility (to move windows) and
# Screen Recording (to capture) in System Settings -> Privacy & Security.

set -eo pipefail

# ---- edit these between runs -------------------------------------------------
# Derived from the site's card geometry on a 2560x1440-point display, not
# picked by eye:
#   - The wallpaper is anchored to the row, so an EXPANDED card always covers
#     a fixed 1949pt band of the frame — a DIFFERENT band per card. Each app's
#     window is therefore centred in its own band: WIN_X is set per app below,
#     not here. Using one value for all three clips two of them.
#   - A 480px-tall card can show at most 1168pt of window height, whatever the
#     region height (it depends only on the card height and row width).
#   - y=40 clears the 30pt menu bar.
# If the card height in components/app-showcase.tsx changes, or the display
# resolution changes, these must be recomputed — and so must the image aspect
# baked into the wrapper height in components/app-showcase-card.tsx.
WIN_Y=240
WIN_W=1400                    # window size, in points
WIN_H=860
REGION="0,40,2560,1200"       # capture crop: x,y,width,height in points
# -----------------------------------------------------------------------------

OUT_DIR="${0:A:h}/shots"
KEY=""; LIST_WINDOWS=0; QUIT_AFTER=0; RESTORE=1; HIDE_ICONS=0
DID_ICONS=0; HIDDEN=""

for arg in "$@"; do
  case "$arg" in
    --windows)    LIST_WINDOWS=1 ;;
    --quit)       QUIT_AFTER=1 ;;
    --no-restore) RESTORE=0 ;;
    --hide-icons) HIDE_ICONS=1 ;;
    -*)           print -u2 "unknown flag: $arg"; exit 1 ;;
    *)            KEY="$arg" ;;
  esac
done

# PREF_TITLE: exact window title to prefer. Empty means "pick the largest
# window", which is what you want almost always — Obolo retitles its window to
# the current section ("Overview", "Upcoming", …) so matching by name is
# impossible, and an onboarding window is always smaller than the real one.
case "$KEY" in
  obolo)   APP="Obolo";      PREF_TITLE=""; WIN_X=274 ;;   # leftmost card — Obolo
  cleaner) APP="MacCleaner"; PREF_TITLE=""; WIN_X=580 ;;   # middle card — Scolo
  atoll)   APP="Atoll";      PREF_TITLE=""; WIN_X=886 ;;   # rightmost card — Blatta
  desktop) APP="";           PREF_TITLE=""; WIN_X=0   ;;   # wallpaper only, no window
  *) print -u2 "usage: ${0:t} {cleaner|obolo|atoll|desktop} [--windows] [--hide-icons] [--quit] [--no-restore]"; exit 1 ;;
esac

if [[ -z "$APP" ]] && (( LIST_WINDOWS )); then
  print -u2 -- "--windows needs an app, not 'desktop'."
  exit 1
fi

# ---- preflight: warn about anything that would land in frame -----------------
r=(${(s:,:)REGION})
menubar_h=$(osascript -e 'tell application "System Events" to tell process "Finder" to get item 2 of (get size of menu bar 1)' 2>/dev/null || print 0)
if (( r[2] < menubar_h )); then
  print "  ⚠ region starts at y=${r[2]} but the menu bar is ${menubar_h}pt tall —"
  print "    $(( menubar_h - r[2] ))pt of it is in frame, and the clock changes between shots."
fi

orient=$(defaults read com.apple.dock orientation 2>/dev/null || print bottom)
autohide=$(defaults read com.apple.dock autohide 2>/dev/null || print 0)
if [[ "$autohide" != 1 ]]; then
  bottom_edge=$(( r[2] + r[4] ))
  if [[ "$orient" != bottom ]] || (( bottom_edge > 990 )); then
    print "  ⚠ Dock is visible on the $orient edge — it may appear in the capture."
  fi
fi

[[ "$(defaults read com.apple.WindowManager GloballyEnabled 2>/dev/null || print 0)" == 1 ]] && \
  print "  ⚠ Stage Manager is on — its strip sits at the left edge, in frame."

# Desktop widgets (Sonoma+) live on the wallpaper and are NOT hidden by
# CreateDesktop=false — they belong to WindowManager, not Finder. Remove any
# by hand if they're in frame.

# ---- launch and place the app (skipped entirely for `desktop`) ---------------
if [[ -n "$APP" ]]; then
  find_app () {
    [[ -d "/Applications/$1.app" ]] && { print "/Applications/$1.app"; return 0 }
    local hit
    hit=$(ls -dt "$HOME"/Library/Developer/Xcode/DerivedData/"$1"-*/Build/Products/*/"$1".app 2>/dev/null | head -1) || true
    [[ -n "$hit" ]] && { print "$hit"; return 0 }
    return 1
  }

  APP_PATH=$(find_app "$APP") || { print -u2 "Can't find $APP.app — build it in Xcode first."; exit 1 }
  print "→ $APP  ($APP_PATH)"
  open -a "$APP_PATH"

  for _ in {1..30}; do
    running=$(osascript -e "tell application \"System Events\" to return (exists process \"$APP\")")
    [[ "$running" == "true" ]] && break
    sleep 0.2
  done
  [[ "$running" == "true" ]] || { print -u2 "$APP never appeared as a process."; exit 1 }
  sleep 1.2
else
  print "→ desktop (wallpaper only)"
fi

# ---- --windows: dump what's actually there, then stop ------------------------
if (( LIST_WINDOWS )); then
  osascript <<EOF
tell application "System Events" to tell process "$APP"
  set frontmost to true
  delay 0.3
  if (count of windows) is 0 then return "(no windows — menu-bar mode)"
  set out to ""
  repeat with w in windows
    set t to "(untitled)"
    try
      set t to name of w
    end try
    set p to position of w
    set s to size of w
    set out to out & "[" & t & "]  at " & (item 1 of p) & "," & (item 2 of p) & ¬
      "  size " & (item 1 of s) & "x" & (item 2 of s) & linefeed
  end repeat
  return out
end tell
EOF
  exit 0
fi

# ---- hide desktop icons (opt-in: use it on ALL shots or none) ----------------
if (( HIDE_ICONS )); then
  defaults write com.apple.finder CreateDesktop -bool false
  killall Finder 2>/dev/null || true
  DID_ICONS=1
  sleep 1.0
fi

# ---- hide every other app ----------------------------------------------------
# With APP empty, `n is not ""` is true for every process, so everything hides.
HIDDEN=$(osascript <<EOF
set hiddenNames to {}
tell application "System Events"
  -- Snapshot the names FIRST. Iterating the live "whose visible is true" query
  -- while setting visible to false re-evaluates it under us and walks off the
  -- end with error -1719.
  set names to name of (every process whose visible is true and background only is false)
  repeat with nRef in names
    set n to nRef as text
    if n is not "$APP" then
      try
        set visible of process n to false
        set end of hiddenNames to n
      end try
    end if
  end repeat
end tell
-- text item delimiters belongs to AppleScript, not to System Events: setting it
-- inside the tell block raises -10006.
set AppleScript's text item delimiters to linefeed
return hiddenNames as text
EOF
)

# Always restore system state, even if the capture below fails. Un-hide runs
# first: killall Finder spawns a new process that races AppleScript queries.
TRAPEXIT () {
  if (( RESTORE )) && [[ -n "$HIDDEN" ]]; then
    osascript <<EOF >/dev/null 2>&1
tell application "System Events"
  repeat with n in paragraphs of "$HIDDEN"
    try
      set visible of process n to true
    end try
  end repeat
end tell
EOF
  fi
  if (( DID_ICONS )); then
    defaults delete com.apple.finder CreateDesktop 2>/dev/null || true
    killall Finder 2>/dev/null || true
  fi
}

sleep 0.4   # let the hide animations finish

# ---- place the window --------------------------------------------------------
if [[ -n "$APP" ]]; then
  place () {
    osascript <<EOF
tell application "System Events" to tell process "$APP"
  set frontmost to true
  delay 0.3
  if (count of windows) is 0 then return "NO_WINDOWS"
  set target to missing value
  if "$PREF_TITLE" is not "" then
    repeat with w in windows
      try
        if name of w is "$PREF_TITLE" then set target to contents of w
      end try
    end repeat
  end if
  if target is missing value then
    set bestArea to -1
    repeat with w in windows
      set s to size of w
      set a to (item 1 of s) * (item 2 of s)
      if a > bestArea then
        set bestArea to a
        set target to contents of w
      end if
    end repeat
  end if
  set position of target to {$WIN_X, $WIN_Y}
  set size of target to {$WIN_W, $WIN_H}
  delay 0.4
  set p to position of target
  set s to size of target
  return ((item 1 of p) as text) & "," & ((item 2 of p) as text) & " " & ¬
         ((item 1 of s) as text) & "x" & ((item 2 of s) as text)
end tell
EOF
  }

  geometry=""
  for _ in {1..5}; do
    geometry=$(place)
    [[ "$geometry" != "NO_WINDOWS" ]] && break
    sleep 1
  done

  if [[ "$geometry" == "NO_WINDOWS" ]]; then
    print -u2 "$APP is running but has no windows (menu-bar mode)."
    print -u2 "Click its menu bar or Dock icon to open the window, then re-run."
    exit 1
  fi

  want="$WIN_X,$WIN_Y ${WIN_W}x${WIN_H}"
  if [[ "$geometry" == "$want" ]]; then
    print "  geometry ok: $geometry"
  else
    print "  ⚠ asked for $want but got $geometry — the app clamped it."
  fi
fi

mkdir -p "$OUT_DIR"
sleep 0.5
screencapture -x -R "$REGION" "$OUT_DIR/$KEY.png"
print "  saved $OUT_DIR/$KEY.png ($(sips -g pixelWidth -g pixelHeight "$OUT_DIR/$KEY.png" | tail -2 | tr -d ' \n' | sed 's/pixelWidth://;s/pixelHeight:/x/'))"

(( QUIT_AFTER )) && [[ -n "$APP" ]] && osascript -e "tell application \"$APP\" to quit"
exit 0
