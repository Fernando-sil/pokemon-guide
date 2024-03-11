import { NavLink } from "react-router-dom";
import styled from "styled-components";
import RoundedContainer from "./RoundedContainer";
import Table from "./Table";
import { adjustText } from "../utils/HelperFunctions";
import { HiOutlineArrowRight } from "react-icons/hi";
import GameSelector from "./GameSelector";

const StyledDiv = styled.div`
  margin-inline: auto;
  max-width: 1200px;
`;

const LinkNav = styled(NavLink)`
  /* padding: 1.2rem 2.4rem;
  border-bottom: 0.5px solid grey; */
  margin-inline: auto;
  font-size: 1.8rem;
  display: block;
  & svg {
    transition: all 0.3s;
  }
  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: white;
  }
`;

function LocationsList({
  filteredArray,
  incrementIndex,
  decrementIndex,
  games,
  index,
  pokemonInfoID,
}) {
  return (
    <StyledDiv>
      <RoundedContainer>
        <GameSelector
          index={index}
          pokemonInfoID={pokemonInfoID}
          incrementIndex={incrementIndex}
          decrementIndex={decrementIndex}
          games={games}
        />
        <Table>
          <Table.Header>
            <p>Move</p>
            <p>Max Level</p>
            <p>-</p>
          </Table.Header>

          {filteredArray.map((location) => (
            <Table.Row key={`${location.location}-${location.game}`}>
              <p>{adjustText(location.location)}</p>
              <p>{adjustText(location.maxLevels)}</p>
              <LinkNav
                key={`${location.location}-${location.game}`}
                to={`/locations/${pokemonInfoID}/location/${games[index]}/${location.location}`}
              >
                <HiOutlineArrowRight />
              </LinkNav>
            </Table.Row>
          ))}
        </Table>
      </RoundedContainer>
    </StyledDiv>
  );
}

export default LocationsList;
