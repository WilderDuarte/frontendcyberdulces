import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const PersonasEditar = () => {

    const navigate = useNavigate();

    const { idpersona } = useParams();
    let arreglo = idpersona.split('&');

    const nombre = arreglo[1];
    const apellido = arreglo[2];
    const telefono = arreglo[3];
    const ciudad = arreglo[4];
    const direccion = arreglo[5];
    const email = arreglo[6];
    const categoria = arreglo[7];
    const password = arreglo[8];

    const [persona, setPersona] = useState({
        nombrePersona: nombre,
        apellidoPersona: apellido,
        telefonoPersona: telefono,
        ciudadPersona: ciudad,
        direccionPersona: direccion,
        emailPersona: email,
        categoriaPersona: categoria,
        passwordPersona: password

    });

    const { nombrePersona, apellidoPersona, telefonoPersona, ciudadPersona, direccionPersona, emailPersona, categoriaPersona, passwordPersona} = persona;

    useEffect(() => {
        document.getElementById("nombrePersona").focus();
    }, [])

    const onChange = (e) => {
        setPersona({
            ...persona,
            [e.target.name]: e.target.value
        })
    }

    const editarPersona = async () => {
        let arreglo = idpersona.split('&');
        const idPersona = arreglo[0];

        const data = {
            nombrePersona: persona.nombrePersona,
            apellidoPersona: persona.apellidoPersona,
            telefonoPersona: persona.telefonoPersona,
            ciudadPersona: persona.ciudadPersona,
            direccionPersona: persona.direccionPersona,
            emailPersona: persona.emailPersona,
            categoriaPersona: persona.categoriaPersona,
            passwordPersona: persona.passwordPersona
        }

        const response = await APIInvoke.invokePUT(`/api/personas/${idPersona}`, data);
        const idPersonaEditado = response._id

        if (idPersonaEditado !== idPersona) {
            const msg = "La Persona no fue editada correctamente.";
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
            navigate("/personas-admin");
            const msg = "La persona fue editada correctamente.";
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
        editarPersona();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Creación de Personas"}
                    breadCrumb1={"Listado de Persona"}
                    breadCrumb2={"Creación"}
                    ruta1={"/personas-admin"}
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
                                            id="nombrePersona"
                                            name="nombrePersona"
                                            placeholder="Ingrese el nombre de la persona"
                                            value={nombrePersona}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Apellido</label>
                                        <input type="text"
                                            className="form-control"
                                            id="apellidoPersona"
                                            name="apellidoPersona"
                                            placeholder="Ingrese el apellido de la persona"
                                            value={apellidoPersona}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Teléfono</label>
                                        <input type="number"
                                            className="form-control"
                                            id="telefonoPersona"
                                            name="telefonoPersona"
                                            placeholder="Ingrese el teléfono de la persona"
                                            value={telefonoPersona}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Ciudad de residencia</label>
                                        <input type="text"
                                            className="form-control"
                                            id="ciudadPersona"
                                            name="ciudadPersona"
                                            placeholder="Ingrese la ciudad de la persona"
                                            value={ciudadPersona}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Dirección de la persona</label>
                                        <input type="text"
                                            className="form-control"
                                            id="direccionPersona"
                                            name="direccionPersona"
                                            placeholder="Dirección de la persona"
                                            value={direccionPersona}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Correo Electrónico</label>
                                        <input type="email"
                                            className="form-control"
                                            id="emailPersona"
                                            name="emailPersona"
                                            placeholder="Correo electrónico de la persona"
                                            value={emailPersona}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Categoria de la persona</label>
                                        <input type="text"
                                            className="form-control"
                                            id="categoriaPersona"
                                            name="categoriaPersona"
                                            placeholder="categoria de la persona"
                                            value={categoriaPersona}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Password</label>
                                        <input type="text"
                                            className="form-control"
                                            id="passwordPersona"
                                            name="passwordPersona"
                                            placeholder="Contraseña inicial de la persona"
                                            value={passwordPersona}
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

export default PersonasEditar;