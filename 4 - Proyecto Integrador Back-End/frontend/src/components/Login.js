import React from "react";
import { Link } from "react-router-dom";
import swal2 from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    //todos los campos son obligatorios

    if (email === "" || password === "") {
      swal2.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    //validar que el email sea un email valido
    else if (!/\S+@\S+\.\S+/.test(email)) {
      swal2.fire({
        title: "Error",
        text: "El email no es valido",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      await axios.get("http://localhost:8000/api/users").then((response) => {
        console.log(response.data);
        const users = response.data;
        const user = users.filter((user) => user.email === email);

        if (user.length > 0) {
          if (user[0].password === password) {
            swal2
              .fire({
                title: "Bienvenido",
                text: "Usuario logueado correctamente",
                icon: "success",
                confirmButtonText: "Aceptar",
              })
              .then(() => {
                navigate("/");
              });
            //limpiar el formulario
            document.getElementById("emailLogin").value = "";
            document.getElementById("passwordLogin").value = "";
          } else {
            swal2.fire({
              title: "Error",
              text: "Contraseña incorrecta",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          }
        } else {
          swal2.fire({
            title: "Error",
            text: "El usuario no existe",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="myform form ">
            <div className="logo mb-3">
              <div className="col-md-12 text-center">
                <h1>Login</h1>
              </div>
            </div>
            <form action="" method="post" name="login">
              <div className="form-group">
                <label className="mt-3" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control mt-2"
                  id="emailLogin"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label className="mt-3" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="passwordLogin"
                  className="form-control mt-2"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                />
              </div>
              <div className="col-md-12 text-center ">
                <button
                  type="submit"
                  className=" btn btn-block mybtn btn-primary tx-tfm mt-3"
                  onClick={login}
                >
                  Login
                </button>
              </div>
              <div className="col-md-12 ">
                <div className="login-or">
                  <hr className="hr-or" />
                  <span className="span-or">or</span>
                </div>
              </div>
              <div className="form-group">
                <p className="text-center">
                  Don't have account?{" "}
                  <Link to="/register" id="signup">
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
