import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useEditCabin = () => {
	const queryClient = useQueryClient();

	const { mutate: editCabin, isPending: editingStatus } = useMutation({
		mutationFn: ({ editCabinData, isEditId }) => createEditCabin(editCabinData, isEditId),
		onSuccess: () => {
			toast.success("Cabin Edited SuccessFully..");
			queryClient.invalidateQueries({
				queryKey: ["setting"],
			});
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { editCabin, editingStatus };
};

export default useEditCabin;
