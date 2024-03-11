import { useQuery } from "@tanstack/react-query";
import { getPokemonInfo } from "../../services/infoApi";
import { useParams } from "react-router-dom";

export function usePokemonInfo() {
  const { pokemonID = 1 } = useParams();
  const {
    isLoading,
    data: pokemonInfo,
    error,
  } = useQuery({
    queryKey: ["info", pokemonID],
    queryFn: () => getPokemonInfo(pokemonID),
    throwOnError: true,
  });
  return { isLoading, pokemonInfo, error };
}
