#!/usr/bin/env swift
import AppKit
import ApplicationServices
import ImageIO

// Keep the app's rendering and wallpaper together. Save raw captures in Downloads.
struct CaptureError: Error, CustomStringConvertible {
    let description: String
    init(_ description: String) { self.description = description }
}

func attribute(_ element: AXUIElement, _ name: String) -> CFTypeRef? {
    var value: CFTypeRef?
    return AXUIElementCopyAttributeValue(element, name as CFString, &value) == .success ? value : nil
}

func frame(of window: AXUIElement) throws -> CGRect {
    guard let positionValue = attribute(window, kAXPositionAttribute),
          let sizeValue = attribute(window, kAXSizeAttribute),
          CFGetTypeID(positionValue) == AXValueGetTypeID(),
          CFGetTypeID(sizeValue) == AXValueGetTypeID() else {
        throw CaptureError("Cannot read the Paguro window frame.")
    }
    var position = CGPoint.zero
    var size = CGSize.zero
    guard AXValueGetValue(positionValue as! AXValue, .cgPoint, &position),
          AXValueGetValue(sizeValue as! AXValue, .cgSize, &size) else {
        throw CaptureError("Cannot decode the Paguro window frame.")
    }
    return CGRect(origin: position, size: size)
}

func dictionary(_ rect: CGRect) -> [String: Double] {
    ["x": rect.minX, "y": rect.minY, "width": rect.width, "height": rect.height]
}

