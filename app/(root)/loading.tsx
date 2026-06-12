import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <Skeleton className="heading w-3/4 h-12 mx-auto" />
        <Skeleton className="sub-heading !max-w-3xl w-1/2 h-6 mx-auto mt-4" />
      </section>

      <section className="section_container">
        <div className="mt-7 card_grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </section>
    </>
  );
}
