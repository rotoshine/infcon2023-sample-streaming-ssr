import useFetchMusicians from "@/hooks/useFetchMusicians";
import { Link } from "react-router-dom";

export default function Musicians() {
  const { data } = useFetchMusicians();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 p-6 md:p-0">
      {data?.map((musician, i) => (
        <div key={i} className="card w-full bg-info-content shadow-xl">
          <figure>
            <img
              className="w-full aspect-square object-cover"
              src={`https://api.infcon2023.roto.codes${musician.profileImageUrl}`}
              alt={`${musician.name} 프로필`}
            />
          </figure>
          <div className="card-body ">
            <h2 className="card-title">{musician.name}</h2>
            <p>{musician.bio}</p>
            <div className="card-actions justify-end">
              <Link
                to={`/musicians/${musician.slug}/`}
                className="btn btn-primary"
              >
                자세히 보기
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
