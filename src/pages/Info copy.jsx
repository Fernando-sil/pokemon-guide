import styled from "styled-components";
import RoundedContainer from "../ui/RoundedContainer";
import StatsChart from "../features/info/StatsChart";
import TypeLabel from "../ui/TypeLabel";
import { usePokemonInfo } from "../features/info/usePokemonInfo";
import {
  displayPokemonDescription,
  displayWeaknessStrength,
} from "../utils/HelperFunctions";
import { usePokemonTypeInfo } from "../features/info/usePokemonTypeInfo";
import { usePokemonType2Info } from "../features/info/usePokemonType2Info";
import { backGroundColors, typeColors } from "../utils/Constants";
import { usePokemonDescription } from "../features/info/usePokemonDescription";
import { useState } from "react";
import BackForwardButton from "../ui/BackForwardButton";
import Choice from "../ui/Choice";

const StyledInfo = styled.main`
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  grid-template-columns: repeat(auto-fit, minmax(45rem, 1fr));
  /* grid-template-rows: repeat(auto-fit, minmax(45rem, 1fr)); */
  /* background-color: ${(p) => p.color}; */
  background-image: linear-gradient(${(p) => p.color});
  /* background-image: linear-gradient(#7faa9f, #765faf); */
  padding: 2rem;
  gap: 2rem;
  overflow: scroll;
`;

const StyledContent = styled.div`
  padding-left: 2rem;
`;
const StyledDoublerow = styled.div`
  grid-row: span 2;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  & img {
    height: 100%;
    aspect-ratio: 1;
  }
`;
const StyledTypes = styled.div`
  display: flex;
  margin-inline: auto;
  //justify-content: space-evenly;
  gap: 2rem;
`;
const StyledTypes2 = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: 3rem;
`;
const StyledTypes3 = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid: subgrid;
  /* margin-inline: auto; */
  //justify-content: space-evenly;
  gap: 2rem;
`;

const StyledDiv = styled.div`
  grid-column: 1 / 3;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: start;
`;

function Info() {
  const { isLoading, pokemonInfo, error } = usePokemonInfo();

  const {
    isLoading: isloadingType,
    pokemonTypeInfo,
    error: errorType,
  } = usePokemonTypeInfo();
  const {
    isLoading: isloadingType2,
    pokemonType2Info,
    error: errorType2,
  } = usePokemonType2Info();

  const {
    isLoading: isLoadingDescription,
    pokemonDescription,
    error: errorDescription,
  } = usePokemonDescription();
  const [index, setIndex] = useState(0);
  if (isLoading || isloadingType || isloadingType2 || isLoadingDescription)
    return <h1>Loading...</h1>;
  const descriptionArray = displayPokemonDescription(pokemonDescription);
  const games = descriptionArray.map((arr) => arr.game);
  const descriptionEntry = descriptionArray
    .map((arr) => arr.combined)
    .map((desc) => desc[games[index]]);

  function incrementIndex() {
    if (index >= games.length - 1) return;
    setIndex((i) => i + 1);
  }
  function decrementIndex() {
    if (index === 0) return;
    setIndex((i) => i - 1);
  }

  const { resists, weak } = displayWeaknessStrength(
    pokemonTypeInfo.damage_relations,
    pokemonType2Info?.damage_relations
  );

  return (
    <StyledInfo
      color={`${backGroundColors[pokemonInfo.types[0].type.name]},${
        !backGroundColors[pokemonInfo.types[1]?.type.name]
          ? backGroundColors[pokemonInfo.types[0].type.name]
          : backGroundColors[pokemonInfo.types[1].type.name]
      }`}
    >
      <RoundedContainer label="Description">
        <StyledContent>{descriptionEntry[index]}</StyledContent>
        <Choice>
          {index !== 0 && (
            <BackForwardButton action="backward" onCLick={decrementIndex} />
          )}
          <p>{games[index]}</p>
          {index < games.length - 1 && (
            <BackForwardButton action="forward" onCLick={incrementIndex} />
          )}
        </Choice>
      </RoundedContainer>
      <StyledDoublerow>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonInfo.id}.png`}
        />
        <StyledTypes>
          <TypeLabel
            bgcolor={typeColors[pokemonInfo.types[0].type.name]}
            key="1"
          >
            {pokemonInfo.types[0].type.name.replace(
              pokemonInfo.types[0].type.name[0],
              pokemonInfo.types[0].type.name[0].toUpperCase()
            )}
          </TypeLabel>
          {pokemonInfo.types[1]?.type.name && (
            <TypeLabel
              bgcolor={typeColors[pokemonInfo.types[1].type.name]}
              key="2"
            >
              {pokemonInfo.types[1].type.name.replace(
                pokemonInfo.types[1].type.name[0],
                pokemonInfo.types[1].type.name[0].toUpperCase()
              )}
            </TypeLabel>
          )}
        </StyledTypes>
      </StyledDoublerow>
      <RoundedContainer label="Stats">
        <StatsChart />
      </RoundedContainer>
      <StyledDiv>
        <StyledTypes2>
          <h3>Week against: </h3>
          <StyledTypes3>
            {weak.map((type) => (
              <TypeLabel bgcolor={typeColors[type]} key={type}>
                {type.replace(type[0], type[0].toUpperCase())}
              </TypeLabel>
            ))}
          </StyledTypes3>
          <h3>Strong against: </h3>
          <StyledTypes3>
            {resists.map((type) => (
              <TypeLabel bgcolor={typeColors[type]} key={type}>
                {type.replace(type[0], type[0].toUpperCase())}
              </TypeLabel>
            ))}
          </StyledTypes3>
        </StyledTypes2>
      </StyledDiv>
    </StyledInfo>
  );
}

export default Info;
