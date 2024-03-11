import styled from "styled-components";
import { usePokemonInfo } from "../features/info/usePokemonInfo";
import { backGroundColors } from "../utils/Constants";
import { useEvolutions } from "../features/Evolutions/useEvolutions";
import {
  adjustText,
  displayNotFalsyMapEntries,
} from "../utils/HelperFunctions";
import EvolutionCard from "../features/Evolutions/EvolutionCard";
import { TbArrowBigDownLinesFilled } from "react-icons/tb";
import AssembledCard from "../features/Evolutions/AssembledCard";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Button from "../ui/Button";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import PageLoaderSpinner from "../ui/PageLoaderSpinner";
import Spinner from "../ui/Spinner";

const StyledContainer = styled.main`
  background-image: linear-gradient(${(props) => props.color});
  overflow-y: scroll;
  overflow-x: none;
  padding: 1rem 0.5rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  padding: 3rem;
  overflow-x: hidden;
  @media (max-width: 425px) {
    padding: 1rem;
  }
`;
const StyledDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
  & svg {
    font-size: 6rem;
    color: red;
    margin: auto;
  }
`;
const StyledArrows = styled.div`
  display: flex;
  gap: 15rem;
  & svg {
    font-size: 6rem;
    color: red;
    margin: auto;
  }
`;

const StyledImg = styled.img`
  height: 100%;
  max-width: 100%;
  padding: 1rem;
  margin-inline: auto;
  display: block;
`;

const StyledPosition = styled.div`
  display: flex;
  gap: 5rem;
  @media (max-width: 960px) {
    gap: 3rem;
  }
  @media (max-width: 515px) {
    gap: 2rem;
  }
`;
const StyledPositionButton = styled.div`
  display: flex;
  gap: 5rem;

  & svg {
    font-size: 3rem;
  }
`;

const StyledCarouselWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr;
  justify-items: stretch;
  overflow: hidden;
  max-height: 70rem;
  max-width: 62rem;
  gap: 5rem;
  padding-bottom: 3rem;
  margin-left: 2rem;
  background-color: transparent;
  border: transparent;
  align-items: stretch;

  @media (max-width: 960px) {
    gap: 5rem;
    max-width: 63rem;
    padding-left: 0.6rem;
  }
  @media (max-width: 670px) {
    gap: 4rem;
    max-width: 47rem;
  }
  @media (max-width: 515px) {
    gap: 3.5rem;
    max-width: 44rem;
    padding-left: 0.6rem;
  }
  @media (max-width: 425px) {
    gap: 2.1rem;
    max-width: 38rem;
    margin-left: 0;
    padding-left: 0.6rem;
  }
`;

function Evolutions() {
  const navigate = useNavigate();
  const [changeIndex, setChangeIndex] = useState(0);
  const { pokemonID } = useParams();
  const { pokemonInfo, isLoading, error } = usePokemonInfo();
  const {
    isLoading: isLoadingEvolution,
    evolutions,
    error: errorEvolutions,
  } = useEvolutions();

  if (isLoading || isLoadingEvolution) return <Spinner />;

  const requirement = displayNotFalsyMapEntries(
    evolutions.chain.evolves_to.map((evolve) => evolve)
  );

  const requirement2 = displayNotFalsyMapEntries(
    evolutions.chain.evolves_to
      .map((evolve) => evolve.evolves_to)
      .flatMap((evolve) => evolve)
  );

  const firstFormID = evolutions.chain.species.url.split("/").at(-2);
  const firstFormName = adjustText(evolutions.chain.species.name);

  function linkTo(id) {
    if (pokemonID === id) return;
    navigate(`/info/${id}`);
  }

  function handleIncrementIndex() {
    if (changeIndex >= requirement.length / 2 - 1) return;
    setChangeIndex((i) => i + 1);
  }
  function handleDecrementIndex() {
    if (changeIndex === 0) return;
    setChangeIndex((i) => i - 1);
  }

  return (
    <StyledContainer
      color={`${backGroundColors[pokemonInfo.types[0].type.name]},${
        !backGroundColors[pokemonInfo.types[1]?.type.name]
          ? backGroundColors[pokemonInfo.types[0].type.name]
          : backGroundColors[pokemonInfo.types[1].type.name]
      }`}
    >
      <StyledDiv>
        <EvolutionCard
          onClick={() => linkTo(firstFormID)}
          disable={pokemonID === firstFormID}
        >
          <EvolutionCard.EvolutionCardTop>
            <StyledImg
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${firstFormID}.png`}
            />
          </EvolutionCard.EvolutionCardTop>
          <EvolutionCard.EvolutionCardBody>
            <EvolutionCard.EvolutionCardBodyTitle>
              <h2>{adjustText(firstFormName)}</h2>
            </EvolutionCard.EvolutionCardBodyTitle>
          </EvolutionCard.EvolutionCardBody>
        </EvolutionCard>
        {requirement.length < 3 ? (
          <StyledPosition>
            {requirement.map((element, index) => (
              <StyledDiv2 key={element.id}>
                <TbArrowBigDownLinesFilled
                  style={{
                    transform: `${
                      requirement.length === 1
                        ? "rotate(0deg)"
                        : index % 2 === 0
                        ? "rotate(30deg)"
                        : "rotate(-30deg)"
                    }`,
                  }}
                />
                <AssembledCard
                  data={element}
                  key={element.id}
                  size={element.requirements.length}
                  onClick={() => linkTo(element.id)}
                  disable={pokemonID === element.id}
                />
              </StyledDiv2>
            ))}
          </StyledPosition>
        ) : (
          <>
            <StyledArrows>
              {[0, 1].map((d, index) => (
                <TbArrowBigDownLinesFilled
                  key={d}
                  style={{
                    transform: `${
                      requirement.length === 1
                        ? "rotate(0deg)"
                        : index % 2 === 0
                        ? "rotate(30deg)"
                        : "rotate(-30deg)"
                    }`,
                  }}
                />
              ))}
            </StyledArrows>
            <StyledCarouselWrapper>
              {requirement.map((element) => (
                <AssembledCard
                  data={element}
                  key={element.id}
                  size={element.requirements.length}
                  onClick={() => linkTo(element.id)}
                  disable={pokemonID === element.id}
                  index={changeIndex}
                />
              ))}
            </StyledCarouselWrapper>
            <StyledPositionButton>
              <Button onClick={handleDecrementIndex}>
                <MdOutlineArrowBackIos />
              </Button>
              <Button onClick={handleIncrementIndex}>
                <MdOutlineArrowForwardIos />
              </Button>
            </StyledPositionButton>
          </>
        )}
        <StyledPosition>
          {requirement2.map((element, index) => (
            <StyledDiv2 key={element.id}>
              <TbArrowBigDownLinesFilled
                style={{
                  transform: `${
                    requirement.length > 1 || requirement2.length === 1
                      ? "rotate(0deg)"
                      : index % 2 === 0
                      ? "rotate(30deg)"
                      : "rotate(-30deg)"
                  }`,
                }}
              />
              <AssembledCard
                data={element}
                key={element.id}
                size={element.requirements.length}
                onClick={() => linkTo(element.id)}
                disable={pokemonID === element.id}
              />
            </StyledDiv2>
          ))}
        </StyledPosition>
      </StyledDiv>
    </StyledContainer>
  );
}
export default Evolutions;
