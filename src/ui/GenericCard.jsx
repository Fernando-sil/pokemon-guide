import styled from "styled-components";

const StyledCard = styled.div`
  min-width: 30rem;
  max-width: 35rem;
  background-color: #663239;
  /* background-color: var(--button-background-active); */
  border-radius: 20px;
  box-shadow: 1rem 1rem 3rem 0.5rem #232323;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
`;

const StyledTtile = styled.h2`
  font-size: 2.6rem;
  color: #eaeaea;
  margin-inline: auto;
`;

const StyledIcon = styled.div`
  margin-inline: auto;
  & svg {
    padding: 0;
    margin: 0;
    font-size: 10rem;
    color: white;
  }
`;

const StyledBody = styled.div`
  font-size: 1.8rem;
  color: var(--color-note);
  /* padding: 0.5rem; */
  max-width: 90%;
  margin-inline: auto;
  display: grid;
  grid-template-columns: max-content 15ch;
  column-gap: 2rem;
`;

function GenericCard({ children }) {
  return <StyledCard>{children}</StyledCard>;
}

function GenericCardIcon({ children }) {
  return <StyledIcon>{children}</StyledIcon>;
}
function GenericCardTitle({ children }) {
  return <StyledTtile>{children}</StyledTtile>;
}
function GenericCardBody({ children }) {
  return <StyledBody>{children}</StyledBody>;
}

GenericCard.Title = GenericCardTitle;
GenericCard.Body = GenericCardBody;
GenericCard.Icon = GenericCardIcon;

export default GenericCard;
