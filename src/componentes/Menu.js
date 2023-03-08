import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                            Inicio
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/personas-admin"} className="nav-link">
                        <i className="nav-icon fas fa-users" />
                        <p>
                            Personas
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/categorias-admin"} className="nav-link">
                        <i className="nav-icon fas fa-network-wired" />
                        <p>
                            Categorías
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/productos-admin"} className="nav-link">
                        <i className="nav-icon fas fa-store" />
                        <p>
                            Productos
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/carritoDeCompras-admin"} className="nav-link">
                        <i className="nav-icon fas fa-shopping-cart" />
                        <p>
                            Carrito de compras
                        </p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;