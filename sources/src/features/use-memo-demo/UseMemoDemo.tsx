import { type ChangeEvent, useMemo, useRef, useState } from 'react';
import './UseMemoDemo.css';
import { DataStorage } from '../../data-access/DataStorage';
import { type Product } from './Product';
import ProductCard from './ProductCard';

export default function UseMemoDemo() {
	const [maxPrice, setMaxPrice] = useState(1500);
	const [rerenderCount, setRerenderCount] = useState(0);

	const filterRunsRef = useRef(0);

	// Memoize the filtering result so that the expensive calculation is not triggered when unrelated rerenders occur.
	const visibleProducts = useMemo(() => {
		filterRunsRef.current += 1;

		return DataStorage.Products
			.filter((product: Product) => {
				// Simulate expensive CPU work.
				// Change the iteration count to see more or less impact on performance.
				let fakeCpuWork = 0;
				for (let i = 0; i < 2000000; i += 1) {
					fakeCpuWork += Math.sqrt(i);
				}

				void fakeCpuWork;
				return product.price <= maxPrice;
			});
	}, [maxPrice]);

	function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>) {
		// When max price changes, the component is rerendered, the filtering process is triggered.
		setMaxPrice(Number(event.target.value));
	}

	function handleRerenderClick() {
		// When the rerender button is clicked, the component is rerendered, but the filtering process
		// is not triggered because the maxPrice value was not changed.
		setRerenderCount(x => x + 1);
	}

	return (
		<div className='app-shell'>
			<header>
				<p className='eyebrow'>React Performance Demo</p>
				<h1>
					Understanding <code>useMemo</code>
				</h1>
				<p className='subtitle'>
					1) Change max price to trigger a filtering process (let's pretend this is an expensive calculation). The filtering result is memoized.
					<br />
					2) Then click 'Rerender' button to see that the component is rerendered using the memoized values and the filtering process is not triggered.
				</p>
			</header>

			<section className='panel controls'>
				<label>
					Max price: <strong>${maxPrice}</strong>
					<input
						type='range'
						min={100}
						max={1500}
						step={50}
						value={maxPrice}
						onChange={handleMaxPriceChange}
					/>
				</label>
				<button onClick={handleRerenderClick}>Rerender</button>
			</section>

			<section className='panel metrics'>
				<div>
					<p className='metric-label'>Filter run count</p>
					<p className='metric-value'>{filterRunsRef.current}</p>
				</div>
				<div>
					<p className='metric-label'>Unrelated rerender count</p>
					<p className='metric-value'>{rerenderCount}</p>
				</div>
			</section>

			<section className='panel list-panel'>
				<div className='list-header'>
					<h2>Products</h2>
				</div>

				<ul>
					{visibleProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</ul>
			</section>
		</div>
	);
}
