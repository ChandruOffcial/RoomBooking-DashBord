import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
	const [show, setShow] = useState(false);
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<p>filter / </p>
			</Row>
			<Row>
				<CabinTable />
				<Button onClick={() => setShow((show) => !show)}>Add new Cabin</Button>
				{show && <CreateCabinForm />}
			</Row>
		</>
	);
}

export default Cabins;
