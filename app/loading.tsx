// Route-level loading UI. Shows a skeleton (not a blank screen) while a
// Server Component streams. Replace with layout-shaped skeletons per page later.
export default function Loading(): React.ReactElement {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="h-4 w-40 animate-pulse rounded bg-neutral-200" />
      <div className="mt-4 h-10 w-80 animate-pulse rounded bg-neutral-200" />
    </div>
  );
}
