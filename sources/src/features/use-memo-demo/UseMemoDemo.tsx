import { useMemo, useState, type ChangeEvent } from "react";
import "./UseMemoDemo.css";

export default function UseMemoDemo() {
	const [num, setNum] = useState(0);
	const [rerenderCount, setRerenderCount] = useState(0); // This state is used to trigger a component rerender without changing the num value.

	console.log("Component is rendering...");

	// Memoize the sum so that the expensive calculation is not triggered when unrelated rerenders occur.
	const sum = useMemo(() => {
		console.log("Calculating sum...");

		let sum = 0;

		// Simulate an expensive calculation.
		for (let i = 1; i <= num; i += 1) {
			sum += i;
		}

		return sum;
	}, [num]);

	function handleNumChange(event: ChangeEvent<HTMLInputElement>) {
		// When num changes, the component is rerendered, the calculation of the sum is triggered.
		setNum(Number(event.target.value));
	}

	function handleRerenderClick() {
		// When the rerender button is clicked, the component is rerendered, but the calculation
		// of the sum is not triggered because the num value was not changed.
		setRerenderCount(x => x + 1);
	}

	return (
		<div className="card">
			<header>
				<p className="card__description">
					(1)
					<br />
					Change "Number" a couple of times to trigger the sum calculation.
					<br />
					The sum is then memoized using <code>useMemo</code>.
				</p>
				<p className="card__description">
					(2)
					<br />
					Then click 'Rerender' button to trigger a component rerender.
					<br />
					Observe that the component is using the memoized values and the calculation process is not triggered
					unnecessary.
				</p>
				<p className="card__description">
					(note)
					<br />
					See the console for logs.
				</p>
			</header>

			<hr />

			<section className="card__controls">
				<label>
					Number:&nbsp;
					<input
						type="number"
						value={num}
						onChange={handleNumChange}
					/>
				</label>
			</section>

			<section className="card__display">
				<div>
					Sum (1 to {num}): {sum}
				</div>
			</section>

			<hr />

			<section className="card__controls">
				<button onClick={handleRerenderClick}>Re-render ({rerenderCount})</button>
			</section>
		</div>
	);
}
