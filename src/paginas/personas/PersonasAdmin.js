import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const PersonasAdmin = () => {
    const [personas, setPersonas] = useState([]);

    const cargarPersonas = async () => {
        const response = await APIInvoke.invokeGET("/api/personas");
        //console.log(response);
        setPersonas(response);
    };

    useEffect(() => {
        cargarPersonas();
    }, []);

    //Eliminar proyectos
    const eliminarPersona = async (e, idPersona) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/personas/${idPersona}`);

        if (response.msg === 'Persona eliminada con exito') {
            const msg = "La Persona fue borrada correctamente.";
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
            cargarPersonas();
        } else {
            const msg = "La Persona no fue borrada correctamente.";
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
                    titulo={"Listado de Personas"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Personas"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="card">
                    <div className="card-header">
                            <h3 className="card-title"><Link to={"/personas-crear"} className="btn btn-block btn-primary btn-sm">Crear Persona</Link></h3>
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
                                        <th style={{ width: "10%" }}>Nombre</th>
                                        <th style={{ width: "10%" }}>Apellido</th>
                                        <th style={{ width: "10%" }}>Teléfono</th>
                                        <th style={{ width: "10%" }}>Ciudad</th>
                                        <th style={{ width: "15%" }}>Dirección</th>
                                        <th style={{ width: "15%" }}>Email</th>
                                        <th style={{ width: "10%" }}>Categoria</th>
                                        <th style={{ width: "10%" }}>Password</th>
                                        <th style={{ width: "10%" }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {personas.map((item) => ( //map() es un método incorporado en los arreglos, para iterar a través de los elementos dentro de una colección de arreglos en JavaScript. Piensa en él, como un bucle para avanzar de un elemento a otro en una lista, manteniendo el orden y la posición de cada elemento
                                        //Una “key” es un atributo especial string que debes incluir al crear listas de elementos. Vamos a discutir por qué esto es importante en la próxima sección.
                                        //Las keys ayudan a React a identificar que ítems han cambiado, son agregados, o son eliminados. Las keys deben ser dadas a los elementos dentro del array para darle a los elementos una identidad estable:
                                        <tr key={item._id}>
                                            {/* <td>{item._id}</td> */}
                                            <td>{item.nombrePersona}</td>
                                            <td>{item.apellidoPersona}</td>
                                            <td>{item.telefonoPersona}</td>
                                            <td>{item.ciudadPersona}</td>
                                            <td>{item.direccionPersona}</td>
                                            <td>{item.emailPersona}</td>
                                            <td>{item.categoriaPersona}</td>
                                            <td>{item.passwordPersona}</td>
                                            <td>
                                                <Link  to={`/personas-editar/${item._id}&${item.nombrePersona}&${item.apellidoPersona}&${item.telefonoPersona}&${item.ciudadPersona}&${item.direccionPersona}&${item.emailPersona}&${item.categoriaPersona}&${item.passwordPersona}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                                                <button onClick={(e) => eliminarPersona(e, item._id)} className="btn btn-sm btn-danger">Borrar</button>
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

export default PersonasAdmin;
