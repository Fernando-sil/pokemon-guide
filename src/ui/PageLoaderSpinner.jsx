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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(50px);
  z-index: 10;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function PageLoaderSpinner() {
  return (
    <Overlay>
      <StyledDiv></StyledDiv>
    </Overlay>
  );
}

export default PageLoaderSpinner;
