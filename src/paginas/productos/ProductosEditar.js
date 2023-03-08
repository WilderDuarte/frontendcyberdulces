import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const ProductosEditar = () => {

    const navigate = useNavigate();

    const { idproducto } = useParams();
    let arreglo = idproducto.split('@');

    const nombreProducto1 = arreglo[1];
    const idCategoria1 = arreglo[2];
    const precioProducto1 = arreglo[3];
    const descripcionProducto1 = arreglo[4];
    const cantidadSaldo1 = arreglo[5];




    console.log(arreglo);

    const [producto, setProducto] = useState({
        nombreProducto: nombreProducto1,
        idCategoria: idCategoria1,
        precioProducto:precioProducto1,
        descripcionProducto: descripcionProducto1,
        cantidadSaldo: cantidadSaldo1

    });


    const { nombreProducto, idCategoria, precioProducto, descripcionProducto, cantidadSaldo  } = producto;

    useEffect(() => {
        document.getElementById("nombreProducto").focus();
    }, [])

    const onChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const editarProducto = async () => {
        let arreglo = idproducto.split('@');
        const idProducto = arreglo[0];
        

        const data = {
            nombreProducto: producto.nombreProducto,
            idCategoria: producto.idCategoria,
            precioProducto: producto.precioProducto,
            descripcionProducto: producto.descripcionProducto,
            cantidadSaldo: producto.cantidadSaldo

        }


        const response = await APIInvoke.invokePUT(`/api/productos/${idProducto}`, data);
        const idProductoEditado = response._id

        if (idProductoEditado !== idProducto) {
            const msg = "El producto no fue editado correctamente.";
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
            const msg = "El producto fue editado correctamente.";
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
        editarProducto();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Edición de Productos"}
                    breadCrumb1={"Listado de Producto"}
                    breadCrumb2={"Edición"}
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
                                            placeholder="Ingrese el nombre del producto"
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
                                            placeholder="Ingrese la categoría del producto"
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
                                            placeholder="Ingrese precio del producto"
                                            value={precioProducto}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Descripción Producto</label>
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
                                        <label htmlFor="nombre">Cantidad Saldo</label>
                                        <input type="number"
                                            className="form-control"
                                            id="cantidadSaldo"
                                            name="cantidadSaldo"
                                            placeholder="Cantidad Saldo"
                                            value={cantidadSaldo}
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

export default ProductosEditar;