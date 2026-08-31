import type { ImageMetadata } from "astro";

import chineseUnderworldGuideHeroDesktop from "../assets/images/chinese-underworld-guide-hero-primary-v1-hero-desktop-3200w.webp";
import chineseUnderworldGuideHeroMobile from "../assets/images/chinese-underworld-guide-hero-primary-v1-hero-mobile-1600w.webp";
import chineseUnderworldHeroDesktop from "../assets/images/chinese-underworld-hero-primary-v1-hero-desktop-3200w.webp";
import chineseUnderworldHeroMobile from "../assets/images/chinese-underworld-hero-primary-v1-hero-mobile-1600w.webp";
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
