import type { AppSlug } from "../apps";
import type { FeatureId } from "../features";

export type AppCopy = {
  name: string;
  /** Two or three words. The line under the app name on the home showcase. */
  category: string;
  /** Alt text for the home-page screenshot. */
  shotAlt: string;
  /** One short line. Used on the home card and as the app-page subtitle. */
  tagline: string;
  /** One paragraph. App page only. */
  description: string;
  /** Exactly three, for layout balance. */
  features: { title: string; body: string }[];
};

/**
 * English is the source language and the single source of truth for the
 * `Dictionary` type — every other locale file is typed against it, so a
 * missing translation is a compile error.
 *
 * Every provisional string is marked `TODO(copy)`. To see what is still
 * unwritten: `grep -rn "TODO(copy)" lib/dictionaries`
 */
export const dictionary = {
  moppoPage: {
    seoTitle: "Moppo — A Careful Mac Cleaner",
    nav: "Explore Moppo",
    github: "View on GitHub",
    download: "Download",
    requirements: "macOS {version}+ · Apple silicon and Intel",
    hero: {
      title: "A tidy Mac.",
      accent: "Nothing lost.",
      body: "A careful cleaner for your Mac. Free and open source.",
      download: "Download for Mac",
      shotAlt: "Moppo’s Cleanup window, showing Safe to Remove and Needs Review categories on a Mac desktop.",
    },
    story: {
      title: "Clean up. Then double-check.",
      body: "Moppo finds what’s taking space and tells you which parts are safe to remove. You decide what goes, with a chance to put files back.",
      features: [
        { title: "Safe to remove, or needs a look.", body: "Every item is sorted into what Moppo can safely suggest and what deserves a second look: your documents, worktrees with local changes, apps still in use." },
        { title: "Files go to the Trash.", body: "Cleanup files go to the Trash, with a record in History. Changed your mind? Use Put Back while those files are still there." },
        { title: "Duplicates, verified.", body: "Files are compared by content, not just by name. Review identical and similar photos, and choose which copy to keep." },
        { title: "No account. No telemetry.", body: "Your scans stay on your Mac. No sign-in, no tracking, no uploads of your files. The source is on GitHub if you want to check." },
      ],
    },
    review: {
      title: "Knows what not to touch.",
      body: "Some folders look like junk but hold real work. Moppo shines a light on them before it suggests anything, and explains why.",
      shotAlt: "Moppo’s worktree review dialog flags local files and shows checks for uncommitted changes, unpushed commits, Git locks, and whether the worktree is in use.",
      points: [
        { title: "Git-aware.", body: "Worktrees with uncommitted changes, unpushed commits, or ignored local files are flagged for review." },
        { title: "In use? Hands off.", body: "Files and worktrees used by a running app or process are flagged, so you can quit it first." },
        { title: "A full history.", body: "Check what was removed, when it happened, and the recorded size. Put eligible files back from the same place." },
      ],
    },
    tools: {
      title: "Four tools. One app.",
      items: [
        { title: "Cleanup", body: "Caches, logs, leftovers" },
        { title: "Storage Explorer", body: "What fills your disk" },
        { title: "App Uninstaller", body: "Apps and what they leave" },
        { title: "Duplicates", body: "Duplicate files and photos" },
      ],
    },
    faqTitle: "A few things to know.",
    faq: [
      { id: "pricing", question: "Is Moppo really free?", answer: "Yes. Moppo is free and open source under the MIT license. No subscription, paid feature tiers, or account required." },
      { id: "automatic-removal", question: "Does Moppo delete anything on its own?", answer: "No. Scheduled scans can find things to review, but you choose what to remove. Safe to Remove is a suggestion, not permission to clean up automatically. Emptying the Trash is a separate action that asks for confirmation." },
      { id: "undo", question: "Can I undo a cleanup?", answer: "Use Put Back in History to restore eligible files while they are still in the Trash. Once the Trash is emptied, those files cannot be restored by Moppo. Packages removed through Homebrew and Docker images are exceptions: their removal tools do not support Put Back." },
      { id: "full-disk-access", question: "Why does Moppo ask for Full Disk Access?", answer: "macOS protects some folders from apps. Full Disk Access lets Moppo inspect protected locations for a more complete scan. You can continue with limited access, and Moppo reports what it cannot read. Scheduled scans and automatic storage measurements require Full Disk Access. You control the permission in System Settings." },
      { id: "app-store", question: "Why isn’t it on the App Store?", answer: "The Mac App Store requires apps to use Apple’s sandbox, which limits access to files outside an app’s own container. Moppo needs broader access to inspect caches, app leftovers, and developer folders across your Mac, so it is distributed as a direct download." },
      { id: "privacy", question: "Does it collect any data?", answer: "Moppo does not collect telemetry or upload scanned files, paths, or photos. Settings, measurements, and cleanup history stay on your Mac. Optional update checks contact the update server, and features that use Photos, iCloud, or Homebrew follow those services’ own settings." },
      { id: "system-requirements", question: "Which Macs are supported?", answer: "Moppo runs on macOS 15 or later, on both Apple silicon and Intel Macs." },
    ],
    also: { label: "Also from Anguria Studio", body: "A native home for your web apps." },
    footerNote: "A free, open-source Mac cleaner.",
  },
  paguroNotificationTest: {
    download: {
      heading: "Save a little sample.",
      description: "Download a small text file to check that files from your web apps can be saved through Paguro.",
      action: "Download sample file",
      check: "In Paguro, look for paguro-download-test.txt in Downloads and in the download indicator at the top of the app. Open the file to check its contents. Download it again to check that the first copy is kept. Other browsers may ask where to save it.",
    },
    camera: {
      heading: "Check your camera.",
      description: "Start a live preview, then allow camera access when asked. This uses the same camera permission as a video call in one of your web apps.",
      start: "Test camera",
      stop: "Stop camera",
      cancel: "Cancel preview",
      previewLabel: "Live camera preview",
      noJavaScript: "Enable JavaScript to test the camera.",
      privacy: "The preview stays on your device. Nothing is recorded or uploaded, and the microphone is not requested. Stop the camera with the button; it also stops when you leave or hide this page. Returning does not restart it.",
      status: {
        idle: "Your camera is off. It starts only when you choose Test camera.",
        requesting: "Waiting for camera access and the preview. You can cancel while permission is pending.",
        active: "Camera preview is live. Choose Stop camera when you are done.",
        stopped: "Camera stopped. Choose Test camera to start another preview.",
        unsupported: "Camera access is unavailable here. Open this page over HTTPS or on localhost in a browser with camera support.",
        denied: "Camera access was not allowed. Check this service’s camera setting in Paguro and camera access for Paguro in macOS System Settings, then try again.",
        unavailable: "No camera is available, or it could not start. Check that it is connected and available, then try again.",
        error: "The camera preview could not start. The camera has been stopped. Try again.",
      },
    },
    title: "Try Paguro.",
    intro: "Send sample notifications, download a file, and preview your camera. Try Paguro’s features without an account.",
    setup: [
      "Allow notifications for Paguro in macOS System Settings. Keep this service awake and unmuted, and turn off Do Not Disturb or Focus for the test.",
      "Choose a test below. You can stay here or switch to another service or app. Keep Paguro running and this page loaded until the test ends.",
    ],
    sendHeading: "Send a little hello.",
    timing: "The first notification is sent immediately once permission is granted. The sequence sends six different notifications, 3 seconds apart.",
    single: "Send one",
    sequence: "Send six notifications",
    cancel: "Cancel pending",
    noJavaScript: "Enable JavaScript to run the notification test.",
    status: {
      idle: "Ready when you are. Nothing is sent until you choose a test.",
      requesting: "Waiting for notification permission…",
      scheduled: "Test running. You can switch to another service or app now.",
      complete: "All notification requests are complete. You can run another test.",
      cancelled: "Pending requests cancelled. Notifications already shown remain until you dismiss them.",
      unsupported: "Notifications are unavailable in this browser. Open this page as a service in Paguro on your Mac.",
      denied: "Notification permission was not granted. Allow notifications in your browser settings, then try again. In Paguro, check macOS notification settings too.",
      error: "The page could not complete a notification request. Check notification permissions and try again.",
    },
    progress: "Requested {count} of {total} notifications.",
    history: "Notification requests from this test",
    unread: "{count} unread",
    markRead: "Mark all read",
    badgeNote: "The page title carries the unread count for Paguro’s service and Dock badges. Enable badges for this service. Updates can take up to 30 seconds in the background. Mark all read resets the count; dismissing an alert does not mark its message as read. Reloading resets this sample inbox.",
    deliveryNote: "This list confirms requests from the page, not delivery by macOS. Paguro’s settings, Focus, and app lock can suppress alerts. Cancel stops pending requests; reloading or leaving this page also stops the test.",
    tryHeading: "Two ways to stay in the loop.",
    checks: [
      { title: "macOS notifications", body: "In Paguro Settings → Notifications, enable Show macOS notifications and disable Show island alerts on notched displays. Also enable macOS notifications for this service. Start the six-notification test and switch to another app to check subsequent banners." },
      { title: "Notification island", body: "On a compatible notched display, enable Show island alerts on notched displays and disable Show macOS notifications. Run the six-notification test. Hover the island to expand it, scroll the stack, dismiss a card, and click a notification to return to this service." },
      { title: "App lock", body: "Start the six-notification test, then lock Paguro after the first notification. Remaining alerts should be suppressed while locked. Unlock explicitly to return to the app; suppressed notifications are not replayed." },
    ],
    scope: "These tests use standard browser features for notifications, file downloads, and camera access. No account is needed. They check Paguro’s handling of those features, not a third-party service’s login, message delivery, or video calls.",
    samples: [
      { title: "Paguro test · A little hello", body: "Your first sample notification. Everything starts here." },
      { title: "Paguro test · Coffee break", body: "Alex: Coffee in ten minutes? I’ll grab a table." },
      { title: "Paguro test · Project update", body: "The new mockups are ready for a look." },
      { title: "Paguro test · Weekend plans", body: "Sam: Saturday by the sea? I’ll bring snacks." },
      { title: "Paguro test · Reading list", body: "This week’s picks: a little inspiration." },
      { title: "Paguro test · All caught up", body: "Six samples, one place. Try scrolling and dismissing them." },
    ],
  },
  meta: {
    title: "Anguria Studio — Free, open-source apps for macOS",
    description:
      "Three small, free, open-source utilities for your Mac: Obolo, Moppo and Paguro.",
  },
  nav: {
    home: "Anguria Studio",
    github: "View on GitHub",
  },
  themeToggle: {
    /** Prefix for the button's accessible label, e.g. "Theme: System". */
    label: "Theme",
    system: "System",
    light: "Light",
    dark: "Dark",
  },
  hero: {
    // TODO(copy): the one line that sells the whole studio.
    title: "Small Mac apps, made with care.",
    // TODO(copy)
    titleAccent: "care",
    // TODO(copy)
    subtitle:
      "Three utilities that do one thing each, stay out of your way, and cost nothing. No accounts, no telemetry, no subscriptions — just open source.",
  },
  apps: {
    obolo: {
      name: "Obolo",
      category: "Subscription tracker",
      shotAlt:
        "The Obolo window on a Mac desktop, showing a month of subscriptions and what they cost.",
      tagline: "Subscription Tracking",
      // TODO(copy)
      description:
        "Simple and intuitive way to keep an eye on your recurring expanses",
      features: [
        // TODO(copy): three real features.
        {
          title: "Native",
          body: "Written in Swift. Fast, tiny, and gentle on your battery.",
        },
        {
          title: "Private",
          body: "Nothing leaves your Mac. No accounts, no analytics, no phoning home.",
        },
        {
          title: "Open source",
          body: "Every line is on GitHub. Read it, fork it, send a patch.",
        },
      ],
    },
    moppo: {
      name: "Moppo",
      category: "Mac cleaner",
      shotAlt:
        "The Moppo window on a Mac desktop, showing how much disk space can be reclaimed.",
      tagline: "Mac Cleaner",
      description: "Remove files safely. Clearly tell useful and useless apart",
      features: [
        // TODO(copy)
        {
          title: "Native",
          body: "Written in Swift. Fast, tiny, and gentle on your battery.",
        },
        {
          title: "Private",
          body: "Nothing leaves your Mac. No accounts, no analytics, no phoning home.",
        },
        {
          title: "Open source",
          body: "Every line is on GitHub. Read it, fork it, send a patch.",
        },
      ],
    },
    paguro: {
      name: "Paguro",
      category: "Web app workspace",
      shotAlt: "The Paguro window on a Mac desktop, showing web apps grouped in a sidebar.",
      tagline: "Native workspace for web apps",
      description: "Bring your messages, mail, and everyday web tools together in one native Mac workspace.",
      features: [
        {
          title: "Workspaces",
          body: "Organise services for work and personal use in one window."
        },
        {
          title: "Separate accounts",
          body: "Keep each account’s login session separate and stored on your Mac."
        },
        {
          title: "Notifications",
          body: "Choose macOS notifications or the optional notification island."
        }
      ]
    },
  } satisfies Record<AppSlug, AppCopy>,
  home: {
    hero: {
      title: "Free open source apps for your Mac",
      /** Rendered in the accent colour, with the Apple glyph in front of it. */
      titleAccent: "Mac",
    },
    statement: {
      line1: "Three utilities that do one thing each.",
      line2: "No subscriptions, no accounts, yours to keep.",
      accent: "No subscriptions",
    },
    /**
     * Keyed by FeatureId, not an array: the Record makes a missing or misspelt
     * feature a compile error in every translation, and keeps the grid's order
     * out of the dictionaries (that lives in lib/features.ts). Short labels
     * only — the grid is icon + label, with no body text.
     */
    features: {
      swift: "Crafted for macOS",
      glass: "Liquid Glass look",
      privacy: "Private by default",
      custom: "Customisable",
      speed: "Performant",
      source: "Open source",
    } satisfies Record<FeatureId, string>,
    /** Accessible name for the Dock-style row of app icons; never shown. */
    dockLabel: "Our apps",
  },
  paguroHero: {
    mobileCaptureAlt: "Paguro on a Mac desktop, with Claude open and web apps grouped into Personal and Work workspaces.",
    serviceOverlay: {
      services: "Preview services",
      personal: "Personal",
      work: "Work",
      expand: "Expand sidebar",
      collapse: "Collapse sidebar",
      captureAlt: "Paguro with WhatsApp open and its original translucent window over the desktop.",
    },
    previewTheme: "Preview appearance",
    previewSystem: "System preview",
    previewLight: "Light preview",
    previewDark: "Dark preview",

    title: "Give your apps",
    accent: "a home.",
    intro: "A native workspace for your web apps.",
    eyebrow: "Paguro for macOS",
    tryLabel: "Go on. Send yourself something.",
    tryHint: "Pick an app. Watch the notch.",
    demoLabel: "Notification playground",
    open: "Open notifications",
    collapse: "Collapse notifications",
    clear: "Clear all",
    dismiss: "Dismiss notification",
    empty: "All caught up.",
    emptyHint: "A little peace and quiet.",
    now: "now",
    notificationCount: "{count} notifications",
    sent: "New {service} notification: {message}",
    cleared: "All notifications cleared.",
    removed: "Notification dismissed.",
    sidebar: "Room to organise",
    compact: "Room to focus",
    layoutLabel: "Compare app layouts",
    captureAlt: "Paguro with Personal and Work workspaces and ChatGPT open.",
    compactAlt: "Paguro with its compact service rail and ChatGPT open.",
    /** Twelve per service; the hero deals them from a shuffle bag, one per click. */
    samples: {
      slack: [
        { title: "Studio", message: "The designs are ready." },
        { title: "#general", message: "Coffee machine is fixed. Rejoice." },
        { title: "Marta", message: "Can you look at the PR?" },
        { title: "#design", message: "New icon set is in Figma." },
        { title: "Luca", message: "Standup moved to 10:15." },
        { title: "#random", message: "Who left the good snacks out?" },
        { title: "Studio", message: "Client loved the deck." },
        { title: "Giulia", message: "Pushed the fix, tests are green." },
        { title: "#releases", message: "v2.4 is out." },
        { title: "Marta", message: "Lunch?" },
        { title: "#design", message: "Shipping the new palette tomorrow." },
        { title: "Luca", message: "Thanks for the review!" },
      ],
      whatsapp: [
        { title: "The dinner crew", message: "Pizza at eight?" },
        { title: "Mum", message: "Call me when you’re free." },
        { title: "Sara", message: "Running five minutes late." },
        { title: "The dinner crew", message: "I’ll bring dessert." },
        { title: "Andrea", message: "Did you see the game last night?" },
        { title: "Family", message: "Sunday lunch at grandma’s." },
        { title: "Sara", message: "Sent you the photos." },
        { title: "Hiking group", message: "Saturday still on?" },
        { title: "Andrea", message: "Landed safe!" },
        { title: "Mum", message: "Don’t forget your umbrella." },
        { title: "The dinner crew", message: "Table’s booked." },
        { title: "Sara", message: "Happy birthday!" },
      ],
      gmail: [
        { title: "A little getaway", message: "Your weekend plans have arrived." },
        { title: "Your bookshop", message: "Your order has shipped." },
        { title: "Slow Sunday", message: "Five ideas for a slower week." },
        { title: "Your bank", message: "Your statement is ready." },
        { title: "Concert tickets", message: "Doors open at 7." },
        { title: "A little getaway", message: "Check-in opens tomorrow." },
        { title: "The library", message: "Your hold is ready for pickup." },
        { title: "Recipes weekly", message: "Lemon pasta for tonight." },
        { title: "Team calendar", message: "Invitation: design review." },
        { title: "Your bookshop", message: "A new title from an author you follow." },
        { title: "Weather", message: "Sunny weekend ahead." },
        { title: "A little getaway", message: "Pack light. It’s warm there." },
      ],
    },
  },
  paguroPage: {
    seoTitle: "Paguro — Free Web App Workspace for Mac",
    nav: "Explore Paguro",
    faqLabel: "Questions",
    appStore: "Get from App Store",
    appStoreMobile: "View on Mac App Store",
    faqTitle: "A few things to know.",
    faq: [
      {
        id: "pricing",
        question: "Is Paguro really free?",
        answer: "Yes. Paguro is free and open source, with no paid feature tiers. The websites you use may require their own accounts or subscriptions."
      },
      {
        id: "supported-services",
        question: "Which services can I use?",
        answer: "Choose from the service catalog or add a website by URL. Most web services work as they do in a browser, but some providers restrict embedded browsers. Passkey sign-in is not currently supported; use another sign-in method where available."
      },
      {
        id: "notch",
        question: "Do I need a Mac with a notch?",
        answer: "No. Workspaces, services, and macOS notifications work without one. The notification island is an optional feature for compatible notched displays."
      },
      {
        id: "login-sync",
        question: "Does it sync my logins between Macs?",
        answer: "No. Each account has its own local session. Configuration export moves your setup, not cookies or login sessions, so you sign in separately on each Mac."
      },
      {
        id: "hibernation-notifications",
        question: "Do sleeping services still send notifications?",
        answer: "Fully hibernated services stop their live web activity, so new notifications may not arrive until you open them again. Keep messaging and email services awake if you need live notifications. You can set hibernation separately for each service."
      },
      {
        id: "close-window",
        question: "What happens when I close the window?",
        answer: "Closing the window keeps Paguro available in the menu bar. Services can continue running and showing notifications. Command-Q quits the app and stops its activity."
      }
    ],
    releaseTitle: "Make yourself at home.",
    releaseBody: "Free and open source.",
    releaseStatus: "The first public release is coming soon.",
    contact: "Ask a question",
    github: "View on GitHub",
    download: "Get the app",
    credits: "A free, open-source fork of Chorus by Nico Jan.",
    requirements: "macOS 15 or later · Apple silicon and Intel",
    /** `{version}` comes from the app’s minimum macOS version. */
    downloadRequirements: "macOS {version}+ · Apple silicon and Intel",
    requirementsQuestion: "Which Macs are supported?",
    story: {
      title: "Work. Life. Everything in between.",
      body: "Give each part of your day its own workspace. Keep all your accounts signed in, with a separate session for each one.",
      services: "Familiar faces. All welcome.",
      serviceNote: "Pick from the catalog, or bring a website of your own.",
      features: [
        {
          title: "Quiet when you need it.",
          body: "Mute one app, a workspace, or everything. Set quiet hours for the moments that need your attention."
        },
        {
          title: "A place for every account.",
          body: "Keep work and personal accounts signed in side by side. Give each its own session, and group your apps into workspaces."
        },
        {
          title: "Step away. Close the door.",
          body: "Lock Paguro with Touch ID or your Mac password. Services and new notifications stay hidden until you return."
        },
        {
          title: "No extra account. No telemetry.",
          body: "Your sessions stay on your Mac, with no Paguro account or app telemetry. Built-in blocking helps stop requests to known ad and tracking domains."
        }
      ]
    }
  },

  moppoPrivacy: {
    link: "Privacy policy",
    back: "Back to Moppo",
    effective: "Effective {date}",
  },
  moppoTerms: {
    link: "Terms of use",
    updated: "Last updated: {date}",
  },

  paguroPrivacy: {
    /** Link label wherever the policy is linked from: the Paguro page footer. */
    link: "Privacy policy",
    /** Link copy for the full policy supporting the Paguro page’s privacy claims. */
    read: "Read the Paguro privacy policy",
    /** The back link at the top of the policy. */
    back: "Back to Paguro",
    /** `{date}` is replaced with the localized effective date at render time. */
    effective: "Effective {date}",
  },

  paguroTerms: {
    link: "Terms of use",
    updated: "Last updated: {date}",
  },

  appPage: {
    download: "Download for macOS",
    /** `{version}` is replaced with the app's `minMacOS` at render time. */
    requirements: "Requires macOS {version} or later. Free and open source.",
    viewSource: "View source on GitHub",
    back: "All apps",
    featuresHeading: "What it does",
  },
  contact: {
    issues: "Found a bug? Open an issue on GitHub.",
    /** Exact substring of `issues`, rendered as the link. */
    issuesLink: "Open an issue on GitHub",
    /** `{email}` is replaced with the linked address at render time. */
    email: "Anything else: {email}.",
  },
  footer: {
    rights: "Free and open source, forever.",
    /** Year of first publication, hardcoded on purpose: a copyright year names
     *  when the work was published and does not tick — and a static export would
     *  only bake in the last build's year anyway. Widen to a range by hand. */
    copyright: "© 2026 Anguria Studio",
  },
};

export type Dictionary = typeof dictionary;
