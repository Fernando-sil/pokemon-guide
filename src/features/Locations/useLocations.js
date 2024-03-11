import { useQuery } from "@tanstack/react-query";
import { getLocations } from "../../services/infoApi";
import { useParams } from "react-router-dom";

export function useLocations() {
  const { pokemonID } = useParams();
  const {
    isLoading,
    data: locations,
    error,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: () => getLocations(pokemonID),
  });

  return { isLoading, locations, error };
}
