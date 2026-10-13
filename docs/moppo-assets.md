# Moppo landing assets

The cleanup screenshots are the supplied light and dark captures, cropped to
the app window and exported as WebP. The hero shares Paguro's coastal wallpaper
family, with a different crop. It currently uses stills, not a recorded loop.

App icons use the native `AppIcon.icon/Assets/Moppo.svg` artwork and its light
and dark background colors. The section mascot uses the app's
`MoppoMascot.json` vector outline with amber eyes. Sidebar tool symbols are
exported by `tools/export-moppo-symbols.swift`; Cleanup uses `MoppoFilled.svg`.

The two worktree dialog assets were edited with the built-in image generation
tool, then cropped, given clean rounded edges, and exported as WebP. Their
header uses demo project and branch names. No surrounding app content ships.

Final assets are saved in `public/moppo/`: `cleanup-light.webp`,
`cleanup-dark.webp`, `worktree-light.webp`, `worktree-dark.webp`,
`app-icon-light.svg`, `app-icon-dark.svg`, and `og-image.jpg`. Sidebar symbol
exports are in `public/moppo/tools/`.

## Dialog edit prompt

The same prompt was used for each theme, with that theme's supplied screenshot
as the edit target and a transparent output background:

> Use case: text-localization and background-extraction. Asset type: light/dark
> theme Moppo worktree review dialog for a website. Extract only the centered
> rounded dialog, tightly cropped with transparent outside its rounded corners.
> Remove the app behind it and all black margins. Preserve the original
> typeface, borders, warnings, rows, spacing, buttons, and theme. Replace
> “MacCleanerNative · 2.4 MB” with “Moppo · 2.4 MB”, the branch with
> “feature/sidebar-icons”, and the path with
> “~/Projects/Moppo/worktrees/sidebar-icons”. Keep the folder icon and close
> button. Keep all other text the same. Do not add, remove, or redesign UI.
> Produce just the dialog, crisp and without an outside shadow.

## Launch placeholders

The direct download URL and Homebrew command are placeholders requested for
the page draft. Verify both before launch. The app's current minimum is macOS
15. The footer links to the site's localized Moppo privacy and terms pages.
