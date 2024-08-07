import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button>Add New Cabin</Button>
				</Modal.Open>
				<Modal.Window opens="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

// const AddCabin = () => {
// 	const [show, setShow] = useState(false);
// 	return (
// 		<div>
// 			<Button onClick={() => setShow((show) => !show)}>Add new Cabin</Button>
// 			{show && (
// 				<Modal onClose={() => setShow((show) => !show)}>
// 					<CreateCabinForm onCloseModel={() => setShow((show) => !show)} />
// 				</Modal>
// 			)}
// 		</div>
// 	);
// };

export default AddCabin;
