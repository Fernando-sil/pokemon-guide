import { useNavigate, useParams } from "react-router-dom";
import { useMoveDetails } from "../features/Moves/useMoveDetails";
import { adjustText, displayMoveDetails } from "../utils/HelperFunctions";
import styled from "styled-components";
import { usePokemonInfo } from "../features/info/usePokemonInfo";
import { backGroundColors } from "../utils/Constants";
import RoundedContainer from "../ui/RoundedContainer";
import { GrTarget } from "react-icons/gr";
import { LuSwords } from "react-icons/lu";
import { FaRegSquarePlus } from "react-icons/fa6";
import { typeColors } from "../utils/Constants";
import TypeLabel from "../ui/TypeLabel";
import { VscTypeHierarchy } from "react-icons/vsc";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

const StyledContainer = styled.main`
  background-image: linear-gradient(${(p) => p.color});
  overflow: scroll;
`;
const StyledSection = styled.section`
  margin-inline: auto;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45rem, 1fr));
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 485px) {
    padding: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  }
`;

const StyledStats = styled.section`
  align-self: center;
  grid-row: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content max-content max-content;
  gap: 2.5rem;
`;

const GridTitle = styled.h2`
  grid-column: 1/-1;
  color: #c1c1c1;
  font-size: 3.6rem;
`;

const GridRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* font-size: 1.8rem; */
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  gap: 1rem;
  font-weight: 400;

  & svg {
    color: white;
    font-size: 3.6rem;
  }

  & p {
    font-size: 2.8rem;
    font-size: clamp(1.8rem, 3vw, 2.2rem);
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & h4 {
    padding-left: 3rem;
    color: #9d9d9d;
  }
`;
const StyledDiv2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: 2rem;
  gap: 0.5rem;
  font-size: 2rem;
  color: #c1c1c1;
`;

const StyledSpan = styled.div`
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: inline;
`;

function MoveDetails() {
  const { gameName, moveName } = useParams();
  const { isLoading, moveDetails, error } = useMoveDetails();
  const {
    isLoading: isLoadingInfo,
    pokemonInfo,
    error: errorInfo,
  } = usePokemonInfo();
  const navigate = useNavigate();
  const numWords = 110;
  const [expandText, setExpandText] = useState(false);

  if (isLoading || isLoadingInfo) return <Spinner />;
  const oringinalNumWords = moveDetails.effect_entries[0].effect
    .split(" ")
    .slice(0, numWords);
  const text = oringinalNumWords.join(" ");

  function handleExpandText() {
    setExpandText((expand) => !expand);
  }

  const { arr, games } = displayMoveDetails(moveDetails.flavor_text_entries);

  const filteredArr = arr.filter((el) => el.game === gameName);

  return (
    <StyledContainer
      color={`${backGroundColors[pokemonInfo.types[0].type.name]},${
        !backGroundColors[pokemonInfo.types[1]?.type.name]
          ? backGroundColors[pokemonInfo.types[0].type.name]
          : backGroundColors[pokemonInfo.types[1].type.name]
      }`}
    >
      <StyledSection>
        <RoundedContainer>
          <RoundedContainer.Title>
            {adjustText(moveName)}
          </RoundedContainer.Title>
          <StyledDiv2>
            <p>Version:</p>
            <p>{adjustText(gameName)}</p>
            <p>Category:</p>
            <p>{moveDetails.damage_class.name}</p>
          </StyledDiv2>
        </RoundedContainer>
        <StyledStats>
          <GridTitle>Move Stats</GridTitle>
          <GridRow>
            <GrTarget />
            <p>
              Accuracy:{" "}
              {!moveDetails.accuracy ? "--" : `${moveDetails.accuracy}%`}
            </p>
          </GridRow>
          <GridRow>
            <LuSwords />
            <p>Power: {!moveDetails.power ? "--" : moveDetails.power}</p>
          </GridRow>
          <GridRow>
            <FaRegSquarePlus />
            <p>PP: {moveDetails.pp}</p>
          </GridRow>
          <GridRow>
            <VscTypeHierarchy />
            <TypeLabel bgcolor={typeColors[moveDetails.type.name]}>
              <p>{moveDetails.type.name}</p>
            </TypeLabel>
          </GridRow>
        </StyledStats>
        <RoundedContainer>
          <RoundedContainer.Title>Description</RoundedContainer.Title>
          {filteredArr.length === 0 ? (
            <RoundedContainer.Description>
              No description available for {gameName}
            </RoundedContainer.Description>
          ) : (
            <>
              <RoundedContainer.Description>
                {filteredArr[0].description}
              </RoundedContainer.Description>
              <RoundedContainer.Note>
                <StyledDiv>
                  <h3>Note:</h3>
                  {oringinalNumWords.length < numWords ? (
                    <h4>{moveDetails.effect_entries[0].effect}</h4>
                  ) : (
                    <h4>
                      {expandText
                        ? moveDetails.effect_entries[0].effect
                        : `${text}...`}

                      <StyledSpan onClick={handleExpandText}>
                        {expandText ? " Read less" : " Read more"}
                      </StyledSpan>
                    </h4>
                  )}
                </StyledDiv>
              </RoundedContainer.Note>
            </>
          )}
        </RoundedContainer>
        <Button onClick={() => navigate(-1)}>
          <IoArrowBack />
          <p>Back</p>
        </Button>
      </StyledSection>
    </StyledContainer>
  );
}

export default MoveDetails;
