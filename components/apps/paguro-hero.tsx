"use client";

import { useReducer, useRef, useState, useSyncExternalStore } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";
import { PaguroActions } from "@/components/apps/paguro-actions";
import { apps } from "@/lib/apps";
import styles from "./paguro-hero.module.css";
import { PaguroIsland } from "./paguro-island";
import { PaguroMenuBar } from "./paguro-menu-bar";
import { PaguroServicePreview } from "./paguro-service-preview";
import desktopStyles from "./paguro-desktop.module.css";
import type { Locale } from "@/lib/i18n";
import { initialIslandState, islandReducer, serviceNames } from "@/lib/paguro-island";
import type { SelectableService } from "@/lib/paguro-service-preview";
import type { DemoNotification, DemoService as Service } from "@/lib/paguro-island";
import { createPreviewHintHistory } from "@/lib/paguro-preview-hints";
import { createSampleDecks, drawSample } from "@/lib/paguro-samples";

import type { ThemePref } from "@/components/layout/theme-toggle";

function subscribeToSystemTheme(update: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
}

const readSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const serverSystemTheme = () => "dark" as const;

// Keep this in sync with the `desk` variant in app/globals.css. CSS hiding
// alone does not prevent eager images from downloading on mobile.
const desktopPreviewQuery = "(min-width: 48rem) and (hover: hover) and (pointer: fine)";
function subscribeToDesktopPreview(update: () => void) {
  const media = window.matchMedia(desktopPreviewQuery);
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
}
const readDesktopPreview = () => window.matchMedia(desktopPreviewQuery).matches;
const serverDesktopPreview = () => false;

type HeroCopy = Dictionary["paguroHero"];

const services: Service[] = ["slack", "whatsapp", "gmail"];
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500";

function ServiceIcon({ service, className }: { service: Service; className: string }) {
  // These are the same bundled service marks used by the macOS app.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/paguro/services/${service}.svg`} alt="" width={48} height={48} className={className} />;
}

