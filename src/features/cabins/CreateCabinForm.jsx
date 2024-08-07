import useEditCabin from "./useEditCabin";
import useCreateCabin from "./useCreateCabin";
import PropTypes from "prop-types";

import Input from "../../ui/input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabin = {}, onCloseModel }) {
	const { createCabin, createingStatus } = useCreateCabin();

	const { editCabin, editingStatus } = useEditCabin();

	const isDisable = editingStatus || createingStatus;

	const { id: isEditId, ...editCabinData } = cabin;

	const isEdit = Boolean(isEditId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		mode: "onTouched",
		defaultValues: isEdit ? editCabinData : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (isEdit)
			editCabin(
				{ editCabinData: { ...data, image: image }, isEditId },
				{
					onSuccess: () => {
						reset();
						onCloseModel?.();
					},
				}
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onCloseModel?.();
					},
				}
			);
	}
	return (
		<Form onSubmit={handleSubmit(onSubmit)} type={onCloseModel ? "modal" : "regular"}>
			<FormRow lable={"Cabin name"} error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isDisable}
					{...register("name", {
						required: "Name is Required",
					})}
				/>
			</FormRow>

			<FormRow lable={"Maximum capacity"} error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isDisable}
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
					disabled={isDisable}
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
					disabled={isDisable}
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
					disabled={isDisable}
					defaultValue=""
					{...register("description", {
						required: "Description is Required",
					})}
				/>
			</FormRow>

			<FormRow lable={"Cabin photo"} error={errors?.image?.message}>
				<FileInput
					id="image"
					disabled={isDisable}
					accept="image/*"
					{...register("image", {
						required: isEdit ? false : "Image is Required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button type="reset" variations="secondary" onClick={() => onCloseModel?.()}>
					Cancel
				</Button>
				<Button type="submit" disabled={isDisable}>
					{isEdit ? "Edit Cabin" : "Create Cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}
CreateCabinForm.propTypes = {
	cabin: PropTypes.object,
	onCloseModel: PropTypes.func,
};

export default CreateCabinForm;
