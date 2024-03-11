import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import styled from "styled-components";

const StyledButton = styled.button`
  color: black;
  background-color: ${(p) => p.color};
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function BackForwardButton({ action, onCLick, color }) {
  return (
    <StyledButton onClick={onCLick} color={color}>
      {action === "forward" ? <HiChevronRight /> : <HiChevronLeft />}
    </StyledButton>
  );
}

export default BackForwardButton;
