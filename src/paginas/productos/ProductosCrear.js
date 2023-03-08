import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const ProductosCrear = () => {

    const navigate = useNavigate();

    const [producto, setProducto] = useState({
        nombreProducto: '',
        idCategoria: '',
        precioProducto: 0,
        descripcionProducto: '',
        cantidadSaldo: 0
    });

    const { nombreProducto, idCategoria, precioProducto, descripcionProducto, cantidadSaldo } = producto;

    useEffect(() => {
        document.getElementById("nombreProducto").focus();
    }, [])

    const onChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const crearProducto = async () => {
        const data = {
            nombreProducto: producto.nombreProducto,
            idCategoria: producto.idCategoria,
            precioProducto: producto.precioProducto,
            descripcionProducto: producto.descripcionProducto,
            cantidadSaldo: producto.cantidadSaldo
            

        }

        const response = await APIInvoke.invokePOST(`/api/productos`, data);
        const idProducto = response._id;

        if (idProducto === '') {
            const msg = "El producto NO fue creado correctamente.";
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
            navigate("/productos-admin");
            const msg = "El producto fue creado correctamente.";
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

            setProducto({
                nombreProducto: '',
                idCategoria: '',
                precioProducto: 1.25,
                descripcionProducto: '',
                cantidadSaldo: 1
             })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearProducto();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Creación de Productos"}
                    breadCrumb1={"Listado de Producto"}
                    breadCrumb2={"Creación"}
                    ruta1={"/productos-admin"}
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
                                        <label htmlFor="nombre">Nombre</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nombreProducto"
                                            name="nombreProducto"
                                            placeholder="Ingrese el nombre del producto (placeholderpersonas crear line 133) "
                                            value={nombreProducto}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Categoria</label>
                                        <input type="text"
                                            className="form-control"
                                            id="idCategoria"
                                            name="idCategoria"
                                            placeholder="Ingrese la categoria"
                                            value={idCategoria}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Precio Producto</label>
                                        <input type="number"
                                            className="form-control"
                                            id="precioProducto"
                                            name="precioProducto"
                                            placeholder="Ingrese el precio del producto"
                                            value={precioProducto}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Descripcion Producto</label>
                                        <input type="text"
                                            className="form-control"
                                            id="descripcionProducto"
                                            name="descripcionProducto"
                                            placeholder="Ingrese la descripción del Producto"
                                            value={descripcionProducto}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Cantidad en Saldo</label>
                                        <input type="number"
                                            className="form-control"
                                            id="cantidadSaldo"
                                            name="cantidadSaldo"
                                            placeholder="Cantidad en Saldo"
                                            value={cantidadSaldo}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Crear Producto</button>
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

export default ProductosCrear;
