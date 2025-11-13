export type Params = { id: string };

// PUBLIC_INTERFACE
export function generateStaticParams(): Params[] {
  // Known mock IDs to support static export.
  return [{ id: "v1" }, { id: "v2" }, { id: "v3" }, { id: "v4" }];
}
