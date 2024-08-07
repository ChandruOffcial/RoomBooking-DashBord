import { useEffect, useRef } from "react";

const useOutSideClick = (close) => {
	const ref = useRef();
	useEffect(
		function () {
			function handleEvent(e) {
				if (ref.current && !ref.current.contains(e.target)) {
					console.log("clicked");
					close();
				}
			}

			document.addEventListener("click", handleEvent, true);

			return () => document.removeEventListener("click", handleEvent, true);
		},
		[close]
	);

	return ref;
};

export default useOutSideClick;
