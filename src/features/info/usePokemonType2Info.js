import { useQuery } from "@tanstack/react-query";
import { getPokemonTypeInfo } from "../../services/infoApi";
import { usePokemonInfo } from "./usePokemonInfo";

export function usePokemonType2Info() {
  const { pokemonInfo } = usePokemonInfo();
  const type2 = pokemonInfo?.types[1]?.type.name;
  const {
    isLoading,
    data: pokemonType2Info,
    error,
  } = useQuery({
    queryKey: ["type", type2],
    queryFn: () => getPokemonTypeInfo(type2),
    enabled: !!type2,
  });
  return { isLoading, pokemonType2Info, error };
}
