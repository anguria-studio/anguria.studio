"use client";

import { useReducer, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";
import { PaguroActions } from "@/components/apps/paguro-actions";
import { apps } from "@/lib/apps";
import styles from "./paguro-hero.module.css";
import { PaguroIsland } from "./paguro-island";
import { PaguroMenuBar } from "./paguro-menu-bar";
import desktopStyles from "./paguro-desktop.module.css";
import type { Locale } from "@/lib/i18n";
import { initialIslandState, islandReducer, serviceNames } from "@/lib/paguro-island";
import type { DemoService as Service } from "@/lib/paguro-island";

type HeroCopy = Dictionary["paguroHero"];

const services: Service[] = ["slack", "whatsapp", "gmail"];
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500";

function ServiceIcon({ service, className }: { service: Service; className: string }) {
  // These are the same bundled service marks used by the macOS app.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/paguro/services/${service}.svg`} alt="" width={48} height={48} className={className} />;
}

export function PaguroHero({ copy, page, locale }: { copy: HeroCopy; page: Dictionary["paguroPage"]; locale: Locale }) {
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("dark");
  const [island, dispatch] = useReducer(islandReducer, initialIslandState);
  const [layout, setLayout] = useState<"sidebar" | "compact">("sidebar");
  const [announcement, setAnnouncement] = useState({ id: 0, message: "" });
  const nextID = useRef(0);

  function announce(message: string) {
    // Replacing the child also announces consecutive samples with identical text.
    setAnnouncement((current) => ({ id: current.id + 1, message }));
  }

  function send(service: Service) {
    const title = copy[`${service}Title`];
    const message = copy[`${service}Message`];
    const notification = { id: ++nextID.current, service, title, message };
    dispatch({ type: "receive", notification });
    announce(copy.sent.replace("{service}", serviceNames[service]).replace("{message}", message));
  }

  function remove(ids: number[], all: boolean) {
    dispatch({ type: "remove", ids });
    announce(all ? copy.cleared : copy.removed);
  }

  return (
    <section id="paguro" className="scroll-mt-24 pb-16 sm:pb-24">
      <div className="mx-auto max-w-4xl px-6 pt-10 text-center sm:pt-12">
        <h1 className="text-4xl leading-none font-bold tracking-tight text-balance sm:text-7xl motion-safe:enter-1">
          {copy.title}{" "}<br className="lg:hidden" /><span className="text-melon-500">{copy.accent}</span>
        </h1>
        {/* One paragraph, not two: both sentences are the same thought and the
            user wants them to run on. max-w-2xl so the pair still balances onto
            two lines rather than four. */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted text-balance">{copy.intro} {page.releaseBody}</p>
        <PaguroActions copy={page} meta={apps.paguro} className="mt-8 justify-center" />
      </div>

      <div className="mx-auto mt-10 max-w-cards px-4 sm:mt-12 sm:px-6">
        <div className="mb-7 hidden items-center justify-center gap-8 desk:flex">
          <div className="text-center sm:text-right">
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
                  <span className="text-sm text-muted transition group-hover:text-foreground">{serviceNames[service]}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div data-preview-theme={previewTheme} className={`${desktopStyles.desktop} relative isolate hidden overflow-hidden rounded-showcase bg-surface desk:block`}>
          {/* A real desktop capture, with the unmodified app-window captures above it. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/paguro/desktop.jpg" alt="" width={2560} height={1200} className="absolute inset-0 size-full object-cover" />

          <PaguroMenuBar copy={copy} locale={locale} theme={previewTheme} onThemeChange={setPreviewTheme} />

          <div className="pointer-events-none absolute inset-x-4 top-0 z-20 flex justify-center">
            <PaguroIsland copy={copy} notifications={island.notifications} phase={island.phase} dispatch={dispatch} remove={remove} />
          </div>

          <div className={`${styles.window} relative mx-auto max-w-5xl px-4 pt-24 pb-5 sm:px-8 sm:pb-10`}>
            <div className="relative overflow-hidden rounded-xl bg-black shadow-2xl">
              {([
                ["dark", "sidebar", "workspace.png"], ["dark", "compact", "compact.png"],
                ["light", "sidebar", "workspace-light.png"], ["light", "compact", "compact-light.png"],
              ] as const).map(([theme, arrangement, file], index) => {
                const active = theme === previewTheme && arrangement === layout;
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={file} src={`/paguro/${file}`} alt={active ? (layout === "sidebar" ? copy.captureAlt : copy.compactAlt) : ""} width={1100} height={700} fetchPriority={index === 0 ? "high" : "auto"}
                    className={`${index === 0 ? "" : "absolute inset-0"} h-auto w-full ${active ? "opacity-100" : "opacity-0"}`} />
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative isolate overflow-hidden rounded-showcase bg-surface px-4 py-8 desk:hidden">
          {/* A still image on small screens and touch devices. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/paguro/desktop.jpg" alt="" width={2560} height={1200} className="absolute inset-0 size-full object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/paguro/workspace.png" alt={copy.captureAlt} width={1100} height={700} className="relative h-auto w-full rounded-xl shadow-xl" />
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="min-w-0 text-center md:text-left"><p className="text-base font-medium">{copy.captureNote}</p><p className="mt-1 hidden text-sm text-muted desk:block">{copy.demoNote}</p></div>
          <div role="group" aria-label={copy.layoutLabel} className="hidden w-full max-w-md shrink-0 gap-1 rounded-full bg-surface p-1 desk:flex md:w-auto">
            {(["sidebar", "compact"] as const).map((option) => <button key={option} aria-pressed={layout === option} onClick={() => setLayout(option)} className={`flex-1 cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-balance transition ${layout === option ? "bg-background text-foreground shadow-sm" : "text-muted hover:text-foreground"} ${focus}`}>{copy[option]}</button>)}
          </div>
        </div>
        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only hidden desk:block"><span key={announcement.id}>{announcement.message}</span></p>
      </div>
    </section>
  );
}
