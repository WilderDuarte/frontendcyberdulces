import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/cyberdulces/logocyberdulces.png"

const Login = () => {
    return (


    <div className="container-fluid">
        <header className="bg-dark d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                {/* <li className="nav-item"><a href="#" className="nav-link text-white">Home</a></li> */}
                {/* <li className="nav-item"><a href="#" className="nav-link text-white">Personas</a></li> */}
                {/* <li className="nav-item"><a href="#" className="nav-link text-white">Productos</a></li> */}
                {/* <li className="nav-item"><a href="#" className="nav-link text-white">Categorías</a></li> */}
                {/* <li className="nav-item"><a href="#" className="nav-link text-white">Carrito de Compras</a></li> */}
                <li className="nav-item"><Link to={"/index"} className="btn btn-dark">Inicio</Link></li>
                <li className="nav-item"><Link to={"/personas"} className="btn btn-info">Personas</Link></li>
                <li className="nav-item"><Link to={"#"} className="btn btn-info">Productos</Link></li>
                <li className="nav-item"><Link to={"#"} className="btn btn-info">Categorías</Link></li>
                <li className="nav-item"><Link to={"#"} className="btn btn-info">Carrito de Compras</Link></li>
                <li className="nav-item"><Link to={"/"} className="btn btn-primary">Iniciar Sesión</Link></li>
                <li className="nav-item"><Link to={"/crear-cuenta"} className="btn btn-primary">Crear Cuenta</Link></li>                

            </ul>
        </header>
        <div className="b-example-divider"></div><br></br>
        <div className="row justify-content-center">
            <h1><strong>BIENVENIDOS A</strong></h1>
            {/* <img src={require('images/cyberdulces/logocyberdulces.png').default} alt=""></img> */}
            {/* <img src={require('../../images/cyberdulces/logocyberdulces.png').default} alt=""></img> */}
        </div>
        <div className="row justify-content-center">
        <img src={logo} alt=""></img>
        </div>




    </div>




        );
}

export default Login;