---
name: Vibrant Humanist
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#564337'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#897365'
  outline-variant: '#dcc1b1'
  surface-tint: '#944a00'
  primary: '#944a00'
  on-primary: '#ffffff'
  primary-container: '#e67e22'
  on-primary-container: '#502600'
  inverse-primary: '#ffb783'
  secondary: '#4e6073'
  on-secondary: '#ffffff'
  secondary-container: '#cfe2f9'
  on-secondary-container: '#526478'
  tertiary: '#006d37'
  on-tertiary: '#ffffff'
  tertiary-container: '#29af61'
  on-tertiary-container: '#003a1a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc5'
  primary-fixed-dim: '#ffb783'
  on-primary-fixed: '#301400'
  on-primary-fixed-variant: '#713700'
  secondary-fixed: '#d1e4fb'
  secondary-fixed-dim: '#b5c8df'
  on-secondary-fixed: '#091d2e'
  on-secondary-fixed-variant: '#36485b'
  tertiary-fixed: '#7efba4'
  tertiary-fixed-dim: '#61de8a'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#005228'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system centers on a "Human-Centric Energy" philosophy. It balances the reliability of a structured professional tool with the kinetic energy of a modern lifestyle brand. The aesthetic is a hybrid of **Modern Corporate** efficiency and **High-Contrast Bold** accents, utilizing whitespace and soft geometry to maintain approachability.

The target audience seeks a product that feels "alive" and responsive. By utilizing a high-energy primary accent against a calm, warm foundation, the UI evokes feelings of optimism, activity, and trust. Every interaction should feel intentional, warm, and distinctly contemporary.

## Colors

The palette is anchored by a vibrant, modern orange that serves as the primary driver for action and brand recognition. This energy is tempered by a warm neutral background that prevents visual fatigue and maintains a "human" feel.

- **Primary (#e67e22):** Used for key actions, progress indicators, and active states. It represents movement and vitality.
- **Secondary (#2c3e50):** A deep charcoal-navy used for high-contrast text and structural elements to provide grounding and trust.
- **Tertiary (#27ae60):** A balanced green used sparingly for success states and secondary growth-related highlights.
- **Neutral (#faf8f3):** The "Warm Bone" foundation. All surfaces sit on this cream-tinted base to differentiate from cold, sterile white backgrounds.

## Typography

The design system uses a pairing of **Plus Jakarta Sans** for headlines and labels, and **Poppins** for body copy. 

Headlines utilize Plus Jakarta Sans with heavy weights and tight letter-spacing to create a sense of urgency and modernity. Body text transitions to Poppins, chosen for its geometric clarity and friendly character, kept at a medium scale with generous line heights to ensure long-form readability. For smaller labels and captions, we return to Plus Jakarta Sans with increased font weights (Semi-Bold/Bold) to ensure the vibrant primary color remains legible against the warm neutral background.

## Layout & Spacing

The layout follows a **Fluid Grid** philosophy using an 8px rhythmic scale. 

- **Desktop:** 12-column grid with 24px gutters. Content is centered with a max-width of 1280px.
- **Tablet:** 8-column grid with 24px gutters and 32px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Spacing should be generous to maintain the "fresh" and "airy" feeling of the brand. Components should prioritize vertical breathing room (stacking) over horizontal density.

## Elevation & Depth

To maintain a "Humanist" feel, the design system avoids harsh, technical shadows. Depth is communicated through:

1.  **Tonal Layering:** Using subtle variations of the warm neutral (slight shifts in lightness) to distinguish between the background and container surfaces.
2.  **Ambient Shadows:** When necessary, shadows are extremely diffused with low opacity (4-8%) and a subtle tint of the secondary color (#2c3e50) to prevent a "dirty" look.
3.  **Soft Outlines:** Interactive elements use a 1px border that is only 10% darker than the surface it sits on, providing structure without visual noise.

## Shapes

The shape language is defined by **Pill-shaped (Level 3)** roundedness. This extreme curvature reinforces the friendly, optimistic, and energetic brand personality.

- **Standard Elements (Buttons, Inputs):** Use a 1rem (16px) base radius, often scaling to a full pill-shape for buttons.
- **Large Elements (Cards, Modals):** Use `rounded-xl` (3rem / 48px) to create soft, "squishy" containers that feel approachable and safe.
- **Selection Indicators:** Always use full-pill caps to echo the kinetic energy of the primary orange accent.

## Components

- **Buttons:** Primary buttons are pill-shaped, filled with the vibrant orange (#e67e22) and white text. Secondary buttons use a thick 2px outline of the primary color or a ghost style with the primary text color.
- **Input Fields:** Containers use a 16px radius with a subtle 1px border. On focus, the border thickens to 2px in the primary orange with a soft, tinted glow.
- **Cards:** Cards feature high roundedness (24px to 32px) and no shadows by default, relying on a slightly lighter surface color than the background (#faf8f3) to stand out.
- **Chips/Badges:** Small, pill-shaped elements with semi-transparent fills of the primary or secondary colors.
- **Checkboxes & Radios:** Fully rounded corners even for checkboxes to maintain the "soft" brand language. When active, they are filled with the primary orange.
- **Navigation:** Navigation items use heavy-weight Plus Jakarta Sans labels and indicate the active state with a bold, orange underline bar with rounded caps.