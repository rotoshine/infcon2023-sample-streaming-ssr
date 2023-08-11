import { delay } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import ky from "ky-universal";

type Musician = {
  slug: string;
  name: string;
  bio: string;
  profileImageUrl: string;
};
const END_POINT =
  import.meta.env.VITE_APP_END_POINT ?? "https://api.infcon2023.roto.codes/api";
export default function useFetchMusicians(delayMs?: number) {
  return useQuery(["musicians"], () => fetchMusicians(delayMs));
}

export const fetchMusicians = async (delayMs?: number) => {
  if (delayMs) {
    await delay(delayMs);
  }
  return await ky(`${END_POINT}/musicians`).json<Musician[]>();
};
