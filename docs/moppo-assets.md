# Moppo landing assets

The cleanup screenshots are the supplied light and dark captures, cropped to
the app window and exported as WebP. The homepage card and hero use the supplied
`Ventura squared.jpg` wallpaper in both light and dark themes. The homepage uses
the full square image at 1024 × 1024 (`public/moppo/card-wallpaper.webp`). The hero
uses a 16:10 crop at 2160 × 1350 (`public/moppo/hero-wallpaper.webp`), keeping the
light blue along the top. The crop starts at (0, 200) and measures 6016 × 3760 in
the 6016 × 6016 source. Both WebP exports use quality 82 with metadata removed;
the square is about 16 KB and the landscape about 28 KB.
The hero currently uses stills, not a recorded loop.

The app icon always uses the rendered dark export from the app's
`docs/images/moppo-icon-dark.png`, including its lighting and beveled edge,
in both page themes. `components/apps/moppo-icon.tsx` shares it across the
homepage and app headers. The section mascot uses the app's
`MoppoMascot.json` vector outline with amber eyes. The hero screenshots are app window captures with the transparent shadow margin
cropped off (2360×1560 at 112,76), resized to 1800px wide and saved as WebP.
Sidebar tool symbols, also used as the hero tab icons, are
exported by `tools/export-moppo-symbols.swift`; Cleanup uses `MoppoFilled.svg`.

The two worktree dialog assets are cropped directly from the supplied light and
dark screenshots and exported as WebP. No surrounding app content ships. The
page clips their rounded corners and adds a diagonal striped frame.

Final assets are saved in `public/moppo/`: the hero screenshots
`{cleanup,storage,uninstaller,duplicates,dashboard}-{light,dark}.webp`, `worktree-light.webp`, `worktree-dark.webp`,
`app-icon-light.svg`, `app-icon-dark.png`, `card-wallpaper.webp`,
`hero-wallpaper.webp`, and `og-image.jpg`. Sidebar symbol
exports are in `public/moppo/tools/`.

## Worktree crops

Both source screenshots measure 2584 × 1858. The dialog crop starts at (792, 272)
and measures 1000 × 1240. The exports are 800 × 992, keeping enough resolution
for the 380px-wide dialog at 2× pixel density. The dark version is about 35 KB
and the light version about 41 KB. Both use the same crop and have no CSS offsets.

```sh
cwebp -crop 792 272 1000 1240 -resize 800 992 -q 90 -m 6 -sharp_yuv -metadata none input.png -o public/moppo/worktree-THEME.webp
```

## Launch placeholders

The direct download URL is a placeholder requested for the page draft.
Verify it before launch. The app's current minimum is macOS
15. The footer links to the site's localized Moppo privacy and terms pages.
