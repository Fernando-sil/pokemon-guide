import { createContext } from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  background-color: var(--color-dark-100);
  max-width: 35rem;
  min-width: 27rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: clip;
  box-shadow: 1rem 1rem 2rem 0.5rem #2e2e2e;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transform: translateX(
    calc(
      -${(p) => p.index * 200}% - ${(p) => (p.index < 1 ? 0 : `${p.index * 34.5}%`)}
    )
  );

  @media (max-width: 960px) {
    transform: translateX(
      calc(
        -${(p) => p.index * 200}% - ${(p) => (p.index < 1 ? 0 : `${p.index * 36}%`)}
      )
    );
  }
  @media (max-width: 670px) {
    transform: translateX(
      calc(
        -${(p) => p.index * 200}% - ${(p) => (p.index < 1 ? 0 : `${p.index * 38}%`)}
      )
    );
  }
  @media (max-width: 515px) {
    transform: translateX(
      calc(
        -${(p) => p.index * 200}% - ${(p) => (p.index < 1 ? 0 : `${p.index * 38}%`)}
      )
    );
  }
  @media (max-width: 425px) {
    transform: translateX(
      calc(
        -${(p) => p.index * 200}% - ${(p) => (p.index < 1 ? 0 : `${p.index * 24}%`)}
      )
    );
  }

  @media (max-width: 670px) {
    /* max-width: 28rem; */
    min-width: 20rem;
  }

  @media (max-width: 515px) {
    /* max-width: 28rem; */
    min-width: 18.5rem;
  }
  @media (max-width: 425px) {
    /* max-width: 28rem; */
    min-width: 17rem;
  }
`;

StyledCard.defaultProps = {
  index: 0,
};

const StyledCardTop = styled.div`
  background-color: var(--color-dark-200);
  width: 100%;
  height: 30rem;
  @media (max-width: 670px) {
    height: 25rem;
  }

  @media (max-width: 515px) {
    height: 15rem;
  }
`;

const StyledCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--light-text);
  padding: 1rem;
  font-size: ${(props) => props.textSize};
  /* flex-grow: 1; */
  /* background-color: #363636 */
`;

const StyledCardBodyTitle = styled.div`
  text-align: center;
`;

const EvolutionCardContext = createContext();

function EvolutionCard({ children, onClick, disable, index }) {
  return (
    <StyledCard onClick={onClick} as="a" disabled={disable} index={index}>
      {children}
    </StyledCard>
  );
}

function EvolutionCardTop({ children }) {
  return <StyledCardTop>{children}</StyledCardTop>;
}

function EvolutionCardBody({ children, textSize }) {
  return <StyledCardBody textSize={textSize}>{children}</StyledCardBody>;
}

function EvolutionCardBodyTitle({ children }) {
  return <StyledCardBodyTitle>{children}</StyledCardBodyTitle>;
}

EvolutionCard.EvolutionCardTop = EvolutionCardTop;
EvolutionCard.EvolutionCardBody = EvolutionCardBody;
EvolutionCard.EvolutionCardBodyTitle = EvolutionCardBodyTitle;

export default EvolutionCard;
