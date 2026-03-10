import { type Product } from '../features/use-memo-demo/Product';

type DataStorageType = {
	Products: Product[];
};

export const DataStorage: DataStorageType = {
	Products: [
		{ id: 1, name: 'NovaBook Air', category: 'Laptop', price: 1199, rating: 4.8 },
		{ id: 2, name: 'CoreNote 14', category: 'Laptop', price: 899, rating: 4.4 },
		{ id: 3, name: 'Orbit Pro 16', category: 'Laptop', price: 1499, rating: 4.9 },
		{ id: 4, name: 'Pulse X', category: 'Phone', price: 999, rating: 4.7 },
		{ id: 5, name: 'Pulse Lite', category: 'Phone', price: 599, rating: 4.2 },
		{ id: 6, name: 'Spark Mini', category: 'Phone', price: 449, rating: 4.0 },
		{ id: 7, name: 'Echo Pods 2', category: 'Audio', price: 199, rating: 4.5 },
		{ id: 8, name: 'Wave Studio', category: 'Audio', price: 349, rating: 4.6 },
		{ id: 9, name: 'BassBeam', category: 'Audio', price: 129, rating: 3.9 },
		{ id: 10, name: 'Flux Dock', category: 'Accessory', price: 89, rating: 4.3 },
		{ id: 11, name: 'Arc Sleeve', category: 'Accessory', price: 49, rating: 4.1 },
		{ id: 12, name: 'Snap Stand', category: 'Accessory', price: 39, rating: 3.8 },
	],
};
