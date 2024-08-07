import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

const useUpdateSetting = () => {
	const queryClient = useQueryClient();

	const { mutate: updateSetting, isPending: updatingStatus } = useMutation({
		mutationFn: updateSettingApi,
		onSuccess: () => {
			toast.success("Setting Update SuccessFully..");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { updateSetting, updatingStatus };
};

export default useUpdateSetting;
