import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledListItem = styled(NavLink)`
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: var(--button-background);
  border-radius: 20px;
  padding: 0.5rem 2rem;

  &:link,
  &:visited {
    font-size: 1.6rem;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: white;
    background-color: var(--button-background-active);
    border-radius: 20px;
    padding: 1rem 1.5rem;
    font-size: 1.8rem;
  }

  & svg {
    transition: all 0.1s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: white;
    height: 1.8rem;
    width: 1.8rem;
  }
`;

function ListItem({ icon, label, to, onClick }) {
  return (
    <StyledListItem to={to} onClick={onClick}>
      {icon}
      {label}
    </StyledListItem>
  );
}
export default ListItem;