func capture() throws {
    let downloads = FileManager.default.urls(for: .downloadsDirectory, in: .userDomainMask).first
        ?? FileManager.default.homeDirectoryForCurrentUser.appendingPathComponent("Downloads", isDirectory: true)
    var output = downloads.appendingPathComponent("paguro-fullscreen-\(Int(Date().timeIntervalSince1970)).png").path
    var bundleID: String?
    var width = 1100.0
    var height = 700.0
    var arguments = Array(CommandLine.arguments.dropFirst())
    while !arguments.isEmpty {
        let argument = arguments.removeFirst()
        if argument == "--help" {
            print("Usage: swift tools/capture-paguro.swift [output.png] [--bundle-id ID] [--width 1100] [--height 700]")
            print("Default output: timestamped PNG and geometry JSON in Downloads.")
            return
        }
        if ["--bundle-id", "--width", "--height"].contains(argument) {
            guard !arguments.isEmpty else { throw CaptureError("Missing value for \(argument).") }
            let value = arguments.removeFirst()
            if argument == "--bundle-id" { bundleID = value }
            else {
                guard let number = Double(value), number.isFinite, number > 0 else {
                    throw CaptureError("\(argument) must be a positive number of points.")
                }
                if argument == "--width" { width = number } else { height = number }
            }
        } else if argument.hasPrefix("--") {
            throw CaptureError("Unknown option: \(argument).")
        } else { output = argument }
    }

    let outputURL = URL(fileURLWithPath: output).standardizedFileURL
    let geometryURL = outputURL.deletingPathExtension().appendingPathExtension("json")
    guard outputURL.pathExtension.lowercased() == "png" else { throw CaptureError("Use a .png output path.") }
    guard !FileManager.default.fileExists(atPath: outputURL.path),
          !FileManager.default.fileExists(atPath: geometryURL.path) else {
        throw CaptureError("Output already exists. Choose a new name to preserve the earlier capture.")
    }
    guard AXIsProcessTrusted(), CGPreflightScreenCaptureAccess() else {
        throw CaptureError("The app running this script needs Accessibility and Screen Recording permission in System Settings.")
    }
    guard let screen = NSScreen.screens.first else { throw CaptureError("No primary display found.") }
    let screenRect = CGRect(origin: .zero, size: screen.frame.size)
    let target = CGRect(x: ((screenRect.width - width) / 2).rounded(),
                        y: ((screenRect.height - height) / 2).rounded(), width: width, height: height)
    // Accessibility coordinates start at the primary screen's top-left.
    let usable = CGRect(x: screen.visibleFrame.minX,
                        y: screen.frame.maxY - screen.visibleFrame.maxY,
                        width: screen.visibleFrame.width, height: screen.visibleFrame.height)
    guard usable.contains(target) else { throw CaptureError("The requested centered window does not fit this display's usable area.") }

    let knownIDs = ["studio.anguria.paguro", "studio.anguria.paguro.debug", "studio.anguria.paguro.storetests"]
    let applications = NSWorkspace.shared.runningApplications.filter { app in
        if let bundleID { return app.bundleIdentifier == bundleID }
        return knownIDs.contains(app.bundleIdentifier ?? "")
    }
    var candidates: [(app: NSRunningApplication, window: AXUIElement, frame: CGRect)] = []
    for app in applications {
        let appElement = AXUIElementCreateApplication(app.processIdentifier)
        let windows = attribute(appElement, kAXWindowsAttribute) as? [AXUIElement] ?? []
        for window in windows {
            guard attribute(window, kAXSubroleAttribute) as? String == kAXStandardWindowSubrole,
                  attribute(window, kAXMinimizedAttribute) as? Bool != true,
                  let bounds = try? frame(of: window), bounds.width >= 400, bounds.height >= 300 else { continue }
            candidates.append((app, window, bounds))
        }
    }
    guard let selected = candidates.max(by: { $0.frame.width * $0.frame.height < $1.frame.width * $1.frame.height }) else {
        throw CaptureError("Open Paguro's main window first. The notification island is not a capture target.")
    }
    if attribute(selected.window, "AXFullScreen") as? Bool == true {
        throw CaptureError("Leave full-screen mode before making a centered window capture.")
    }

    let previousFront = NSWorkspace.shared.frontmostApplication
    let previousPointer = CGEvent(source: nil)?.location
    var hidden: [NSRunningApplication] = []
    defer {
        for app in hidden { app.unhide() }
        if let previousPointer { CGWarpMouseCursorPosition(previousPointer) }
        previousFront?.activate(options: [])
    }
    // Hide other windows temporarily so the glass sees the actual wallpaper.
    // Include the separate Paguro preview process, which can own a floating island.
    for app in NSWorkspace.shared.runningApplications where app.processIdentifier != selected.app.processIdentifier {
        if !app.isHidden && (app.activationPolicy == .regular || knownIDs.contains(app.bundleIdentifier ?? "")) {
            if app.hide() { hidden.append(app) }
        }
    }
    selected.app.activate(options: [])
    AXUIElementPerformAction(selected.window, kAXRaiseAction as CFString)
    var size = target.size
    var position = target.origin
    guard AXUIElementSetAttributeValue(selected.window, kAXSizeAttribute as CFString, AXValueCreate(.cgSize, &size)!) == .success,
          AXUIElementSetAttributeValue(selected.window, kAXPositionAttribute as CFString, AXValueCreate(.cgPoint, &position)!) == .success else {
        throw CaptureError("Paguro did not accept the window position or size.")
    }
    CGWarpMouseCursorPosition(CGPoint(x: max(20, target.minX - 24), y: target.midY))
    // Wait for native window movement, activation, and material animations.
    RunLoop.current.run(until: Date(timeIntervalSinceNow: 0.8))
    let actual = try frame(of: selected.window)
    guard abs(actual.minX - target.minX) <= 1, abs(actual.minY - target.minY) <= 1,
          abs(actual.width - width) <= 1, abs(actual.height - height) <= 1,
          selected.app.isActive else {
        throw CaptureError("Window placement or activation could not be verified; capture stopped.")
    }

    try FileManager.default.createDirectory(at: outputURL.deletingLastPathComponent(), withIntermediateDirectories: true)
    let process = Process()
    process.executableURL = URL(fileURLWithPath: "/usr/sbin/screencapture")
    process.arguments = ["-x", "-D1", "-t", "png", outputURL.path]
    try process.run()
    process.waitUntilExit()
    guard process.terminationStatus == 0,
          let source = CGImageSourceCreateWithURL(outputURL as CFURL, nil),
          let properties = CGImageSourceCopyPropertiesAtIndex(source, 0, nil) as? [String: Any],
          let pixelWidth = properties[kCGImagePropertyPixelWidth as String] as? Int,
          let pixelHeight = properties[kCGImagePropertyPixelHeight as String] as? Int else {
        throw CaptureError("The full-screen capture failed.")
    }
    let normalized = CGRect(x: actual.minX / screenRect.width, y: actual.minY / screenRect.height,
                            width: actual.width / screenRect.width, height: actual.height / screenRect.height)
    let metadata: [String: Any] = [
        "capturedAt": ISO8601DateFormatter().string(from: Date()),
        "bundleID": selected.app.bundleIdentifier ?? "",
        "display": screen.localizedName, "displayPoints": dictionary(screenRect),
        "imagePixels": ["width": pixelWidth, "height": pixelHeight],
        "windowPoints": dictionary(actual), "windowNormalized": dictionary(normalized),
        "backingScaleFactor": screen.backingScaleFactor,
        "coordinateOrigin": "top-left", "image": outputURL.lastPathComponent,
    ]
    try JSONSerialization.data(withJSONObject: metadata, options: [.prettyPrinted, .sortedKeys]).write(to: geometryURL)
    print("Centered \(selected.app.bundleIdentifier ?? "Paguro"): \(Int(actual.width))×\(Int(actual.height)) at \(Int(actual.minX)),\(Int(actual.minY))")
    print("PNG: \(outputURL.path) (\(pixelWidth)×\(pixelHeight))")
    print("Geometry: \(geometryURL.path)")
}

do { try capture() }
catch {
    FileHandle.standardError.write(Data("Capture failed: \(error)\n".utf8))
    exit(1)
}
