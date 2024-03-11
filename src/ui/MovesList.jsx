import styled from "styled-components";
import { adjustText } from "../utils/HelperFunctions";
import RoundedContainer from "./RoundedContainer";
import { HiOutlineArrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import Table from "./Table";
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

function MovesList({
  filteredArray,
  incrementIndex,
  decrementIndex,
  games,
  index,
  pokemonInfoID,
  color,
}) {
  return (
    <StyledDiv>
      <RoundedContainer>
        <GameSelector
          index={index}
          games={games}
          pokemonInfoID={pokemonInfoID}
          incrementIndex={incrementIndex}
          decrementIndex={decrementIndex}
          color={color}
        />
        <Table>
          <Table.Header>
            <p>Move</p>
            <p>Level</p>
            <p>-</p>
          </Table.Header>

          {filteredArray.map((move) => (
            <Table.Row key={`${move.move}-${move.level}`}>
              <p>{adjustText(move.move)}</p>
              <p>{adjustText(move.level)}</p>
              <LinkNav
                key={`${move.move}-${move.level}`}
                to={`/levelup-moves/${pokemonInfoID}/move/${games[index]}/${move.move}`}
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

export default MovesList;
