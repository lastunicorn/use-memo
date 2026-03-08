import "./ProductCard.css";
import { type Product } from "./Product";

type ProductCardProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<li className="ProductCard">
			<span className="ProductCardMain">
				<strong>{product.name}</strong>
				<small>{product.category}</small>
			</span>

			<span className="ProductCardSide">
				${product.price}
				<small>{product.rating.toFixed(1)} stars</small>
			</span>
		</li>
	);
};
