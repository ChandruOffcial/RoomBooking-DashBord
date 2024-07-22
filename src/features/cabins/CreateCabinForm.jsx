import Input from "../../ui/input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabin = {} }) {
	const queryClient = useQueryClient();
	const { id: isEditId, ...editCabin } = cabin;

	const isEdit = Boolean(isEditId);
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		mode: "onTouched",
		defaultValues: isEdit ? editCabin : {},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success("New Cabin Created.");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			reset();
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	const { errors } = formState;

	function onSubmit(data) {
		mutate({ ...data, image: data.image[0] });
	}
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow lable={"Cabin name"} error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isPending}
					{...register("name", {
						required: "Name is Required",
					})}
				/>
			</FormRow>

			<FormRow lable={"Maximum capacity"} error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isPending}
					{...register("maxCapacity", {
						required: "Capacity is Required",
						min: {
							value: 0,
							message: "Capacity should be Aleast 1 ",
						},
					})}
				/>
			</FormRow>

			<FormRow lable={"Regular price"} error={errors?.regularPrice?.message}>
				<Input
					type="number"
					disabled={isPending}
					id="regularPrice"
					{...register("regularPrice", {
						required: "Regular Price is Required",
					})}
				/>
			</FormRow>

			<FormRow lable={"Discount"} error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isPending}
					defaultValue={0}
					{...register("discount", {
						required: "Discount is Required",
						validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular Price",
					})}
				/>
			</FormRow>

			<FormRow lable={"Description for website"} error={errors?.description?.message}>
				<Textarea
					id="description"
					disabled={isPending}
					defaultValue=""
					{...register("description", {
						required: "Description is Required",
					})}
				/>
			</FormRow>

			<FormRow lable={"Cabin photo"} error={errors?.image?.message}>
				<FileInput
					id="image"
					disabled={isPending}
					accept="image/*"
					{...register("image", {
						required: "Image is Required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button type="reset" variations="secondary">
					Cancel
				</Button>
				<Button type="submit" disabled={isPending}>
					{isEdit ? "Edit Cabin" : "Create Cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
