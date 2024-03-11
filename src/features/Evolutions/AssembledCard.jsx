import styled from "styled-components";
import EvolutionCard from "./EvolutionCard";
import { adjustText } from "../../utils/HelperFunctions";

const StyledImg = styled.img`
  max-height: 100%;
  padding: 1rem;
  margin-inline: auto;
  display: block;
`;

const StyledCardContent = styled.div`
  display: flex;
  justify-content: left;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
  z-index: 200;
  flex: 2;
  & p {
    word-wrap: normal;
    font-size: clamp(1.1rem, 2.2vw, 1.8rem);
  }
`;

const StyledH2 = styled.h2`
  font-size: clamp(1.8rem, 2.4vw, 2.4rem);
`;

const StyledP = styled.p`
  margin-left: auto;
  margin-right: 0.5rem; //come back
  @media (max-width: 425px) {
    margin-right: 0.25rem;
  }
`;

function AssembledCard({ data, size = 2, onClick, disable, index }) {
  if (!data) return null;
  return (
    <EvolutionCard
      key={data.id}
      onClick={onClick}
      disable={disable}
      index={index}
    >
      <EvolutionCard.EvolutionCardTop>
        <StyledImg
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`}
        />
      </EvolutionCard.EvolutionCardTop>
      <EvolutionCard.EvolutionCardBody
        textSize={size > 2 ? "1.4rem" : "1.8rem"}
      >
        <EvolutionCard.EvolutionCardBodyTitle>
          <StyledH2>{adjustText(data.name)}</StyledH2>
        </EvolutionCard.EvolutionCardBodyTitle>
        <div style={{ marginBlockStart: "auto" }}>
          {data.requirements.map((el, index) => (
            <StyledCardContent key={`${index}-${new Date()}`}>
              <p>{adjustText(el.property)}:</p>
              <StyledP>
                {el.value?.name
                  ? adjustText(el.value?.name)
                  : adjustText(el.value)}
              </StyledP>
            </StyledCardContent>
          ))}
        </div>
      </EvolutionCard.EvolutionCardBody>
    </EvolutionCard>
  );
}

export default AssembledCard;
