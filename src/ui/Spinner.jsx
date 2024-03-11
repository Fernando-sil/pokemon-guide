import styled from "styled-components";

const StyledDiv = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
`;

const Overlay = styled.div`
  background-color: var(--sidebar-background);
  position: fixed;
  bottom: 0;
  right: 0;
  width: 81%;
  height: 91%;
  /* background-color: var(--backdrop-color); */
  backdrop-filter: blur(50px);
  z-index: 10;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function Spinner() {
  return (
    <Overlay>
      <StyledDiv></StyledDiv>
    </Overlay>
  );
}

export default Spinner;
