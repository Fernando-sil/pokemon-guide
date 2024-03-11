import styled from "styled-components";
import { usePokemonInfo } from "../features/info/usePokemonInfo";
import { backGroundColors } from "../utils/Constants";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { displayLocations } from "../utils/HelperFunctions";
import LocationsMovesList from "../ui/LocationsMovesList";
import { useLocations } from "../features/Locations/useLocations";
import Spinner from "../ui/Spinner";

const StyledContainer = styled.main`
  background-image: linear-gradient(${(p) => p.color});
  overflow: scroll;
  padding: 3rem;
`;

const StyledMain = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function Locations() {
  const { pokemonInfo, isLoading } = usePokemonInfo();
  const { locations, isLoading: isLoadingLocations } = useLocations();
  const [searchParams, setSearchParams] = useSearchParams();
  const gameIndex = searchParams.get("index");

  const [index, setIndex] = useState(gameIndex ? Number(gameIndex) : 0);

  if (isLoading || isLoadingLocations) return <Spinner />;
  // if (locations.length === 0)
  //   return (
  //     <StyledContainer
  //       color={`${backGroundColors[pokemonInfo.types[0].type.name]},${
  //         !backGroundColors[pokemonInfo.types[1]?.type.name]
  //           ? backGroundColors[pokemonInfo.types[0].type.name]
  //           : backGroundColors[pokemonInfo.types[1].type.name]
  //       }`}
  //     >
  //       <StyledMain>
  //         <h1>This Pokemon does not exist in the wild.</h1>
  //       </StyledMain>
  //     </StyledContainer>
  //   );

  const { games, obj } = displayLocations(locations);
  const pokemonInfoID = pokemonInfo.id;
  obj.sort((a, b) => a.level - b.level);
  const filteredArray = obj.filter((element) => element.game === games[index]);

  function incrementIndex() {
    if (index >= games.length - 1) return;
    setIndex((i) => i + 1);
    searchParams.set("index", Number(index) + 1);
    setSearchParams(searchParams);
  }
  function decrementIndex() {
    if (index === 0) return;
    setIndex((i) => i - 1);
    searchParams.set("index", index - 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledContainer
      color={`${backGroundColors[pokemonInfo.types[0].type.name]},${
        !backGroundColors[pokemonInfo.types[1]?.type.name]
          ? backGroundColors[pokemonInfo.types[0].type.name]
          : backGroundColors[pokemonInfo.types[1].type.name]
      }`}
    >
      <LocationsMovesList
        filteredArray={filteredArray}
        incrementIndex={incrementIndex}
        decrementIndex={decrementIndex}
        games={games}
        index={index}
        pokemonInfoID={pokemonInfoID}
      ></LocationsMovesList>
    </StyledContainer>
  );
}

export default Locations;
