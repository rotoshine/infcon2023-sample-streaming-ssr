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
      <div className="pb-8 md:pb-0">
        <div className="flex flex-col md:flex-row lg:gap-12 md:px-16 -mt-16 items-center">
          <img
            className="rounded-full w-64 h-64 lg:w-48 lg:h-48 object-cover bg-slate-50"
            src={`https://api.infcon2023.roto.codes${data.profileImageUrl}`}
            alt={`${data.name} 프로필`}
          />
          <div className="flex-col lg:mt-10 px-8 lg:p-0">
            <div className="text-4xl font-bold text-primary-content mt-6 drop-shadow-2xl">
              {data.name}
            </div>
            <div
              className="text-secondary-content max-w-4xl"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <a className="btn btn-primary" href="/musicians/">
            목록으로
          </a>
        </div>
      </div>
    </>
  );
}
