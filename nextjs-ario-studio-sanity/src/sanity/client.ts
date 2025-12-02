import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "h9d2960t",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

