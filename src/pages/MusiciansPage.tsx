import Layout from "../components/Layout";
import { Suspense } from "react";
import Musicians from "@/components/Musicians";

export default function MusiciansPage() {
  return (
    <Layout>
      <div className="min-h-screen container pt-4 mx-auto border-neutral-content">
        <Suspense
          fallback={<span className="loading loading-dots loading-lg" />}
        >
          <Musicians />
        </Suspense>
      </div>
    </Layout>
  );
}
