import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <nav className="navbar p-4 bg-neutral flex gap-4">
        <Link to="/" aria-label="홈으로 이동">
          <img className="h-10" src="/images/logo.webp" alt="인디스트릿 로고" />
        </Link>
        <Link className="btn btn-ghost normal-case text-xl" to="/musicians/">
          뮤지션 목록
        </Link>
        <Link className="btn btn-ghost normal-case text-xl" to="/live/">
          공연 목록
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
