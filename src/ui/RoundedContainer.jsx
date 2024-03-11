import styled from "styled-components";

const StyledRoundedContainer = styled.div`
  max-width: 1200px;
  background-color: rgba(0, 0, 0, 0.387);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  color: #c2c2c2;
  position: relative;
`;

const StyledTitle = styled.div`
  font-size: 2.8rem;
  padding-left: 0.5rem;
  font-weight: 700;
`;

const StyledDescription = styled.div`
  font-size: 1.8rem;
  padding-left: 2rem;
`;

const StyledNote = styled.div`
  padding-left: 3rem;
  color: #c1c1c1;
`;

function RoundedContainer({ children }) {
  return <StyledRoundedContainer>{children}</StyledRoundedContainer>;
}

function Title({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}

function Description({ children }) {
  return <StyledDescription>{children}</StyledDescription>;
}

function Note({ children }) {
  return <StyledNote>{children}</StyledNote>;
}

RoundedContainer.Title = Title;
RoundedContainer.Description = Description;
RoundedContainer.Note = Note;

export default RoundedContainer;
