/**
 * One viewport per legacy breakpoint range (`styles/responsiveness.scss`), plus the sidebar and
 * widescreen layouts. Heights only matter for above-the-fold; screenshots are full page.
 */
export type Viewport = { name: string; width: number; height: number };

export const VIEWPORTS: Viewport[] = [
  { name: 'mobile', width: 375, height: 812 }, // < 500
  { name: 'touch', width: 560, height: 900 }, // 500–649
  { name: 'tablet', width: 720, height: 1000 }, // 650–799
  { name: 'tablet-lg', width: 900, height: 1000 }, // 800–1099
  { name: 'desktop', width: 1280, height: 900 }, // 1100–1359
  { name: 'sidebar', width: 1440, height: 900 }, // 1360–1599, sidebar always visible
  { name: 'wide', width: 1680, height: 1000 }, // ≥ 1600, widescreen max-width
];
