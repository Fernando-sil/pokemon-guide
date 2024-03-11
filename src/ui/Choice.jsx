import styled from "styled-components";

const StyledChoice = styled.div`
  display: flex;
  gap: 2rem;
  margin-inline: auto;
  align-items: center;
  justify-content: center;
`;

function Choice({ children }) {
  return <StyledChoice>{children}</StyledChoice>;
}

export default Choice;
