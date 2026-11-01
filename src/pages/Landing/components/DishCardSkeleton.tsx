export default function DishCardSkeleton() {
  return (
    <div
      className="flex animate-pulse flex-col overflow-hidden rounded-2xl bg-white shadow-md"
      aria-hidden="true"
    >
      <div className="relative h-48 shrink-0 overflow-hidden bg-gray-200">
        <span className="absolute right-3 top-3 h-5 w-16 rounded-full bg-gray-300" />
      </div>

      <div className="flex h-full flex-col justify-between p-5">
        <div className="h-5 w-2/3 rounded bg-gray-200" />
        <div className="mt-3 border-t border-gray-100 pt-3">
          <div className="h-6 w-24 rounded bg-gray-200" />
          <div className="mt-3 h-10 w-full rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
