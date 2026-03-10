import { type ChangeEvent, useMemo, useRef, useState } from 'react';
import './UseMemoDemo.css';

export default function UseMemoDemo() {
	const [num, setNum] = useState(0);
	const [rerenderCount, setRerenderCount] = useState(0);

	const calculationCountRef = useRef(0);

	// Memoize the sum so that the expensive calculation is not triggered when unrelated rerenders occur.
	const sum = useMemo(() => {
		calculationCountRef.current += 1;

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
		<div className='app-shell'>
			<header>
				<h1>
					React <code>useMemo</code> Demo
				</h1>
				<p className='subtitle'>
					1) Change "Number" a couple of times to trigger the sum calculation: <code>sum(1, number)</code>.
					<br/>
					The sum is then memoized using <code>useMemo</code>.
				</p>
				<p className='subtitle'>
					2) Then click 'Rerender' button to trigger a component rerender. Observe that the component is using the memoized values and the calculation process is not triggered unnecessary.
				</p>
			</header>

			<section className='panel controls'>
				<label>
					Number
					<input
					 type='number' value={num} onChange={handleNumChange} />
				</label>
				<button onClick={handleRerenderClick}>Rerender</button>
			</section>

			<section className='panel'>
				<div>
					<p className='metric-label'>Sum from 1 to {num}</p>
					<p className='metric-value'>{sum}</p>
				</div>
			</section>

			<section className='panel metrics'>
				<div>
					<p className='metric-label'>Sum calculation count</p>
					<p className='metric-value'>{calculationCountRef.current}</p>
				</div>
				<div>
					<p className='metric-label'>Unrelated rerender count</p>
					<p className='metric-value'>{rerenderCount}</p>
				</div>
			</section>
		</div>
	);
}
