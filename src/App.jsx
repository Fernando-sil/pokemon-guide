import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Info from "./pages/Info";
import Evolutions from "./pages/Evolutions";
import LevelupMoves from "./pages/LevelupMoves";
import MoveDetails from "./pages/MoveDetails";
import TmHm from "./pages/TmHm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Locations from "./pages/Locations";
import LocationDetails from "./pages/LocationDetails";
import PageNotFound from "./ui/PageNotFound";

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate replace to="info/1" />} />
            <Route path="info/:pokemonID" element={<Info />} />
            <Route path="evolutions/:pokemonID" element={<Evolutions />} />
            <Route path="levelup-moves/:pokemonID" element={<LevelupMoves />} />
            <Route
              path="levelup-moves/:pokemonID/move/:gameName/:moveName"
              element={<MoveDetails />}
            />
            <Route path="tm-hm/:pokemonID" element={<TmHm />} />
            <Route
              path="tm-hm/:pokemonID/move/:gameName/:moveName"
              element={<MoveDetails />}
            />
            <Route path="locations/:pokemonID" element={<Locations />} />
            <Route
              path="locations/:pokemonID/location/:gameName/:locationName"
              element={<LocationDetails />}
            />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
