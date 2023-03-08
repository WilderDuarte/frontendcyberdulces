import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const CarritoDeComprasEditar = () => {

    const navigate = useNavigate();

    const { idcarritoDeCompra } = useParams();
    let arreglo = idcarritoDeCompra.split('@');

    const cantidadCompraCarritoDeCompra = arreglo[1];
    const precioCompraCarritoDeCompra = arreglo[2];
    

    //console.log(arreglo);

    const [carritoDeCompra, setCarritoDeCompra] = useState({
        cantidadCompra: cantidadCompraCarritoDeCompra,
        precioCompra: precioCompraCarritoDeCompra
    });

    const { cantidadCompra, precioCompra } = carritoDeCompra;

    useEffect(() => {
        document.getElementById("cantidadCompra").focus();
    }, [])

    const onChange = (e) => {
        setCarritoDeCompra({
            ...carritoDeCompra,
            [e.target.name]: e.target.value
        })
    }

    const editarCarritoDeCompra = async () => {
        let arreglo = idcarritoDeCompra.split('@');
        const idCarritoDeCompra = arreglo[0];

        const data = {
            cantidadCompra: carritoDeCompra.cantidadCompra,
            precioCompra: carritoDeCompra.precioCompra
           
        }

        const response = await APIInvoke.invokePUT(`/api/carritoDeCompras/${idCarritoDeCompra}`, data);
        const idCarritoDeCompraEditado = response._id

        if (idCarritoDeCompraEditado !== idCarritoDeCompra) {
            const msg = "El CarritoDeCompra no fue editada correctamente.";
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
            const msg = "El carritoDeCompra fue editada correctamente.";
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

    const onSubmit = (e) => {
        e.preventDefault();
        editarCarritoDeCompra();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Edición de CarritoDeCompras"}
                    breadCrumb1={"Listado de CarritoDeCompra"}
                    breadCrumb2={"Edición"}
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
                                        <label htmlFor="nombre">CantidadCompra</label>
                                        <input type="number"
                                            className="form-control"
                                            id="cantidadCompra"
                                            name="cantidadCompra"
                                            placeholder="Ingrese la cantidad"
                                            value={cantidadCompra}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">PrecioCompra</label>
                                        <input type="number"
                                            className="form-control"
                                            id="precioCompra"
                                            name="precioCompra"
                                            placeholder="Ingrese el precio de Compra"
                                            value={precioCompra}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Editar</button>
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

export default CarritoDeComprasEditar;