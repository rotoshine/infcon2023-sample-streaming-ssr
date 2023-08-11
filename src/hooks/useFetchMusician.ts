import { delay } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import ky from "ky-universal";

type Musician = {
  slug: string;
  name: string;
  bio: string;
  profileImageUrl: string;
  backgroundImageUrl: string;
  description: string;
};
const END_POINT =
  import.meta.env.VITE_APP_END_POINT ?? "https://api.infcon2023.roto.codes/api";

export default function useFetchMusician(slug: string, delayMs?: number) {
  return useQuery(["musicians", slug], () => fetchMusician(slug, delayMs));
}
export const fetchMusician = async (slug: string, delayMs?: number) => {
  if (delayMs) {
    await delay(delayMs);
  }
  return await ky(`${END_POINT}/musicians/${slug}`).json<Musician>();
};
