import Image from "next/image";

interface CartItemProps {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    description: string;
    removeFromCart: (id: string) => void;
}

export default function CartItem({ id, name, price, quantity, description, image, removeFromCart }: CartItemProps) {
    return (
        <div>
            <Image src={image} alt={name} width={60} height={60} className="rounded" />
            <div>
                <h5>{name}</h5>
                <p>{description}</p>
                <p>{quantity}</p>
                <p>${price}</p>
            </div>
            <button onClick={() => removeFromCart(id)}>Remove</button>
        </div>
    );
}