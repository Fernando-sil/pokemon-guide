import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAttackDescription } from "../../services/infoApi";

export function useMoveDetails() {
  const { moveName } = useParams();
  const {
    isLoading,
    data: moveDetails,
    error,
  } = useQuery({
    queryKey: ["move"],
    queryFn: () => getAttackDescription(moveName),
  });
  return { isLoading, moveDetails, error };
}
