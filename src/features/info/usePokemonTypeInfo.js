import { useQuery } from "@tanstack/react-query";
import { getPokemonTypeInfo } from "../../services/infoApi";
import { usePokemonInfo } from "./usePokemonInfo";

export function usePokemonTypeInfo() {
  const { pokemonInfo } = usePokemonInfo();
  const type1 = pokemonInfo?.types[0].type.name;
  const {
    isLoading,
    data: pokemonTypeInfo,
    error,
  } = useQuery({
    queryKey: ["type", type1],
    queryFn: () => getPokemonTypeInfo(type1),
    enabled: !!type1,
  });
  return { isLoading, pokemonTypeInfo, error };
}
