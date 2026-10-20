/** Site-wide identity, used by metadata, robots, sitemap and the OG image. */
export const site = {
  name: "Next.js Starter Template",
  description: "A lean Next.js starter with TypeScript and Tailwind CSS.",
  // Set SITE_URL in production so canonical and social URLs are absolute.
  url: process.env.SITE_URL ?? "http://localhost:3000",
};
