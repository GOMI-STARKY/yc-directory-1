import Ping from "@/components/Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

const View = async ({ id }: { id: string }) => {
  let totalViews = 0;
  try {
    const data = await writeClient.fetch(STARTUP_VIEWS_QUERY, { id });
    totalViews = data?.views ?? 0;
  } catch (e) {
    console.error("Failed to fetch views:", e);
  }

  try {
    after(async () => {
      try {
        await writeClient
          .patch(id)
          .set({ views: totalViews + 1 })
          .commit();
      } catch (e) {
        console.error("Failed to update views:", e);
      }
    });
  } catch (e) {
    console.error("Failed to schedule view update:", e);
  }

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};
export default View;
