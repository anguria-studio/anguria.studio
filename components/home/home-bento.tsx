import Link from "next/link";
import type { CSSProperties } from "react";
import { MoppoIcon } from "@/components/apps/moppo-icon";
import { FEATURE_ICONS } from "@/components/home/feature-icons";
import { site } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import { localePath, type Locale } from "@/lib/i18n";
import { HomeBentoMotion } from "./home-bento-motion";
import styles from "./home-bento.module.css";

const services = ["whatsapp", "gmail", "claude", "slack"] as const;
const serviceNames = { whatsapp: "WhatsApp", gmail: "Gmail", claude: "Claude", slack: "Slack" };
const contributionLevels = [
  0, 4, 2, 4, 2, 0, 2, 0, 4,
  3, 2, 0, 1, 0, 3, 0, 3, 1,
  1, 4, 1, 4, 0, 1, 2, 1, 4,
];

function ProductIcon({ app }: { app: "paguro" | "moppo" }) {
  if (app === "moppo") return <MoppoIcon className={styles.productIcon} />;

  return <span className={styles.productIcon} aria-hidden="true">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/paguro/app-icon-light.png" alt="" width={256} height={256} className={styles.lightIcon} />
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/paguro/app-icon-dark.png" alt="" width={256} height={256} className={styles.darkIcon} />
  </span>;
}

function CornerArrow() {
  return <span className={styles.cornerArrow} aria-hidden="true" data-bento-part="arrow-button">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" data-bento-part="arrow">
      <path d="M6 18 18 6M6 6h12v12" />
    </svg>
  </span>;
}

function ResponsiveCopy({ desktop, mobile }: { desktop: string; mobile: string }) {
  return <><span className={styles.desktopCopy}>{desktop}</span><span className={styles.mobileCopy}>{mobile}</span></>;
}

/** Grid areas change the layout without duplicating cards or their animations. */
export function HomeBento({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.home.bento;

  return <HomeBentoMotion className={styles.section} label={dict.home.dockLabel}>
    <div className={styles.appGrid}>
      <Link href={localePath(locale, "paguro")} className={`${styles.card} ${styles.product} ${styles.paguro}`} data-analytics-label="paguro" data-bento-animation="paguro" data-bento-load>
        <div className={styles.productVisual} aria-hidden="true">
          <ProductIcon app="paguro" />
          <div className={styles.services} data-bento-part="services">
            <div className={styles.serviceViewport}>
              <div className={styles.serviceTrack} data-bento-part="service-track">
                {/* Repeated artwork lets the wheel spin without an empty seam. */}
                {[0, 1, 2, 3].map(copy => <ul key={copy} className={styles.serviceLoop} data-bento-part="service-loop">
                  {services.map(service => <li key={service} className={styles.service} data-bento-part="service">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/paguro/services/${service}.svg`} alt="" width={24} height={24} />
                    <span>{serviceNames[service]}</span>
                  </li>)}
                </ul>)}
              </div>
            </div>
          </div>
        </div>
        <CornerArrow />
        <div className={`${styles.copy} ${styles.productCopy}`}>
          <div className={styles.productHeading}><h2>{dict.apps.paguro.name}</h2><span>{dict.apps.paguro.category}</span></div>
          <p>{copy.paguro}</p>
        </div>
      </Link>

      <Link href={localePath(locale, "moppo")} className={`${styles.card} ${styles.product} ${styles.moppo}`} data-analytics-label="moppo" data-bento-animation="moppo" data-bento-load>
        <div className={styles.productVisual} aria-hidden="true">
          <ProductIcon app="moppo" />
          <div className={styles.storageMap} data-bento-part="storage-map">
            <span className={styles.storageLarge} data-bento-part="storage-large" />
            <span className={styles.storageMedium} data-bento-part="storage-small" />
            <span className={styles.storageStack}><span data-bento-part="storage-small" /><span data-bento-part="storage-small" /></span>
          </div>
        </div>
        <CornerArrow />
        <div className={`${styles.copy} ${styles.productCopy}`}>
          <div className={styles.productHeading}><h2>{dict.apps.moppo.name}</h2><span>{dict.apps.moppo.category}</span></div>
          <p>{copy.moppo}</p>
        </div>
      </Link>
    </div>

    <section className={styles.featureSection} aria-labelledby="home-promises">
      <h2 id="home-promises" className={styles.featureHeading}>{copy.promisesTitle}</h2>
      <div className={styles.grid}>
      <article className={`${styles.card} ${styles.free}`} data-bento-animation="free">
        <div className={styles.price}><span><span className="sr-only">€0</span><span aria-hidden="true">€<span data-bento-part="price">0</span></span></span><span className={styles.priceTerm}>/ {copy.free.forever}</span></div>
        <div className={styles.copy}><h3>{copy.free.title}</h3><p><ResponsiveCopy desktop={copy.free.body} mobile={copy.free.mobileBody} /></p></div>
      </article>

      <article className={`${styles.card} ${styles.private}`} data-bento-animation="private">
        <div className={styles.privacyVisual} aria-hidden="true">
          <span className={styles.offSwitch} data-bento-part="switch" data-bento-end><span data-bento-part="switch-thumb" /></span>
        </div>
        <div className={styles.copy}><h3>{copy.private.title}</h3><p><ResponsiveCopy desktop={copy.private.body} mobile={copy.private.mobileBody} /></p></div>
      </article>

      <article className={`${styles.card} ${styles.native}`} data-bento-animation="native">
        <svg viewBox={FEATURE_ICONS.swift.viewBox} className={styles.swiftIcon} aria-hidden="true">{FEATURE_ICONS.swift.node}</svg>
        <div className={styles.copy}><h3><span className={styles.nativeTitle} data-bento-part="native-title" data-bento-end>{copy.native.title}</span></h3><p><ResponsiveCopy desktop={copy.native.body} mobile={copy.native.mobileBody} /></p></div>
      </article>

      <a href={site.github} className={`${styles.card} ${styles.source}`} target="_blank" rel="noreferrer" data-analytics-event="source-click" data-analytics-label="studio" data-bento-animation="source">
        <div className={styles.contributions} aria-hidden="true" data-bento-part="contributions">
          {/* Tile 8 has the last stagger delay and stays visible on mobile. */}
          {contributionLevels.map((level, index) => <span key={index} className={styles[`contribution${level}`]} data-contribution-level={level} style={{ "--column": index % 9 } as CSSProperties} data-bento-end={index === 8 ? true : undefined} />)}
        </div>
        <CornerArrow />
        <div className={styles.copy}><h3>{copy.source.title}</h3><p><ResponsiveCopy desktop={copy.source.body} mobile={copy.source.mobileBody} /></p></div>
      </a>

      <article className={`${styles.card} ${styles.studio}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/mark.png" alt="" width={40} height={40} className={styles.studioMark} />
        <div className={`${styles.copy} ${styles.studioCopy}`}><h3>{site.name}</h3><p>{site.email}</p></div>
        <p className={styles.studioIntro}>{copy.studioIntro}</p>
      </article>
      </div>
    </section>
  </HomeBentoMotion>;
}
