//import { delay } from "@/utils";
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
export default function useFetchMusicians() {
  return useQuery(["musicians"], fetchMusicians);
}

export const fetchMusicians = async () => {
  //await delay(5000);
  return await ky(`${END_POINT}/musicians`).json<Musician[]>();
};