export function PaguroHero({ copy, page, locale }: { copy: HeroCopy; page: Dictionary["paguroPage"]; locale: Locale }) {
  const showDesktopPreview = useSyncExternalStore(subscribeToDesktopPreview, readDesktopPreview, serverDesktopPreview);
  const [previewThemePref, setPreviewThemePref] = useState<ThemePref>("dark");
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, readSystemTheme, serverSystemTheme);
  const previewTheme = previewThemePref === "system" ? systemTheme : previewThemePref;
  const [island, dispatch] = useReducer(islandReducer, initialIslandState);
  const [layout, setLayout] = useState<"sidebar" | "compact">("sidebar");
  const [muted, setMuted] = useState(false);
  const [selectedService, setSelectedService] = useState<SelectableService>("claude");
  const [announcement, setAnnouncement] = useState({ id: 0, message: "" });
  const nextID = useRef(0);
  const previewHintHistory = useRef(createPreviewHintHistory());
  const decks = useRef(createSampleDecks());

  function changeLayout(next: "sidebar" | "compact") {
    previewHintHistory.current.toggleUsed = true;
    setLayout(next);
  }

  function announce(message: string) {
    // Replacing the child also announces consecutive samples with identical text.
    setAnnouncement((current) => ({ id: current.id + 1, message }));
  }

  function send(service: Service) {
    // One card per click, drawn from the service's shuffle bag so every sample
    // shows up before any of them comes round again.
    const { deck, index } = drawSample(decks.current[service], copy.samples[service].length);
    decks.current[service] = deck;
    const { title, message } = copy.samples[service][index];
    const notification = { id: ++nextID.current, service, title, message };
    dispatch({ type: "receive", notification });
    if (muted) dispatch({ type: "collapse" });
    if (!muted) announce(copy.sent.replace("{service}", serviceNames[service]).replace("{message}", message));
  }

  function remove(ids: number[], all: boolean) {
    dispatch({ type: "remove", ids });
    announce(all ? copy.cleared : copy.removed);
  }

  function openNotification(notification: DemoNotification) {
    setSelectedService(notification.service);
    dispatch({ type: "open", id: notification.id });
    announce(`${serviceNames[notification.service]}: ${notification.title}`);
  }

  function clearServiceNotifications(service: SelectableService) {
    setSelectedService(service);
    const ids = island.notifications.filter((notification) => notification.service === service).map(({ id }) => id);
    if (ids.length > 0) remove(ids, ids.length === island.notifications.length);
  }

  return (
    <section id="paguro" className={`${styles.hero} scroll-mt-24`}>
      <div className={styles.heading}>
        <h1 className="text-display-sm font-semibold md:text-display motion-safe:enter-1">
          {locale === "en" ? <>Give your<br />web apps </> : <>{copy.title}{" "}</>}<span className="text-melon-500">{copy.accent}</span>
        </h1>
        <p className={`${styles.subtitle} motion-safe:enter-2`}>{copy.intro} {page.releaseBody}</p>
        <PaguroActions copy={{ ...page, download: locale === "en" ? "Download for macOS" : page.download }} meta={apps.paguro} mobileAppStoreLabel={page.appStoreMobile} className={`${styles.cta} mt-8 justify-center motion-safe:enter-2`} />
        <p className="mt-3 text-sm text-muted motion-safe:enter-2">{page.downloadRequirements.replace("{version}", apps.paguro.minMacOS.replace(/\.0$/, ""))}</p>
      </div>

      <div className={styles.demo}>
        <div className="mb-7 hidden items-center justify-center gap-8 desk:flex">
          <div className="text-center sm:text-right motion-safe:enter-3">
            <p className="text-base font-semibold">{copy.tryLabel}</p>
            <p className="mt-1 text-sm text-muted">{copy.tryHint}</p>
          </div>
          <div role="group" aria-label={copy.demoLabel} className="flex gap-4 sm:gap-5">
            {services.map((service) => (
              <div key={service} className={styles.gather}>
                <button onClick={() => send(service)} aria-label={`${serviceNames[service]} — ${copy.tryLabel}`} className={`group flex cursor-pointer flex-col items-center gap-2 rounded-xl ${focus}`}>
                  <span className="flex size-14 items-center justify-center rounded-2xl border border-hairline bg-white shadow-sm motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:-rotate-6 motion-safe:group-active:scale-95 sm:size-16">
                    <ServiceIcon service={service} className="size-8 sm:size-10" />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div data-preview-theme={previewTheme} className={`${styles.glassStage} relative hidden overflow-hidden desk:block`}>
          {showDesktopPreview && <div data-preview-theme={previewTheme} className={`${desktopStyles.desktop} ${styles.glassCanvas}`}>
          <PaguroMenuBar copy={copy} locale={locale} theme={previewThemePref} onThemeChange={setPreviewThemePref} />

          <div className="pointer-events-none absolute inset-x-4 top-0 z-20 flex justify-center">
            <PaguroIsland copy={copy} notifications={island.notifications} phase={island.phase} dispatch={dispatch} remove={remove} openNotification={openNotification} />
          </div>

          <div className={styles.appFrame} data-live-frame="true" data-theme={previewTheme}><div className={styles.captureCanvas}>
            <PaguroServicePreview service={selectedService} layout={layout} onLayoutChange={changeLayout} theme={previewTheme} copy={copy.serviceOverlay} locale={locale} muted={muted} onMuteChange={() => { setMuted(!muted); dispatch({ type: "collapse" }); }} hintHistory={previewHintHistory} notifications={island.notifications} onServiceSelect={clearServiceNotifications} />
          </div></div>
          </div>}
        </div>

        {!showDesktopPreview && <div data-preview-theme="dark" className={`${desktopStyles.desktop} ${styles.mobileGlass} desk:hidden`}>
          <div className={`${styles.appFrame} ${styles.mobileFrame}`} data-live-frame="true" data-theme="dark" role="img" aria-label={copy.mobileCaptureAlt}>
            <div className={styles.captureCanvas} aria-hidden="true">
              <PaguroServicePreview interactive={false} service="claude" layout="sidebar" onLayoutChange={changeLayout} theme="dark" copy={copy.serviceOverlay} locale={locale} muted={false} onMuteChange={() => {}} hintHistory={previewHintHistory} notifications={[]} onServiceSelect={clearServiceNotifications} />
            </div>
          </div>
        </div>}

        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only hidden desk:block"><span key={announcement.id}>{announcement.message}</span></p>
      </div>
    </section>
  );
}
