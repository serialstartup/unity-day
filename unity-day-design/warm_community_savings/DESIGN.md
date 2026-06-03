---
name: Warm Community Savings
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4e4637'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#807665'
  outline-variant: '#d2c5b1'
  surface-tint: '#7b5900'
  primary: '#7b5900'
  on-primary: '#ffffff'
  primary-container: '#c89b3c'
  on-primary-container: '#4b3500'
  inverse-primary: '#f0bf5c'
  secondary: '#5e5e5b'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdb'
  on-secondary-container: '#63635f'
  tertiary: '#006e1c'
  on-tertiary: '#ffffff'
  tertiary-container: '#53b656'
  on-tertiary-container: '#00420d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea4'
  primary-fixed-dim: '#f0bf5c'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4200'
  secondary-fixed: '#e4e2dd'
  secondary-fixed-dim: '#c8c6c2'
  on-secondary-fixed: '#1b1c19'
  on-secondary-fixed-variant: '#474744'
  tertiary-fixed: '#94f990'
  tertiary-fixed-dim: '#78dc77'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#005313'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding-mobile: 20px
  container-padding-desktop: 40px
  stack-gap-sm: 12px
  stack-gap-md: 24px
  stack-gap-lg: 40px
  section-margin: 48px
---

## Brand & Style

The design system is built on the philosophy of "Social Trust and Shared Prosperity." It translates the traditional Turkish "Altın Günü" (Gold Day) into a digital space that feels like a living room rather than a bank vault. The target audience includes community-minded individuals who value collective savings and interpersonal connections.

The design style is **Modern Tactile**, drawing inspiration from wellness apps like Headspace and Finch. It prioritizes softness, warmth, and accessibility. By using high-quality whitespace, generous roundedness, and a soft color palette, the UI evokes an emotional response of comfort, safety, and belonging. It avoids the cold, data-heavy aesthetics of traditional fintech in favor of a human-centric, community-first interface.

## Colors

The palette is rooted in organic, warm tones to maintain a non-institutional feel.
- **Primary (Gold):** A matte, warm gold used for primary actions and highlights. It is intentionally non-metallic to avoid associations with gambling or luxury retail, focusing instead on the concept of "stored value."
- **Background:** A creamy, warm neutral (#FAF8F3) provides a soft canvas that reduces eye strain and feels more inviting than pure white.
- **Surface:** Pure white is reserved for cards and interactive containers to create clear separation from the background.
- **Success:** A natural green (#4CAF50) used for positive growth and completed savings cycles.

## Typography

The typography uses **Plus Jakarta Sans** (a modern, soft alternative to Poppins with better legibility at smaller scales) to maintain a friendly and optimistic tone. 

- **Headlines:** Use SemiBold weight with slight negative letter spacing for a modern, compact look. They should feel conversational rather than commanding.
- **Body:** Regular weight is used for all descriptive text. Ensure generous line heights (1.5x) to maintain a breezy, easy-to-read feel.
- **Labels:** Used for metadata, small buttons, and captions. These use Medium or SemiBold weights to ensure visibility despite their small size.

## Layout & Spacing

The layout follows a **Fluid-Fixed Hybrid** model. On mobile, content uses a 20px safe margin. On desktop, the content is constrained to a max-width of 1200px to maintain intimacy and focus.

- **Rhythm:** A strict 8px grid governs all spacing.
- **Stacking:** Use large vertical gaps (24px - 40px) between major sections to emphasize whitespace and prevent the UI from feeling "crowded" or stressful.
- **Groups:** Interactive elements like inputs and their labels should be grouped tightly (8px - 12px) to signify relationship.

## Elevation & Depth

This design system avoids harsh dropshadows. Instead, it uses **Tonal Layering** and **Soft Ambient Occlusion** to create depth.

- **Level 0 (Background):** #FAF8F3.
- **Level 1 (Cards/Surfaces):** White background with a subtle 1px border (#E7E2DA).
- **Level 2 (Active/Floating):** Use an extremely soft, diffused shadow: `0px 10px 30px rgba(200, 155, 60, 0.08)`. The shadow should be tinted with the Primary Accent color rather than pure black to keep the appearance warm.
- **Depth Philosophy:** Objects should feel like they are resting on a soft surface rather than hovering in deep space.

## Shapes

The shape language is defined by high-radius curves, which signify friendliness and safety.

- **Standard Elements:** Buttons and input fields use a 20px radius.
- **Containers:** Large cards and modal sheets use a 24px radius to feel soft and approachable.
- **Avatars:** Always circular. For group icons, use a "super-ellipse" (squircle) to distinguish them from individual users.

## Components

### Buttons
- **Primary:** 56px height, 20px radius. Background #C89B3C with White text. Bold/SemiBold label.
- **Secondary:** 56px height, 20px radius. Background #FFFFFF with a 1px #E7E2DA border. Text #2D2D2D.

### Cards
- Always use the 24px radius.
- Cards should have a white background.
- Padding inside cards should be 24px to give content "room to breathe."

### Input Fields
- 56px height, 20px radius.
- Light #FAF8F3 background with #E7E2DA border.
- Floating labels or clear external labels using `label-md`.

### Avatars & Social Elements
- **User Avatars:** Large (minimum 48px for lists, 80px+ for profiles).
- **Group Indicators:** Use "Stacked Avatars" for groups, showing the first 3 members and a "+N" counter.
- **Status:** Use the Success color (#4CAF50) as a soft glowing dot or ring around avatars to indicate active "turn" in the savings cycle.

### Progress Bars
- Thick, rounded tracks (12px height).
- Use the Primary Gold for the progress fill and #E7E2DA for the track.