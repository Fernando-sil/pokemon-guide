import styled from "styled-components";

const StyledTable = styled.div`
  min-width: 80%;
  margin-bottom: 1rem;
  margin-inline: auto;
`;

const StyledHeader = styled.div`
  padding: 1.6rem 2.4rem;
  font-size: clamp(1.8rem, 3vw, 3.6rem);
  border-bottom: 1px solid white;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  display: grid;
  grid-template-columns: 4fr 2fr auto;
  column-gap: 2.5rem;
  align-items: center;
`;

const StyledRow = styled.div`
  padding: 1.2rem 2.6rem;
  border-bottom: 1px solid white;
  font-size: clamp(1.6rem, 2.5vw, 2.8rem);
  display: grid;
  align-items: center;
  grid-template-columns: 4fr 2fr auto;
  column-gap: 2.5rem;
  &:not(:last-child) {
    border-bottom: 1px solid grey;
  }
`;

function Table({ children }) {
  return <StyledTable>{children}</StyledTable>;
}
function tableHeader({ children }) {
  return <StyledHeader>{children}</StyledHeader>;
}
function tableRow({ children }) {
  return <StyledRow>{children}</StyledRow>;
}

Table.Header = tableHeader;
Table.Row = tableRow;

export default Table;
