import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useCreateCabin = () => {
	const queryClient = useQueryClient();

	const { mutate: createCabin, isPending: createingStatus } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success("New Cabin Created.");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { createCabin, createingStatus };
};

export default useCreateCabin;
