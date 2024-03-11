import styled from "styled-components";
import ListItem from "./ListItem";
import { HiOutlineInformationCircle, HiOutlineDownload } from "react-icons/hi";
import { GiUpgrade } from "react-icons/gi";
import { MdOutlineCatchingPokemon, MdOutlineMoveUp } from "react-icons/md";
import { useParams } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";

const StyledMain = styled.aside`
  grid-row: 1 / -1;
  height: 100%;
  background-color: var(--sidebar-background);

  @media (max-width: 880px) {
    transform: translateX(-150%);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 26rem;
    z-index: 200;
    animation: ${(p) => p.effect} 0.7s linear forwards;
    box-shadow: 0.1rem 0 2.5rem 0.5rem #313131;
  }
`;

const StyledSideBar = styled.div`
  //background-image: url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png");
  backdrop-filter: blur(100px);
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 3rem 0;
  width: 100%;
  overflow-y: scroll;
`;

const StyledList = styled.ul`
  font-size: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 2rem;
  backdrop-filter: blur(100px);
  z-index: 99;
`;

const StyledIcon = styled.div`
  margin-inline: auto;
  & svg {
    color: var(--button-background);
    font-size: 20rem;
  }
`;

const StyledDiv = styled.div`
  display: none;
  @media (max-width: 880px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 5rem;
    width: 5rem;
    z-index: 300;
  }
  & svg {
    display: none;
    line-height: 0;

    /* color: black; */
    @media (max-width: 880px) {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      height: 5rem;
      width: 5rem;
      z-index: 300;
      color: ${(p) => p.color};
      /* color: blue; */
    }
  }
`;

function SideBar() {
  const { pokemonID = 1 } = useParams();
  const [openMenu, setOpenMenu] = useState(false);

  function toggleSideBar() {
    setOpenMenu((menu) => !menu);
  }
  return (
    <>
      <StyledDiv onClick={toggleSideBar}>
        <IoMenuOutline color={openMenu ? "#de3249" : "black"} />
      </StyledDiv>
      <StyledMain effect={openMenu ? "slide-from-left" : "slide-out-right"}>
        <StyledSideBar>
          <StyledIcon>
            <MdOutlineCatchingPokemon />
          </StyledIcon>
          <div>
            <StyledList>
              <ListItem
                icon={<HiOutlineInformationCircle />}
                label="Info"
                key="info"
                to={`/info/${pokemonID}`}
                onClick={toggleSideBar}
              ></ListItem>
              <ListItem
                icon={<GiUpgrade />}
                label="Evolutions"
                key="Evolutions"
                to={`/evolutions/${pokemonID}`}
                onClick={toggleSideBar}
              ></ListItem>
              <ListItem
                icon={<MdOutlineMoveUp />}
                label="Level-up Moves"
                key="Level-up Moves"
                to={`/levelup-moves/${pokemonID}`}
                onClick={toggleSideBar}
              ></ListItem>
              <ListItem
                icon={<HiOutlineDownload />}
                label="TM/HM"
                key="TM/HM"
                to={`/tm-hm/${pokemonID}`}
                onClick={toggleSideBar}
              ></ListItem>
              <ListItem
                icon={<GrLocation />}
                label="Locations"
                key="Locations"
                to={`/locations/${pokemonID}`}
                onClick={toggleSideBar}
              ></ListItem>
            </StyledList>
          </div>
        </StyledSideBar>
      </StyledMain>
    </>
  );
}

export default SideBar;
