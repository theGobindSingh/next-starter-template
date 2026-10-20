import { site } from "@/site";
import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).href,
  };
};

export default robots;
