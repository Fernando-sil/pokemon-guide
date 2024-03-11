import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

const StyledModal = styled.div`
  width: 35rem;
  max-height: 80vh;
  background-color: #0000007a;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  /* height: 10rem; */
  position: absolute;
  top: 7rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  padding: 1rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  animation: fade-down 0.8s;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 10;
  transition: all 0.5s;
`;

const StyledModalTitle = styled.div`
  font-size: 2.2rem;
  margin-inline: auto;
  z-index: 1000;
`;

const StyledButtonLeft = styled.button`
  height: 3rem;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: var(--button-background);
  z-index: 1000;
  border: none;
  border-right: solid grey 0.5px;
  padding: 1rem;
  line-height: 0px;
  ${(props) =>
    props.isActive &&
    css`
      background-color: var(--button-background-active);
      color: white;
    `}
`;
// StyledButtonLeft.defaultProps = {
//   active: true,
// };

const StyledButtonRight = styled.button`
  height: 3rem;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: var(--button-background);
  z-index: 1000;
  border: none;
  border-left: solid grey o.5px;
  padding: 1rem;
  line-height: 0px;
  ${(props) =>
    props.isActive &&
    css`
      background-color: var(--button-background-active);
      color: white;
    `}
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  overflow-y: scroll;
  z-index: 1000;
`;

function Modal({ children, onClick }) {
  return createPortal(
    <Overlay onClick={onClick}>
      <StyledModal onClick={(e) => e.stopPropagation()}>{children}</StyledModal>
    </Overlay>,
    document.body
  );
}

function ModalTitle({ children, active }) {
  return <StyledModalTitle>{children}</StyledModalTitle>;
}

function ModalButtonLeft({ children, onClick, isActive }) {
  return (
    <StyledButtonLeft onClick={onClick} isActive={isActive}>
      {children}
    </StyledButtonLeft>
  );
}
function ModalButtonRight({ children, onClick, isActive }) {
  return (
    <StyledButtonRight onClick={onClick} isActive={isActive}>
      {children}
    </StyledButtonRight>
  );
}

function ModalBody({ children }) {
  return <StyledBody>{children}</StyledBody>;
}

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.LeftButton = ModalButtonLeft;
Modal.Rightutton = ModalButtonRight;

export default Modal;
