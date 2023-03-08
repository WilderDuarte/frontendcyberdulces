import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const CarritoDeComprasCrear = () => {

    const navigate = useNavigate();

    const [carritoDeCompra, setCarritoDeCompra] = useState({
        cantidadCompra:'',
        precioCompra: ''
        
    });

    const { cantidadCompra,
        precioCompra} = carritoDeCompra;

    useEffect(() => {
        document.getElementById("cantidadCompra").focus();
    }, [])

    const onChange = (e) => {
        setCarritoDeCompra({
            ...carritoDeCompra,
            [e.target.name]: e.target.value
        })
    }

    const crearCarritoDeCompra = async () => {
        const data = {
            cantidadCompra: carritoDeCompra.cantidadCompra,
            precioCompra: carritoDeCompra.precioCompra
       }

        const response = await APIInvoke.invokePOST(`/api/carritoDeCompras`, data);
        const idCarritoDeCompra = response._id;

        if (idCarritoDeCompra === '') {
            const msg = "El carrito de compra NO fue creado correctamente.";
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
            navigate("/carritoDeCompras-admin");
            const msg = "El carritoDeCompra fue creada correctamente.";
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

            setCarritoDeCompra({
                cantidadCompra: '',
                precioCompra: ''
             })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearCarritoDeCompra();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Creación de CarritoDeCompras"}
                    breadCrumb1={"Listado de CarritoDeCompra"}
                    breadCrumb2={"Creación"}
                    ruta1={"/carritoDeCompras-admin"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">

                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="cantidadCompra">CantidadCompra</label>
                                        <input type="number"
                                            className="form-control"
                                            id="cantidadCompra"
                                            name="cantidadCompra"
                                            placeholder="Ingrese la cantidadCompra"
                                            value={cantidadCompra}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">precioCompra</label>
                                        <input type="number"
                                            className="form-control"
                                            id="precioCompra"
                                            name="precioCompra"
                                            placeholder="Ingrese el precio de compra"
                                            value={precioCompra}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Crear</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default CarritoDeComprasCrear;