import styled from "styled-components";
import MovesList from "../ui/MovesList";
import { usePokemonInfo } from "../features/info/usePokemonInfo";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { displayPokemonMoves } from "../utils/HelperFunctions";
import { backGroundColors } from "../utils/Constants";
import Spinner from "../ui/Spinner";
import PageLoaderSpinner from "../ui/PageLoaderSpinner";

const StyledDiv = styled.div`
  background-image: linear-gradient(${(p) => p.color});
  padding: 3rem;
  overflow: scroll;
`;

function LevelupMoves() {
  const { pokemonInfo, isLoading, error } = usePokemonInfo();
  const [searchParams, setSearchParams] = useSearchParams();
  const gameIndex = searchParams.get("index");

  const [index, setIndex] = useState(gameIndex ? Number(gameIndex) : 0);

  // useEffect(
  //   function () {
  //     searchParams.set(`${pokemonID}/${games[0]}`),
  //       setSearchParams(searchParams);
  //   },
  //   [games, pokemonID, searchParams, setSearchParams]
  // );

  if (isLoading) return <Spinner />;

  const { games, arr } = displayPokemonMoves(pokemonInfo.moves);
  const pokemonInfoID = pokemonInfo.id;
  arr.sort((a, b) => a.level - b.level);
  const filteredArray = arr.filter((element) => element.game === games[index]);

  function incrementIndex() {
    if (index >= games.length - 1) return;
    setIndex((i) => i + 1);
    searchParams.set("index", Number(index) + 1);
    setSearchParams(searchParams);
  }
  function decrementIndex() {
    if (index === 0) return;
    setIndex((i) => i - 1);
    searchParams.set("index", Number(index) - 1);
    setSearchParams(searchParams);
  }

  if (isLoading) return <Spinner />;
  return (
    <StyledDiv
      color={`${backGroundColors[pokemonInfo.types[0].type.name]},${
        !backGroundColors[pokemonInfo.types[1]?.type.name]
          ? backGroundColors[pokemonInfo.types[0].type.name]
          : backGroundColors[pokemonInfo.types[1].type.name]
      }`}
    >
      <MovesList
        filteredArray={filteredArray}
        incrementIndex={incrementIndex}
        decrementIndex={decrementIndex}
        games={games}
        index={index}
        pokemonInfoID={pokemonInfoID}
      />
    </StyledDiv>
  );
}

export default LevelupMoves;
