import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/input";
import Spinner from "../../ui/Spinner";
import useSetting from "./useSetting";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
	const { setting = {}, isLoading, error } = useSetting();

	const { breakfastPrice, maxBookingLength, maxGuestsPerBooking, minBookingLength } = setting;

	const { updateSetting, updatingStatus } = useUpdateSetting();

	function handleUpdateSetting(e, feild) {
		const { value } = e.target;

		if (!value) return;
		updateSetting({ [feild]: value });
	}

	if (error) console.log(error);

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow lable="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disabled={updatingStatus}
					onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
				/>
			</FormRow>
			<FormRow lable="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					disabled={updatingStatus}
					onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
				/>
			</FormRow>
			<FormRow lable="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestsPerBooking}
					disabled={updatingStatus}
					onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
				/>
			</FormRow>
			<FormRow lable="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice}
					disabled={updatingStatus}
					onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
