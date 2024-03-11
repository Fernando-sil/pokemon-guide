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
import PageLoaderSpinner from "../ui/PageLoaderSpinner";
import PageNotFound from "../ui/PageNotFound";

const StyledInfo = styled.main`
  background-image: linear-gradient(${(p) => p.color});
  overflow-y: scroll;
  overflow-x: none;
  /* @media (max-width: 500px) {
    overflow-y: initial;
  } */
`;
const StyledSection = styled.section`
  margin-inline: auto;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(38rem, 1fr));
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 400px) {
    padding: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(33rem, 1fr));
  }
`;

const StyledDoublerow = styled.div`
  grid-row: span 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  padding-inline-end: 1rem;
  & img {
    margin-inline: auto;
    /* height: 100%; */
    height: 100%;
    max-width: 100%;
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
  gap: 2rem;
`;
const StyledTypes3 = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid: subgrid;
  /* margin-inline: auto; */
  //justify-content: space-evenly;
  gap: 2rem;
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
    return <PageLoaderSpinner />;

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

  const matrix = displayWeaknessStrength(
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
      <StyledSection>
        <RoundedContainer>
          <RoundedContainer.Title>Description</RoundedContainer.Title>
          <RoundedContainer.Description>
            {descriptionEntry[index]}
          </RoundedContainer.Description>
          <Choice>
            {index !== 0 && (
              <BackForwardButton
                action="backward"
                onCLick={decrementIndex}
                color={backGroundColors[pokemonInfo.types[0].type.name]}
              />
            )}
            <p>{games[index]}</p>
            {index < games.length - 1 && (
              <BackForwardButton
                action="forward"
                onCLick={incrementIndex}
                color={backGroundColors[pokemonInfo.types[0].type.name]}
              />
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
        <RoundedContainer>
          <RoundedContainer.Title>Stats</RoundedContainer.Title>
          <StatsChart />
        </RoundedContainer>
      </StyledSection>
      {/* <StyledDiv> */}
      <StyledSection>
        <StyledTypes2>
          <h3>Weak against: </h3>
          <StyledTypes3>
            {matrix.weakness.map((type) => (
              <TypeLabel bgcolor={typeColors[type]} key={type}>
                {type.replace(type[0], type[0].toUpperCase())}
              </TypeLabel>
            ))}
          </StyledTypes3>
          {matrix.resistance.length > 0 && (
            <>
              <h3>Strong against: </h3>
              <StyledTypes3>
                {matrix.resistance.map((type) => (
                  <TypeLabel bgcolor={typeColors[type]} key={type}>
                    {type.replace(type[0], type[0].toUpperCase())}
                  </TypeLabel>
                ))}
              </StyledTypes3>
            </>
          )}
          {matrix.immunity.length > 0 && (
            <>
              <h3>Immune to: </h3>
              <StyledTypes3>
                {matrix.immunity.map((type) => (
                  <TypeLabel bgcolor={typeColors[type]} key={type}>
                    {type.replace(type[0], type[0].toUpperCase())}
                  </TypeLabel>
                ))}
              </StyledTypes3>
            </>
          )}
        </StyledTypes2>
        {/* </StyledDiv> */}
      </StyledSection>
    </StyledInfo>
  );
}

export default Info;
