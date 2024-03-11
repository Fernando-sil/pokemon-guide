import styled from "styled-components";
import { usePokemonInfo } from "../features/info/usePokemonInfo";
import { backGroundColors } from "../utils/Constants";
import { useReducer } from "react";
import Modal from "./Modal";
import { IoSearchSharp } from "react-icons/io5";
import pokemonData from "../data/Pokemon.json";
import { adjustText, displayPokemonsByType } from "../utils/HelperFunctions";
import ListItem from "./ListItem";
import Pagination from "./Pagination";
import { useSearch } from "../features/Search/useSearch";
import { createPortal } from "react-dom";
import Button from "./Button";

const StyledHeader = styled.header`
  font-size: 3.2rem;
  background-color: ${(p) => p.color};
  text-align: center;
  color: var(--light-text);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 0.25rem 2rem;
`;

const StyledPosition = styled.div`
  margin-inline: auto;
  display: flex;
  gap: 2rem;
  position: relative;
`;

const StyledInput = styled.input`
  background-color: white;
  border-radius: 20px;
  width: 25rem;
  height: 5rem;
  padding: 2rem;
  color: black;
  font-size: 1.6rem;
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 500;
`;

const StyledButton = styled.button`
  border: none;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  background-color: var(--button-background-active);
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* justify-content: center; */
  padding: 0.5rem 2rem;
  overflow-y: scroll;
`;

const StyledImg = styled.img`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
`;

const StyledDiv = styled.div`
  display: flex;
  margin-inline: auto;
`;
const StyledP = styled.p`
  color: var(--light-text);
  font-size: 1.8rem;
`;

const initialState = {
  buttonLeft: false,
  buttonRight: false,
  isModalOpen: false,
  isSearchOpen: false,
  search: "",
  pageNumber: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "openSearchBar":
      return {
        ...state,
        isSearchOpen: true,
        isModalOpen: true,
        buttonLeft: true,
      };
    case "searchByName":
      return { ...state, buttonLeft: true, buttonRight: false, search: "" };
    case "searchByType":
      return { ...state, buttonLeft: false, buttonRight: true, search: "" };
    case "search":
      return { ...state, search: action.payload };
    case "increment":
      return { ...state, pageNumber: state.pageNumber + action.payload };
    case "decrement":
      return { ...state, pageNumber: state.pageNumber - action.payload };
    case "closeSearchBar":
      return {
        ...state,
        isModalOpen: false,
        isSearchOpen: false,
        buttonLeft: false,
        buttonRight: false,
        search: "",
        pageNumber: 1,
      };
    default:
      throw new Error("Action unknown");
  }
}

function Header() {
  let data;

  const [
    { buttonLeft, buttonRight, isModalOpen, isSearchOpen, search, pageNumber },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { pokemonInfo, isLoading } = usePokemonInfo();
  const {
    isLoading: isLoadingSearch,
    searchType,
    error,
  } = useSearch(search.toUpperCase().toLowerCase());

  if (isLoading) return <StyledHeader>Loading...</StyledHeader>;
  const { name } = pokemonInfo.forms[0];

  const pokemonList = searchType?.pokemon;

  const typeData = displayPokemonsByType(pokemonList);

  function openSearchBar() {
    dispatch({ type: "openSearchBar" });
  }

  function closeModal() {
    //
    dispatch({ type: "closeSearchBar" });
  }

  if (search.length > 2 && buttonRight && pokemonList) {
    data = typeData.slice((pageNumber - 1) * 20, pageNumber * 20);
  } else if (search.length > 2 && buttonLeft) {
    data = pokemonData.filter((el) =>
      el.name.includes(search.toUpperCase().toLowerCase())
    );
  } else {
    data = pokemonData.slice((pageNumber - 1) * 20, pageNumber * 20);
  }

  function increasePagination() {
    if (pokemonList && buttonRight) {
      if (pageNumber >= typeData.length / 20) return;
    } else {
      if (pageNumber >= data.length / 20) return;
    }
    dispatch({ type: "increment", payload: 1 });
  }
  function decreasePagination() {
    if (pageNumber === 1) return;
    dispatch({ type: "decrement", payload: 1 });
  }

  return (
    <StyledHeader color={backGroundColors[pokemonInfo.types[0].type.name]}>
      <StyledPosition>
        {isSearchOpen &&
          createPortal(
            <StyledInput
              type="text"
              onChange={(e) =>
                dispatch({ type: "search", payload: e.target.value })
              }
              value={search}
              placeholder="Search by name or type"
            />,
            document.body
          )}

        {name.replace(name[0], name[0].toUpperCase())}
      </StyledPosition>
      <StyledButton onClick={openSearchBar}>
        <IoSearchSharp />
      </StyledButton>

      {isModalOpen && (
        <Modal onClick={closeModal}>
          <StyledDiv>
            <Modal.LeftButton
              onClick={() =>
                dispatch({
                  type: "searchByName",
                })
              }
              isActive={buttonLeft}
            >
              Name
            </Modal.LeftButton>
            <Modal.Rightutton
              onClick={() =>
                dispatch({
                  type: "searchByType",
                })
              }
              isActive={buttonRight}
            >
              Type
            </Modal.Rightutton>
          </StyledDiv>
          <Modal.Body>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <StyledP>Search Pokemon</StyledP>
              <Button onClick={closeModal}>Close</Button>
            </div>
            <StyledList>
              {(!isLoadingSearch || buttonLeft) &&
                data.map((el) => (
                  <ListItem
                    key={el.id}
                    label={adjustText(el.name)}
                    to={`info/${el.id}`}
                    onClick={() => dispatch({ type: "closeSearchBar" })}
                    icon={
                      <StyledImg
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${el.id}.png`}
                      ></StyledImg>
                    }
                  ></ListItem>
                ))}
              {(search === "" || search.length <= 2 || buttonRight) && (
                <Pagination
                  increasePagination={increasePagination}
                  decreasePagination={decreasePagination}
                >
                  {pageNumber} of{" "}
                  {pokemonList && buttonRight
                    ? Math.ceil(typeData.length / 20)
                    : Math.ceil(pokemonData.length / 20)}
                </Pagination>
              )}
            </StyledList>
          </Modal.Body>
        </Modal>
      )}
    </StyledHeader>
  );
}

export default Header;
