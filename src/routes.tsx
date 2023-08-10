import MusicianDetailPage from "./pages/MusicianDetailPage";
import MusiciansPage from "./pages/MusiciansPage";
import RootPage from "./pages/RootPage";

const routes = [
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/musicians",
    element: <MusiciansPage />,
  },
  {
    path: "/musicians/:slug",
    element: <MusicianDetailPage />,
  },
];

export default routes;
