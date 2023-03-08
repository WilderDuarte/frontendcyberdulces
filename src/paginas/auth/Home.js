import React from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';

const Home = () => {
    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Sistema de Información"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Menú Principal"}
                    ruta1={"/home"}
                />
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>Productos</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-store" />
                                    </div>
                                    <Link to={"/productos-admin"} className="small-box-footer">Ver Productos <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>

                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>Personas</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-users" />
                                    </div>
                                    <Link to={"/personas-admin"} className="small-box-footer">Ver Personas <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>

                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>Categorías</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-network-wired" />
                                    </div>
                                    <Link to={"/categorias-admin"} className="small-box-footer">Ver Categorías <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>

                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>Carrito de Compras</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-shopping-cart" />
                                    </div>
                                    <Link to={"/carritoDeCompras-admin"} className="small-box-footer">Ver Carrito de compras <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Home;