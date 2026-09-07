import type { ImageMetadata } from "astro";

import chineseUnderworldGuideHeroDesktop from "../assets/images/chinese-underworld-guide-hero-primary-v1-hero-desktop-3200w.webp";
import chineseUnderworldGuideHeroMobile from "../assets/images/chinese-underworld-guide-hero-primary-v1-hero-mobile-1600w.webp";
import chineseUnderworldHeroDesktop from "../assets/images/chinese-underworld-hero-primary-v1-hero-desktop-3200w.webp";
import chineseUnderworldHeroMobile from "../assets/images/chinese-underworld-hero-primary-v1-hero-mobile-1600w.webp";
import fightingCricketHeroDesktop from "../assets/images/fighting-cricket-hero-primary-v1-hero-desktop-3200w.webp";
import fightingCricketHeroMobile from "../assets/images/fighting-cricket-hero-primary-v1-hero-mobile-1600w.webp";
import liaozhaiHeroDesktop from "../assets/images/liaozhai-hero-primary-v1-hero-desktop-3200w.webp";
import liaozhaiHeroMobile from "../assets/images/liaozhai-hero-primary-v1-hero-mobile-1600w.webp";
import liaozhaiReadingGuideHeroDesktop from "../assets/images/liaozhai-reading-guide-hero-primary-v1-hero-desktop-3200w.webp";
import liaozhaiReadingGuideHeroMobile from "../assets/images/liaozhai-reading-guide-hero-primary-v1-hero-mobile-1600w.webp";
import paintedSkinHeroDesktop from "../assets/images/painted-skin-hero-primary-v1-hero-desktop-3200w.webp";
import paintedSkinHeroMobile from "../assets/images/painted-skin-hero-primary-v1-hero-mobile-1600w.webp";
import tenKingsHeroDesktop from "../assets/images/ten-kings-hero-primary-v1-hero-desktop-3200w.webp";
import tenKingsHeroMobile from "../assets/images/ten-kings-hero-primary-v1-hero-mobile-1600w.webp";
import zhongKuiHeroDesktop from "../assets/images/zhong-kui-hero-primary-v2-hero-desktop-3200w.webp";
import zhongKuiHeroMobile from "../assets/images/zhong-kui-hero-primary-v2-hero-mobile-1600w.webp";

// Explicit imports prevent eager globs from emitting non-current or non-page assets.
// Version switches must add their resolved paths here and otherwise fail closed.
const reviewPageImages = new Map<string, ImageMetadata>([
  [
    "/src/assets/images/chinese-underworld-guide-hero-primary-v1-hero-desktop-3200w.webp",
    chineseUnderworldGuideHeroDesktop,
  ],
  [
    "/src/assets/images/chinese-underworld-guide-hero-primary-v1-hero-mobile-1600w.webp",
    chineseUnderworldGuideHeroMobile,
  ],
  [
    "/src/assets/images/chinese-underworld-hero-primary-v1-hero-desktop-3200w.webp",
    chineseUnderworldHeroDesktop,
  ],
  [
    "/src/assets/images/chinese-underworld-hero-primary-v1-hero-mobile-1600w.webp",
    chineseUnderworldHeroMobile,
  ],
  [
    "/src/assets/images/fighting-cricket-hero-primary-v1-hero-desktop-3200w.webp",
    fightingCricketHeroDesktop,
  ],
  [
    "/src/assets/images/fighting-cricket-hero-primary-v1-hero-mobile-1600w.webp",
    fightingCricketHeroMobile,
  ],
  [
    "/src/assets/images/liaozhai-hero-primary-v1-hero-desktop-3200w.webp",
    liaozhaiHeroDesktop,
  ],
  [
    "/src/assets/images/liaozhai-hero-primary-v1-hero-mobile-1600w.webp",
    liaozhaiHeroMobile,
  ],
  [
    "/src/assets/images/liaozhai-reading-guide-hero-primary-v1-hero-desktop-3200w.webp",
    liaozhaiReadingGuideHeroDesktop,
  ],
  [
    "/src/assets/images/liaozhai-reading-guide-hero-primary-v1-hero-mobile-1600w.webp",
    liaozhaiReadingGuideHeroMobile,
  ],
  [
    "/src/assets/images/painted-skin-hero-primary-v1-hero-desktop-3200w.webp",
    paintedSkinHeroDesktop,
  ],
  [
    "/src/assets/images/painted-skin-hero-primary-v1-hero-mobile-1600w.webp",
    paintedSkinHeroMobile,
  ],
  [
    "/src/assets/images/ten-kings-hero-primary-v1-hero-desktop-3200w.webp",
    tenKingsHeroDesktop,
  ],
  [
    "/src/assets/images/ten-kings-hero-primary-v1-hero-mobile-1600w.webp",
    tenKingsHeroMobile,
  ],
  [
    "/src/assets/images/zhong-kui-hero-primary-v2-hero-desktop-3200w.webp",
    zhongKuiHeroDesktop,
  ],
  [
    "/src/assets/images/zhong-kui-hero-primary-v2-hero-mobile-1600w.webp",
    zhongKuiHeroMobile,
  ],
]);

export function resolvePageImageModule(repositoryPath: string): ImageMetadata {
  const image = reviewPageImages.get(`/${repositoryPath}`);
  if (image === undefined) {
    throw new Error(
      `No authorized review page image module matches ${repositoryPath}.`,
    );
  }
  return image;
}
