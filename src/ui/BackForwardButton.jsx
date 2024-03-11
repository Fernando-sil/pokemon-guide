import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import styled from "styled-components";

const StyledButton = styled.button`
  color: black;
  background-color: green;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function BackForwardButton({ action, onCLick }) {
  return (
    <StyledButton onClick={onCLick}>
      {action === "forward" ? <HiChevronRight /> : <HiChevronLeft />}
    </StyledButton>
  );
}

export default BackForwardButton;
