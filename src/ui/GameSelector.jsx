import styled from "styled-components";
import { adjustText } from "../utils/HelperFunctions";
import BackForwardButton from "./BackForwardButton";

const StyledLabel = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  align-items: center;
`;

const StyledImgWrapper = styled.div`
  & img {
    max-height: 100%;
    max-width: 100%;
  }
`;

const H1 = styled.p`
  font-size: clamp(2.4rem, 3vw, 4rem);
  font-weight: 700;
`;

const StyledDiv = styled.div`
  margin-inline: auto;
`;

const StyledImgBtn = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  max-height: 100%;
`;

function GameSelector({
  index,
  games,
  decrementIndex,
  incrementIndex,
  pokemonInfoID,
  listName = "Moves",
}) {
  return (
    <StyledLabel>
      <div>
        <H1>{listName} list</H1>
        <H1>{adjustText(games[index])}</H1>
      </div>
      <StyledDiv>
        <StyledImgWrapper>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/${pokemonInfoID}.png`}
          />
        </StyledImgWrapper>
        <StyledImgBtn>
          <BackForwardButton
            onCLick={decrementIndex}
            action="backward"
          ></BackForwardButton>
          <BackForwardButton
            onCLick={incrementIndex}
            action="forward"
          ></BackForwardButton>
        </StyledImgBtn>
      </StyledDiv>
    </StyledLabel>
  );
}

export default GameSelector;
