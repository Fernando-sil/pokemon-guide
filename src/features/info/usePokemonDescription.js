import { useQuery } from "@tanstack/react-query";
import { getPokemonDescription } from "../../services/infoApi";
import { useParams } from "react-router-dom";

export function usePokemonDescription() {
  const { pokemonID } = useParams();
  const {
    isLoading,
    data: pokemonDescription,
    error,
  } = useQuery({
    queryKey: ["description", pokemonID],
    queryFn: () => getPokemonDescription(pokemonID),
  });
  return { isLoading, pokemonDescription, error };
}
