import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function RootPage() {
  return (
    <Layout>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">안녕하세요! 인프콘2023</h1>
            <p className="py-6">이것은 Streaming SSR 예제입니다.</p>
            <Link to="/musicians/" className="btn btn-primary">
              시작
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
