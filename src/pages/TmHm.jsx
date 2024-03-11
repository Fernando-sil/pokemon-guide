import styled from "styled-components";
import { usePokemonInfo } from "../features/info/usePokemonInfo";
import { backGroundColors } from "../utils/Constants";
import { displayTmHm } from "../utils/HelperFunctions";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import TmHmList from "../ui/TmHmList";
import Spinner from "../ui/Spinner";

const StyledMain = styled.main`
  background-image: linear-gradient(${(p) => p.color});
  overflow: scroll;
  padding: 3rem;
`;

function TmHm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const gameIndex = searchParams.get("index");
  const [index, setIndex] = useState(gameIndex ? Number(gameIndex) : 0);

  const { isLoading, pokemonInfo, error } = usePokemonInfo();

  if (isLoading) return <Spinner />;
  const pokemonID = pokemonInfo.id;
  const { games, arr } = displayTmHm(pokemonInfo.moves);
  arr.sort((a, b) => a.move.localeCompare(b.move));
  const filteredArray = arr.filter((el) => el.game === games[index]);

  function incrementIndex() {
    if (index >= games.length - 1) return;
    setIndex((i) => i + 1);
    searchParams.set("index", index + 1);
    setSearchParams(searchParams);
  }

  function decrementIndex() {
    if (index === 0) return;
    setIndex((i) => i - 1);
    searchParams.set("index", index - 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledMain
      color={`${backGroundColors[pokemonInfo.types[0].type.name]},${
        !backGroundColors[pokemonInfo.types[1]?.type.name]
          ? backGroundColors[pokemonInfo.types[0].type.name]
          : backGroundColors[pokemonInfo.types[1].type.name]
      }`}
    >
      <TmHmList
        games={games}
        index={index}
        filteredArray={filteredArray}
        decrementIndex={decrementIndex}
        incrementIndex={incrementIndex}
        pokemonInfoID={pokemonID}
        color={backGroundColors[pokemonInfo.types[0].type.name]}
      />
    </StyledMain>
  );
}

export default TmHm;
