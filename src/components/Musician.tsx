import useFetchMusician from "@/hooks/useFetchMusician";

interface Props {
  slug: string;
}

export default function Musician({ slug }: Props) {
  const { data } = useFetchMusician(slug);

  if (!data) {
    return null;
  }

  return (
    <>
      <div
        className="h-96 bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(https://api.infcon2023.roto.codes${data.backgroundImageUrl})`,
        }}
      ></div>
      <div className="flex gap-12 px-16 -mt-16">
        <img
          className="rounded-full w-32 h-32 object-cover"
          src={`https://api.infcon2023.roto.codes${data.profileImageUrl}`}
          alt={`${data.name} 프로필`}
        />
        <div className="flex-col">
          <div className="text-4xl font-bold text-primary-content mt-6">
            {data.name}
          </div>
          <div
            className="text-secondary-content"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <a className="btn btn-primary" href="/musicians/">
          목록으로
        </a>
      </div>
    </>
  );
}
