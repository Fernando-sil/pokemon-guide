import { useQuery } from "@tanstack/react-query";
import { getEvolutions } from "../../services/infoApi";
import { usePokemonInfo } from "../info/usePokemonInfo";
import evolutionData from "../../data/Evolution2.json";

export function useEvolutions() {
  const { pokemonInfo } = usePokemonInfo();
  const pokemonName = pokemonInfo?.forms[0].name;
  const chainID = Object.keys(evolutionData).find((key) =>
    evolutionData[key].includes(pokemonName)
  );
  const {
    isLoading,
    data: evolutions,
    error,
  } = useQuery({
    queryKey: ["evolutions"],
    queryFn: () => getEvolutions(chainID),
    enabled: !!pokemonName,
  });
  return { isLoading, evolutions, error };
}
