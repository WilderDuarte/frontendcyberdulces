import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const CarritoDeComprasAdmin = () => {
    const [carritoDeCompras, setCarritoDeCompras] = useState([]);

    const cargarCarritoDeCompras = async () => {
        const response = await APIInvoke.invokeGET("/api/carritoDeCompras");
        console.log(response);
        setCarritoDeCompras(response);
    };

    useEffect(() => {
        cargarCarritoDeCompras();
    }, []);

    //Eliminar proyectos
    const eliminarCarritoDeCompra = async (e, idCarritoDeCompra) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/carritoDeCompras/${idCarritoDeCompra}`);

        if (response.msg ==='CarritoDeCompra eliminado con exito') {
            const msg = "El CarritoDeCompra fue borrado correctamente.";
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
            cargarCarritoDeCompras();
        } else {
            const msg = "El CarritoDeCompra no fue borrado correctamente.";
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
                    titulo={"Listado de CarritoDeCompras"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"CarritoDeCompras"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="card">
                    <div className="card-header">
                            <h3 className="card-title"><Link to={"/carritoDeCompras-crear"} className="btn btn-block btn-primary btn-sm">Crear CarritoDeCompra</Link></h3>
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
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                         
                                        <th style={{ width: "30%" }}>Id</th>
                                        <th style={{ width: "20%" }}>cantidadCompra</th>
                                        <th style={{ width: "20%" }}>PrecioCompra</th>
                                        <th style={{ width: "30%" }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carritoDeCompras.map((item) => ( //map() es un método incorporado en los arreglos, para iterar a través de los elementos dentro de una colección de arreglos en JavaScript. Piensa en él, como un bucle para avanzar de un elemento a otro en una lista, manteniendo el orden y la posición de cada elemento
                                        //Una “key” es un atributo especial string que debes incluir al crear listas de elementos. Vamos a discutir por qué esto es importante en la próxima sección.
                                        //Las keys ayudan a React a identificar que ítems han cambiado, son agregados, o son eliminados. Las keys deben ser dadas a los elementos dentro del array para darle a los elementos una identidad estable:
                                        <tr key={item._id}>
                                            {/* <td>{item._id}</td> */}
                                            <td>{item._id}</td>
                                            <td>{item.cantidadCompra}</td>
                                            <td>{item.precioCompra}</td>
                                            
                                            <td>
                                                <Link  to={`/carritoDeCompras-editar/${item._id}@${item.cantidadCompra}@${item.precioCompra}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                                                <button onClick={(e) => eliminarCarritoDeCompra(e, item._id)} className="btn btn-sm btn-danger">Borrar</button>
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

export default CarritoDeComprasAdmin;
