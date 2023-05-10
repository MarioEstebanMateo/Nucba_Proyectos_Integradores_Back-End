import React from "react";
import axios from "axios";
import swal2 from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./ProductPage.css";

const ProductPage = () => {
  const [quantity, setQuantity] = React.useState(1);
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();

  const [product, setProduct] = React.useState([]);

  const getProduct = async () => {
    try {
      const product = await axios.get(
        `http://localhost:8000/api/products/${params.id}`
      );
      setProduct(product.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getProduct();
  }, []);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const addToCart = async () => {
    try {
      await axios.post("http://localhost:8000/api/carts", {
        productId: product._id,
        imageUrl: product.imageUrl,
        title: product.title,
        price: product.price,
        quantity: quantity,
      });
      //swal2 producto agregado al carrito o continuar comprando
      swal2
        .fire({
          title: "Producto agregado al carrito",
          text: "¿Desea continuar comprando?",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Si, continuar comprando",
          cancelButtonText: "No, ir al carrito",
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          } else if (result.dismiss === swal2.DismissReason.cancel) {
            navigate("/cart");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-page">
      <div className="product-page__image">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className="product-page__info">
        <h1>{product.title}</h1>
        <p className="product-page__info__description">{product.description}</p>
        <p className="product-page__price">Precio: ${product.price}</p>
        <div className="product-page__quantity">
          <label htmlFor="quantity">Cantidad</label>
          <input
            className="mx-2"
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="50"
            value={quantity}
            onChange={handleChange}
          />
        </div>
        <button
          className="product-page__button btn btn-primary mt-3"
          onClick={addToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
