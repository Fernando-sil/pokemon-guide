import styled from "styled-components";

const StyledButtun = styled.button`
  max-height: 3rem;
  max-width: 10rem;
  background-color: var(--button-background);
  border-radius: 20px;
  border: none;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding: 1ch;

  & svg {
    transition: 0s;
  }

  &:hover {
    background-color: var(--button-background-active);
    color: white;
    /* transition: unset; */
  }
`;

function Button({ children, onClick }) {
  return <StyledButtun onClick={onClick}>{children}</StyledButtun>;
}

export default Button;
