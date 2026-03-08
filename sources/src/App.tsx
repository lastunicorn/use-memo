import { useMemo, useRef, useState } from "react";
import "./App.css";

type Product = {
	id: number;
	name: string;
	category: "Laptop" | "Phone" | "Audio" | "Accessory";
	price: number;
	rating: number;
};

const PRODUCTS: Product[] = [
	{ id: 1, name: "NovaBook Air", category: "Laptop", price: 1199, rating: 4.8 },
	{ id: 2, name: "CoreNote 14", category: "Laptop", price: 899, rating: 4.4 },
	{ id: 3, name: "Orbit Pro 16", category: "Laptop", price: 1499, rating: 4.9 },
	{ id: 4, name: "Pulse X", category: "Phone", price: 999, rating: 4.7 },
	{ id: 5, name: "Pulse Lite", category: "Phone", price: 599, rating: 4.2 },
	{ id: 6, name: "Spark Mini", category: "Phone", price: 449, rating: 4.0 },
	{ id: 7, name: "Echo Pods 2", category: "Audio", price: 199, rating: 4.5 },
	{ id: 8, name: "Wave Studio", category: "Audio", price: 349, rating: 4.6 },
	{ id: 9, name: "BassBeam", category: "Audio", price: 129, rating: 3.9 },
	{ id: 10, name: "Flux Dock", category: "Accessory", price: 89, rating: 4.3 },
	{ id: 11, name: "Arc Sleeve", category: "Accessory", price: 49, rating: 4.1 },
	{ id: 12, name: "Snap Stand", category: "Accessory", price: 39, rating: 3.8 },
];

function expensiveFilter(
	products: Product[],
	query: string,
	minRating: number,
	maxPrice: number,
	sortBy: "price-asc" | "price-desc" | "rating-desc",
) {
	const normalizedQuery = query.trim().toLowerCase();

	const filtered = products
		.filter((product) => {
			// Simulate expensive CPU work so memoization impact is visible.
			let fakeCpuWork = 0;
			for (let i = 0; i < 25000; i += 1) {
				fakeCpuWork += Math.sqrt(i);
			}

			const matchesQuery = normalizedQuery
				? product.name.toLowerCase().includes(normalizedQuery) ||
					product.category.toLowerCase().includes(normalizedQuery)
				: true;

			void fakeCpuWork;
			return (
				matchesQuery && product.rating >= minRating && product.price <= maxPrice
			);
		});

	const sorted = [...filtered];
	sorted.sort((a, b) => {
		if (sortBy === "price-asc") {
			return a.price - b.price;
		}
		if (sortBy === "price-desc") {
			return b.price - a.price;
		}
		return b.rating - a.rating;
	});

	return sorted;
}

export default function App() {
	const [query, setQuery] = useState("");
	const [minRating, setMinRating] = useState(4);
	const [maxPrice, setMaxPrice] = useState(1500);
	const [sortBy, setSortBy] = useState<
		"price-asc" | "price-desc" | "rating-desc"
	>("rating-desc");
	const [rerenderCount, setRerenderCount] = useState(0);

	const filterRunsRef = useRef(0);
	const statsRunsRef = useRef(0);

	const visibleProducts = useMemo(() => {
		filterRunsRef.current += 1;
		return expensiveFilter(PRODUCTS, query, minRating, maxPrice, sortBy);
	}, [query, minRating, maxPrice, sortBy]);

	const stats = useMemo(() => {
		statsRunsRef.current += 1;
		const total = visibleProducts.length;
		const avgPrice =
			total === 0
				? 0
				: Math.round(
						visibleProducts.reduce((sum, item) => sum + item.price, 0) / total,
					);
		const bestRated = visibleProducts.reduce<Product | null>((best, item) => {
			if (!best || item.rating > best.rating) {
				return item;
			}
			return best;
		}, null);

		return { total, avgPrice, bestRated };
	}, [visibleProducts]);

	return (
		<div className="app-shell">
			<header>
				<p className="eyebrow">React Performance Demo</p>
				<h1>
					Understanding <code>useMemo</code>
				</h1>
				<p className="subtitle">
					Change filters to trigger expensive calculations. Then click
					 "Unrelated rerender" to see that memoized values are reused.
				</p>
			</header>

			<section className="panel controls">
				<label>
					Search product
					<input
						type="text"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Try: laptop, audio, pulse..."
					/>
				</label>

				<label>
					Minimum rating: <strong>{minRating.toFixed(1)}</strong>
					<input
						type="range"
						min={3.5}
						max={5}
						step={0.1}
						value={minRating}
						onChange={(event) => setMinRating(Number(event.target.value))}
					/>
				</label>

				<label>
					Max price: <strong>${maxPrice}</strong>
					<input
						type="range"
						min={100}
						max={1500}
						step={50}
						value={maxPrice}
						onChange={(event) => setMaxPrice(Number(event.target.value))}
					/>
				</label>

				<label>
					Sort by
					<select
						value={sortBy}
						onChange={(event) =>
							setSortBy(
								event.target.value as
									| "price-asc"
									| "price-desc"
									| "rating-desc",
							)
						}
					>
						<option value="rating-desc">Rating (high to low)</option>
						<option value="price-asc">Price (low to high)</option>
						<option value="price-desc">Price (high to low)</option>
					</select>
				</label>
			</section>

			<section className="panel metrics">
				<div>
					<p className="metric-label">Filter function runs</p>
					<p className="metric-value">{filterRunsRef.current}</p>
				</div>
				<div>
					<p className="metric-label">Stats calculation runs</p>
					<p className="metric-value">{statsRunsRef.current}</p>
				</div>
				<div>
					<p className="metric-label">Visible products</p>
					<p className="metric-value">{stats.total}</p>
				</div>
				<div>
					<p className="metric-label">Average price</p>
					<p className="metric-value">${stats.avgPrice}</p>
				</div>
			</section>

			<section className="panel rerender-demo">
				<div>
					<p className="metric-label">Unrelated rerender count</p>
					<p className="metric-value">{rerenderCount}</p>
				</div>
				<button onClick={() => setRerenderCount((count) => count + 1)}>
					Trigger Unrelated Rerender
				</button>
			</section>

			<section className="panel list-panel">
				<div className="list-header">
					<h2>Results</h2>
					{stats.bestRated ? (
						<p>
							Top rated: <strong>{stats.bestRated.name}</strong> (
							{stats.bestRated.rating.toFixed(1)} stars)
						</p>
					) : (
						<p>No products match current filters.</p>
					)}
				</div>

				<ul>
					{visibleProducts.map((product) => (
						<li key={product.id}>
							<span>
								<strong>{product.name}</strong>
								<small>{product.category}</small>
							</span>
							<span>
								${product.price}
								<small>{product.rating.toFixed(1)} stars</small>
							</span>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}