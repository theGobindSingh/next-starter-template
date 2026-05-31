# PROJECT_STANDARD_CONSTANTS

Shared source-of-truth constants for design and architecture workflows.

## Runtime + Tooling

- `node_version`: `>=22`
- `package_manager`: `pnpm@11.5.0`
- `router_mode`: `next-pages-router`

## Core Styling Stack

- `css_in_js`: `@emotion/react`, `@emotion/styled`
- `theme_provider`: `@kami-ui/next-theme`
- `theme_base`: `@kami-ui/theme-shop` (`defaultLightTheme`)
- `theme_entry`: `src/styles/theme.ts`
- `global_styles_entry`: `src/styles/global.ts`

## Responsive Constants

- `breakpoints.phone`: `0-640`
- `breakpoints.tablet`: `641-1024`
- `breakpoints.desktop`: `1025+`
- `media_query.phone`: `@media (min-width: 0px) and (max-width: 640px)`
- `media_query.tablet`: `@media (min-width: 641px) and (max-width: 1024px)`
- `media_query.desktop`: `@media (min-width: 1025px)`

## Layout Constants

- `container_size.default`: `85%`
- `container_size.tablet`: `90%`
- `container_size.mobile`: `90%`
- `full_width_wrapper_component`: `src/components/common-full-width-wrapper`

## Typography Constants

- `font_family.serif`: `Inter`
- `font_family.sans`: `Poppins`
- `font_family.mono`: `DM Mono`
- `font_family.cursive`: `Nothing You Could Do`
- `body_default_font`: `var(--font-sans)`
- `body_default_font_size`: `var(--fs-2xs)`
- `body_default_text_color`: `var(--color-gray-800)`

Desktop type scale (`src/styles/theme.ts`):

- `12, 14, 16, 18, 20, 24, 30, 36, 44, 52, 60` px

Phone/tablet type scale (`src/styles/theme.ts`):

- `11, 12, 14, 16, 18, 20, 24, 30, 36, 44, 52` px

## Path Alias Constants

- `@assets/* -> ./src/public/assets/*`
- `@images/* -> ./src/public/assets/images/*`
- `@public/* -> ./src/public/*`
- `@components/* -> ./src/components/*`
- `@modules/* -> ./src/modules/*`
- `@pages/* -> ./src/pages/*`
- `@hooks/* -> ./src/hooks/*`
- `@styles/* -> ./src/styles/*`
- `@/* -> ./src/*`

## Structural Constraints

- Keep route files in `src/pages` thin.
- Put view composition and page logic in `src/modules`.
- Reusable pieces belong in `src/components`.
- Prefer module shape: `index.tsx`, `styles.ts`, `types.ts`.
- Do not mix App Router patterns unless migration is intentional.

## Usage Rule For Skills

- For design implementation tasks, read this file before invoking `impeccable`, `emil-design-eng`, and `design-taste-frontend`.
- For file/folder/architecture/pattern decisions, combine this file with `opinionated-nextjs-systems` guidance.
