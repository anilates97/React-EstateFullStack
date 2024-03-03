import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

function useProperties() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allProperties",
    queryFn: getAllProperties,
    refetchOnWindowFocus: false,
  });
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
}

export default useProperties;
