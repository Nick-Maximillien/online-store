// components/CartItem.jsx
import { useCart } from "@utils/useCart";


export default function CartItem({ product }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="d-flex align-items-center border-bottom py-3">
      <img 
        src={product.image} 
        alt={product.name} 
        className="me-3 rounded"
        style={{ width: "80px", height: "80px", objectFit: "cover" }}
      />
      <div className="flex-grow-1">
        <h6 className="fw-bold">{product.name}</h6>
        <p className="text-muted mb-1">${product.price}</p>
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={product.quantity}
            min="1"
            className="form-control me-2"
            style={{ width: "60px" }}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          />
          <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
