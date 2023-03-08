import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const ProductosAdmin = () => {
    const [productos, setProductos] = useState([]);

    const cargarProductos = async () => {
        const response = await APIInvoke.invokeGET("/api/productos");
        //console.log(response);
        setProductos(response);
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    //Eliminar productos
    const eliminarProducto = async (e, idProducto) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/productos/${idProducto}`);

        if (response.msg === 'producto eliminado con exito') {
            const msg = "El Producto fue borrado correctamente.";
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
            cargarProductos();
        } else {
            const msg = "*(File FrontEnd/src/paginas/productos/productosAdmin.js line 46)El producto no fue borrado correctamente.!!*";
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
        }

    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Listado de Productos"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Productos"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="card">
                    <div className="card-header">
                            <h3 className="card-title"><Link to={"/productos-crear"} className="btn btn-block btn-primary btn-sm">Crear Producto</Link></h3>
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
                            <table className="table table-hover table-striped table-bordered">
                                <thead>
                                    <tr>
                                       {/* <th style={{ width: "5%" }}>Id</th> */}
                                        <th style={{ width: "30%" }}>Nombre</th>
                                        <th style={{ width: "10%" }}>categoria</th>
                                        <th style={{ width: "5%" }}>Precio</th>
                                        <th style={{ width: "30%" }}>Descripción</th>
                                        <th style={{ width: "5%" }}>Cantidad Saldo</th>
                                        <th style={{ width: "20%" }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((item) => ( //map() es un método incorporado en los arreglos, para iterar a través de los elementos dentro de una colección de arreglos en JavaScript. Piensa en él, como un bucle para avanzar de un elemento a otro en una lista, manteniendo el orden y la posición de cada elemento
                                        //Una “key” es un atributo especial string que debes incluir al crear listas de elementos. Vamos a discutir por qué esto es importante en la próxima sección.
                                        //Las keys ayudan a React a identificar que ítems han cambiado, son agregados, o son eliminados. Las keys deben ser dadas a los elementos dentro del array para darle a los elementos una identidad estable:
                                        <tr key={item._id}>
                                           {/* <td>{item._id}</td> */}
                                            <td>{item.nombreProducto}</td>
                                            <td>{item.idCategoria}</td>
                                            <td>{item.precioProducto}</td>
                                            <td>{item.descripcionProducto}</td>
                                            <td>{item.cantidadSaldo}</td>
                                            <td>
                                            <Link  to={`/productos-editar/${item._id}@${item.nombreProducto}@${item.idCategoria}@${item.precioProducto}@${item.descripcionProducto}@${item.cantidadSaldo}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                                                <button onClick={(e) => eliminarProducto(e, item._id)} className="btn btn-sm btn-danger">Borrar</button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ProductosAdmin;
