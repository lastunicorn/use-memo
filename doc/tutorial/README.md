# React `useMemo` Tutorial

This tutorial shows how to use React's `useMemo` hook to memoize an expensive calculation so it does not run on unrelated rerenders.

Let's assume we need to calculate the sum of all integers from 1 to n and, because this calculation may be quite expensive for large numbers, we want to avoid recalculating it for each rerender of the component. The sum should be recalculated only when the n changes, then the value should be stored somehow, to be used for subsequent rerenders.

`useMemo` will save the day.

## Prerequisites

Before starting, install:

- Node.js 20+ (LTS recommended)
- npm (included with Node.js)
- VS Code (or your preferred editor)

Verify installation:

```bash
node --version
npm --version
```

## Step 1: Create the React project

Use Vite + TypeScript:

```bash
npm create vite@latest use-memo -- --template react-ts
cd use-memo
npm install
```

## Step 2: Create `UseMemoDemo` component

In `src/features/use-memo-demo/UseMemoDemo.tsx` file:

```tsx
export default function UseMemoDemo() {
	const [num, setNum] = useState(0);
	const [rerenderCount, setRerenderCount] = useState(0);

	console.log("Component is rendering...");

	// Memoize the sum so that the expensive calculation is not triggered on unrelated rerenders.
	const sum = useMemo(() => {
		console.log("Calculating sum...");

		let total = 0;

		// Simulate an expensive calculation.
		for (let i = 1; i <= num; i += 1) {
			total += i;
		}

		return total;
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
		<div className='card'>

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
```

### Make note of

- `useMemo(() => { ... }, [num])` recalculates the sum (the expensive calculation) only when `num` changes.
- Clicking `Rerender` triggers a re-render of the component, but does not recalculate the `sum`.
- `calculationCountRef` demonstrates how many times the memoized calculation actually runs.

## Step 3: Render the component from the app

Update `src/App.tsx`:

```tsx
import UseMemoDemo from './features/use-memo-demo/UseMemoDemo';

export default function App() {
	return <UseMemoDemo />;
}
```

## Step 4: Run the app

```bash
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

Now test the behavior:

- Change `Number` and watch `Calculation run count` increase.
- Click `Rerender` repeatedly and confirm only `Unrelated rerender count` increases while the memoized calculation stays unchanged.

## Additional Links

- [React docs: `useMemo`](https://react.dev/reference/react/useMemo)