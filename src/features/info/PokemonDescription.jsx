import styled from "styled-components";
import RoundedContainer from "../../ui/RoundedContainer";
import {
  adjustText,
  displayPokemonDescription,
} from "../../utils/HelperFunctions";
import { usePokemonDescription } from "./usePokemonDescription";
import { useState } from "react";

const StyledContent = styled.div`
  padding-left: 2rem;
`;

function PokemonDescription() {
  const { isLoading, pokemonDescription, error } = usePokemonDescription();
  // const [description, setDescription] = useState('')
  const [index, setIndex] = useState(0);
  if (isLoading) return <h1>Loading...</h1>;
  const descriptionArray = displayPokemonDescription(pokemonDescription);
  const games = descriptionArray.map((arr) => arr.game);
  const descriptionEntry = descriptionArray
    .map((arr) => arr.combined)
    .map((desc) => desc[games[index]]);

  function incrementIndex() {
    if (index >= games.length - 1) return;
    setIndex((i) => i + 1);
    console.log(index);
  }
  function decrementIndex() {
    if (index === 0) return;
    setIndex((i) => i - 1);
  }

  return (
    <StyledContent>
      {adjustText(descriptionEntry[0])}
      <button onClick={decrementIndex}>+</button>
      <button onClick={incrementIndex}>-</button>
    </StyledContent>
  );
}

export default PokemonDescription;
