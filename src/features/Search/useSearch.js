import { useQuery } from "@tanstack/react-query";
import { getPokemonsByType } from "../../services/infoApi";
import { pokemonTypes } from "../../utils/Constants";

export function useSearch(typeName) {
  const isValid = pokemonTypes.includes(typeName);
  const {
    isLoading,
    data: searchType,
    error,
  } = useQuery({
    queryKey: ["searchType", typeName],
    queryFn: () => getPokemonsByType(typeName),
    enabled: isValid,
  });
  return { isLoading, searchType, error };
}
