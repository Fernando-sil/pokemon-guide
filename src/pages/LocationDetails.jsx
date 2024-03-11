import styled from "styled-components";
import { useLocationsDetails } from "../features/Locations/useLocationsDetails";
import GenericCard from "../ui/GenericCard";
import { methods } from "../utils/ConstantComponents";
import { adjustText, displayLocationDetails } from "../utils/HelperFunctions";
import { backGroundColors } from "../utils/Constants";
import { usePokemonInfo } from "../features/info/usePokemonInfo";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const StyledPage = styled.main`
  background-image: linear-gradient(${(p) => p.color});
  overflow: scroll;
  padding: 2rem;
`;
const StyledSection = styled.section`
  margin-inline: auto;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  padding: 2rem;
  gap: 3rem;
  margin-bottom: 3rem;
  justify-items: center;
`;

function LocationDetails() {
  const navigate = useNavigate();
  const { isLoading, pokemonInfo, error } = usePokemonInfo();
  const {
    locationName,
    gameName,
    isLoading: isLoadingLocation,
    locationDetails,
  } = useLocationsDetails();

  if (isLoading || isLoadingLocation) return;
  const locationInfo = displayLocationDetails(
    locationDetails,
    gameName,
    locationName
  );

  return (
    <StyledPage
      color={`${backGroundColors[pokemonInfo.types[0].type.name]},${
        !backGroundColors[pokemonInfo.types[1]?.type.name]
          ? backGroundColors[pokemonInfo.types[0].type.name]
          : backGroundColors[pokemonInfo.types[1].type.name]
      }`}
    >
      <StyledSection>
        {locationInfo.map((detail, index) => (
          <GenericCard key={`${detail.method}-${index}`}>
            <GenericCard.Icon>{methods[detail.method]}</GenericCard.Icon>
            <GenericCard.Title>{adjustText(detail.method)}</GenericCard.Title>
            {/* <StyledDiv> */}
            <GenericCard.Body>
              <p>Max Level:</p>
              <p>{detail.maxLevel}</p>
              <p>Min Level:</p>
              <p>{detail.minLevel}</p>
              <p>Conditions:</p>
              <p>
                {detail.conditions === ""
                  ? "Not specific"
                  : adjustText(detail.conditions)}
              </p>
            </GenericCard.Body>
            {/* </StyledDiv> */}
          </GenericCard>
        ))}
      </StyledSection>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack />
        <p>Back</p>
      </Button>
    </StyledPage>
  );
}

export default LocationDetails;
