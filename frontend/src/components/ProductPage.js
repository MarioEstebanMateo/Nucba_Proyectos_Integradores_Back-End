import React from "react";
import axios from "axios";
import swal2 from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./ProductPage.css";

const ProductPage = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [product, setProduct] = React.useState([]);
  const params = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${params.id}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [params.id]);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const addToCart = async () => {
    try {
      const cart = await axios.get("http://localhost:8000/api/carts");
      const productInCart = cart.data.find(
        (item) => item.title === product.title
      );
      if (productInCart) {
        swal2
          .fire({
            icon: "error",
            title: "Oops...",
            text: "El producto ya esta en el carrito! Modifique la cantidad desde el carrito!",
          })
          .then(() => {
            navigate("/");
          });
      } else {
        if (quantity < 1) {
          swal2
            .fire({
              icon: "error",
              title: "Oops...",
              text: "La cantidad no puede ser menor a 1!",
            })
            .then(() => {
              setQuantity(1);
            });
          return;
        }
        if (quantity > 50) {
          swal2.fire({
            icon: "error",
            title: "Oops...",
            text: "La cantidad no puede ser mayor a 50!",
          });
          return;
        }
        await axios.post("http://localhost:8000/api/carts", {
          price: product.price,
          imageUrl: product.imageUrl,
          title: product.title,
          quantity: quantity,
        });
        const { isConfirmed } = await swal2.fire({
          icon: "success",
          title: "Producto agregado al carrito!",
          showCancelButton: true,
          confirmButtonText: "Ir al carrito",
          cancelButtonText: "Continuar comprando",
        });
        if (isConfirmed) {
          navigate("/cart");
        } else {
          navigate("/");
        }
      }
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
