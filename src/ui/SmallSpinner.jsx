import styled from "styled-components";

const StyledSpinner = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 15px solid grey;
  border-top: 15px solid blue;
  animation: spin 2s linear infinite;
`;

function SmallSpinner() {
  return <StyledSpinner></StyledSpinner>;
}

export default SmallSpinner;
