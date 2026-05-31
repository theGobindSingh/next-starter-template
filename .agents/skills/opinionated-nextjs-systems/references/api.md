# API / Data Rules

## Rule D1: Prefer static-content-first rendering

- Most marketing and informational sections should use typed constants.
- Add runtime fetching only when data cannot be versioned in source.

## Rule D2: Keep data access out of presentational sections

- Section components render props.
- Route-level data methods or dedicated data modules own loading/parsing.

## Rule D3: Route files own route-level data hooks

- In Next Pages Router, use `getStaticProps`/`getServerSideProps` when required.
- In App Router, use server components/loaders with equivalent separation.

## Rule D4: Keep generated clients isolated

- Treat generated API artifacts as infrastructure.
- Avoid hand-written duplicate types when generated contracts already exist.

## Rule D5: Respect host script workflow

- Use the host repository's scripts for codegen/build/dev.
- Do not assume a fixed package manager or script name.

## Rule D6: Keep environment assumptions explicit

- If env vars are required, validate and fail with clear messages.
- Never silently proceed with partially configured external data.

## Rule D7: Reuse existing query/provider infrastructure

- If global query/provider setup already exists, reuse it.
- Do not add duplicate provider roots in feature code.

## Rule D8: Avoid unauthorized architecture expansion

- Do not add backend routes, auth flows, or mutation layers unless requested.
- Keep implementation aligned with existing product architecture.

## Rule D9: Build fallback-safe rendering

- Guard optional/remote data.
- Render sensible empty states and skip invalid categories safely.
