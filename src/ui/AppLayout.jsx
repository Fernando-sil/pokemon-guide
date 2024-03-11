import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Info from "../pages/Info";
import Evolutions from "../pages/Evolutions";
import LevelupMoves from "../pages/LevelupMoves";
import Locations from "../pages/Locations";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header></Header>
      <SideBar></SideBar>
      <Outlet>
        <Info />
        <Evolutions />
        <LevelupMoves />
        <Locations />
      </Outlet>
    </StyledAppLayout>
  );
}

export default AppLayout;
