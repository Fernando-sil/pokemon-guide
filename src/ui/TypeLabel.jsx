import styled from "styled-components";

const StyledTypeLabel = styled.div`
  /* height: 3rem; */
  padding: 0.2em 1em;
  background-color: ${(p) => p.bgcolor};
  border-radius: 20px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark-background-text);
`;

function TypeLabel({ children, bgcolor }) {
  return <StyledTypeLabel bgcolor={bgcolor}>{children}</StyledTypeLabel>;
}

export default TypeLabel;
