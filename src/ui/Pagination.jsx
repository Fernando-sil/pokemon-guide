import styled from "styled-components";
import Button from "./Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  color: var(--dark-background-text);
`;

function Pagination({ children, increasePagination, decreasePagination }) {
  return (
    <StyledPagination>
      <Button onClick={decreasePagination}>
        <FaChevronLeft />
      </Button>
      <p>{children}</p>
      <Button onClick={increasePagination}>
        <FaChevronRight />
      </Button>
    </StyledPagination>
  );
}

export default Pagination;
