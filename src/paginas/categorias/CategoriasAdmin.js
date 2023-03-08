import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const CategoriasAdmin = () => {
    const [categorias, setCategorias] = useState([]);

    const cargarCategorias = async () => {
        const response = await APIInvoke.invokeGET("/api/categorias");
        //console.log(response);
        setCategorias(response);
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    //Eliminar proyectos
    const eliminarCategoria = async (e, idCategoria) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/categorias/${idCategoria}`);

        if (response.msg === 'Categoria eliminada con exito') {
            const msg = "La Categoria fue borrada correctamente.";
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
            cargarCategorias();
        } else {
            const msg = "La Categoria no fue borrada correctamente.";
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
                    titulo={"Listado de Categorías"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Categorías"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="card">
                    <div className="card-header">
                            <h3 className="card-title"><Link to={"/categorias-crear"} className="btn btn-block btn-primary btn-sm">Crear Categoría</Link></h3>
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
                                        {/* <th style={{ width: "5%" }}>Id</th> */}
                                        <th style={{ width: "25%" }}>Nombre</th>
                                        <th style={{ width: "25%" }}>descripcion</th>
                                        <th style={{ width: "15%" }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorias.map((item) => ( //map() es un método incorporado en los arreglos, para iterar a través de los elementos dentro de una colección de arreglos en JavaScript. Piensa en él, como un bucle para avanzar de un elemento a otro en una lista, manteniendo el orden y la posición de cada elemento
                                        //Una “key” es un atributo especial string que debes incluir al crear listas de elementos. Vamos a discutir por qué esto es importante en la próxima sección.
                                        //Las keys ayudan a React a identificar que ítems han cambiado, son agregados, o son eliminados. Las keys deben ser dadas a los elementos dentro del array para darle a los elementos una identidad estable:
                                        <tr key={item._id}>
                                            {/* <td>{item._id}</td> */}
                                            <td>{item.nombreCategoria}</td>
                                            <td>{item.descripcionCategoria}</td>
                                            <td>
                                                <Link  to={`/categorias-editar/${item._id}@${item.nombreCategoria}@${item.descripcionCategoria}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                                                <button onClick={(e) => eliminarCategoria(e, item._id)} className="btn btn-sm btn-danger">Borrar</button>
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

export default CategoriasAdmin;
