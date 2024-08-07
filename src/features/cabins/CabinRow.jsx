import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Button from "../../ui/Button";

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
	const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;

	const { isPending, isSuccess, deleteCabin } = useDeleteCabin();

	const { createCabin } = useCreateCabin();

	function handleDuplicate() {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			image,
			description,
		});
	}

	return (
		<>
			<TableRow role="row">
				<Img src={image} alt={name} />
				<Cabin>{name}</Cabin>

				<div>Fits up to {maxCapacity} geusts</div>
				<Price>{formatCurrency(regularPrice)}</Price>
				{discount ? <Discount>{discount}</Discount> : <span>-</span>}
				<div>
					<button onClick={handleDuplicate}>
						<HiSquare2Stack />
					</button>
					<Modal>
						<Modal.Open opens={"edit"}>
							<button>
								<HiPencil />
							</button>
						</Modal.Open>
						<Modal.Window opens={"edit"}>
							<CreateCabinForm cabin={cabin} />
						</Modal.Window>
						<Modal.Open opens="Delete">
							<button>
								<HiTrash />
							</button>
						</Modal.Open>
						<Modal.Window opens="Delete">
							<ConfirmDelete resourceName="Cabin" disabled={isPending || isSuccess} onConfirm={() => deleteCabin(id)} />
						</Modal.Window>
					</Modal>
				</div>
			</TableRow>
		</>
	);
};

CabinRow.propTypes = {
	cabin: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		maxCapacity: PropTypes.number,
		regularPrice: PropTypes.number,
		discount: PropTypes.number,
		image: PropTypes.string,
		description: PropTypes.string,
	}).isRequired,
	onclose: PropTypes.func,
};
export default CabinRow;
