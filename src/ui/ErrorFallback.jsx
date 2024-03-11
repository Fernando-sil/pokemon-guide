import { PiSmileySadLight } from "react-icons/pi";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";
import { IoHomeOutline } from "react-icons/io5";

const PageLayout = styled.main`
  height: 100vh;
  background-color: var(--button-background);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const StyledCard = styled.div`
  /* width: 50vw; */
  max-height: 50rem;
  background-color: white;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 2rem;
  padding: 1em;
  border-radius: 20px;
  box-shadow: 0.5px 4px 10px 4px;
`;

const StyledIcon = styled.div`
  & svg {
    font-size: clamp(10rem, 12vw, 15rem);
    color: var(--button-background-active);
  }
`;

const StyledButton = styled.div`
  margin-left: auto;
  grid-column: span 2;
  font-size: 1.8rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: clamp(1.4rem, 3vw, 3rem);
  & p {
    margin-left: 2rem;
    color: #494949;
    font-size: clamp(1.2rem, 2vw, 2.6rem);
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  console.log(error);
  return (
    <>
      <GlobalStyles />
      <PageLayout>
        <StyledCard>
          <StyledIcon>
            <PiSmileySadLight />
          </StyledIcon>
          <StyledDiv>
            <h1>Something went wrong</h1>
            <p>{error.message}</p>
          </StyledDiv>
          <StyledButton>
            <Button onClick={resetErrorBoundary}>
              <IoHomeOutline />
              <p>Home</p>
            </Button>
          </StyledButton>
        </StyledCard>
      </PageLayout>
    </>
  );
}

export default ErrorFallback;
