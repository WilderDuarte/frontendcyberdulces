import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="container-fluid">
            <header className="bg-dark d-flex justify-content-center py-3">
                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to={"/index"} className="btn btn-dark">Inicio</Link></li>
                    <li className="nav-item"><Link to={"#"} className="btn btn-info">Personas</Link></li>
                    <li className="nav-item"><Link to={"#"} className="btn btn-info">Productos</Link></li>
                    <li className="nav-item"><Link to={"#"} className="btn btn-info">Categorías</Link></li>
                    <li className="nav-item"><Link to={"#"} className="btn btn-info">Carrito de Compras</Link></li>
                    <li className="nav-item"><Link to={"/"} className="btn btn-primary">Iniciar Sesión</Link></li>
                    <li className="nav-item"><Link to={"/crear-cuenta"} className="btn btn-primary">Crear Cuenta</Link></li>
                </ul>
            </header>
            <div className="b-example-divider"></div><br></br>
            <div className="row justify-content-center">
                <h1><strong>LISTAR PERSONAS</strong></h1>

            </div>
        </div>
    );
}

export default Login;