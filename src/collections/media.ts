import type { CollectionConfig } from "payload";

const allowPublicRead = () => {
  return true;
};

/** Uploaded images and files, publicly readable. */
export const media: CollectionConfig = {
  slug: "media",
  access: { read: allowPublicRead },
  fields: [{ name: "alt", type: "text", required: true }],
  upload: true,
};
