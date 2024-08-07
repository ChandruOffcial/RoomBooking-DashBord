import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

const useDeleteCabin = () => {
	const queryClient = useQueryClient();

	const {
		isPending,
		isSuccess,
		mutate: deleteCabin,
	} = useMutation({
		mutationKey: ["delete"],
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			toast.success("Cabin Deleted SuccessFully..!");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => toast.error(err.message),
	});
	return { isPending, isSuccess, deleteCabin };
};

export default useDeleteCabin;
