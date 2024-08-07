import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

const useCabin = () => {
	const { data: cabins, isLoading } = useQuery({
		queryKey: ["cabins"],
		queryFn: getCabins,
	});
	return { cabins, isLoading };
};

export default useCabin;
