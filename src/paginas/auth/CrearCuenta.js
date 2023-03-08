import React, { useState } from "react";
import { Link } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';


// Componente principal
const CrearCuenta = () => {

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = usuario

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };


  // Función que contiene la lógica para hacer la creación del usuario en la base de datos
  const crearCuenta = async () => {
    if (password !== confirmar) {
      const msg = "Las contraseñas son diferentes"
      swal({
        title: 'Error',
        text: msg,
        icon: 'error',
        button: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }

      });
    } else if (password.length < 6) {

      const msg = "La constraseña debe ser al menos de 6 caracteres"
      swal({
        title: 'Error',
        text: msg,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'Ok',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    } else {

      const data = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password
      }
      const response = await APIInvoke.invokePOST("/api/usuario", data);
      console.log(response)
      const mensaje = response.msg;
      if (mensaje === 'El usuario ya existe') {
        const msg = "El usuario ya existe.";
        swal({
          title: 'Error',
          text: msg,
          icon: 'error',
          buttons: {
            confirm: {
              text: 'Ok',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        });
      } else {
        console.log("Usuario Creado Exitosamente")
        const msg = "Usuario Creado Exitosamente";
        swal({
          title: 'Información',
          text: msg,
          icon: 'success',
          buttons: {
            confirm: {
              text: 'Ok',
              value: true,
              visible: true,
              className: 'btn btn-primary',
              closeModal: true
            }
          }
        });



      }
    }
  }


  const onSubmit = (e) => {
    e.preventDefault();
    crearCuenta();

  }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={"#"}>
            <b>Crear</b> Cuenta
          </Link>
        </div>

        {/* /.login-logo */}

        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Ingresar Credenciales</p>

            {/* formulario */}
            <form onSubmit={onSubmit} >
              {/* Caja de Texto Nombre */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>

              {/* Caja de Texto email */}
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>

              {/* Caja de Texto contraseña */}
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              {/* Caja de Texto CONFIRMAR contraseña */}
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirmar Contraseña"
                  id="confirmar"
                  name="confirmar"
                  value={confirmar}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              {/* Botón Aceptar*/}
              <div className="social-auth-links text-center mb-3">
                <button type="submit" className="btn btn-block btn-primary">
                  Aceptar
                </button>

                {/*Regresar al Login*/}
                <Link to={"/"} className="btn btn-block btn-danger">
                  Regresar al Login
                </Link>
                {/* <Link to={"/index"} className="btn btn-block btn-info">Ir a la página principal</Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearCuenta;
