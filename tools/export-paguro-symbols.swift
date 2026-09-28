// Run on macOS: swift tools/export-paguro-symbols.swift public/paguro/controls
// Symbol names match Paguro WebToolbarView, UnifiedRailView and SpaceHeaderView.
import AppKit
let symbols = ["gearshape", "chevron.left", "chevron.right", "chevron.down", "arrow.clockwise", "bell", "bell.slash", "bell.slash.fill", "sidebar.left", "plus"]
for name in symbols {
    guard let source = NSImage(systemSymbolName: name, accessibilityDescription: nil)?.withSymbolConfiguration(NSImage.SymbolConfiguration(pointSize: 32, weight: name == "chevron.down" ? .semibold : .medium)) else { fatalError(name) }
    let canvas = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: 96, pixelsHigh: 96, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: canvas)
    let size = source.size
    let scale = 88 / max(size.width, size.height)
    let rect = NSRect(x: (96-size.width*scale)/2, y: (96-size.height*scale)/2, width: size.width*scale, height: size.height*scale)
    source.draw(in: rect)
    NSColor.white.setFill()
    NSRect(x:0,y:0,width:96,height:96).fill(using: .sourceIn)
    NSGraphicsContext.restoreGraphicsState()
    try canvas.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: CommandLine.arguments[1] + "/" + name + ".png"))
}
