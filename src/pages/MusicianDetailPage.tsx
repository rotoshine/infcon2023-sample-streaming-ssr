import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Suspense } from "react";
import Musician from "@/components/Musician";

export default function MusicianDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();

  return (
    <Layout>
      <Suspense fallback={<span className="loading loading-dots loading-lg" />}>
        <Musician slug={slug} />
      </Suspense>
    </Layout>
  );
}
