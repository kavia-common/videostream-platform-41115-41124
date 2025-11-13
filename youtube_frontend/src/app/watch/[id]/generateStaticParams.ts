export default function generateStaticParams() {
  // Provides static params for /watch/[id] to allow output: "export".
  return [{ id: "v1" }, { id: "v2" }, { id: "v3" }, { id: "v4" }];
}
