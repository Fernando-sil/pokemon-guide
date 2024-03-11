import { useQuery } from "@tanstack/react-query";
import { getLocations } from "../../services/infoApi";
import { useParams } from "react-router-dom";

export function useLocationsDetails() {
  const { pokemonID, locationName, gameName } = useParams();
  const {
    isLoading,
    data: locationDetails,
    error,
  } = useQuery({
    queryKey: ["locationDetails"],
    queryFn: () => getLocations(pokemonID),
  });
  return { locationName, gameName, isLoading, locationDetails, error };
}
