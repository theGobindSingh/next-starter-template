import type { CollectionConfig } from "payload";

/** Admin accounts. Email and password come with `auth`. */
export const users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email" },
  auth: true,
  fields: [],
};
