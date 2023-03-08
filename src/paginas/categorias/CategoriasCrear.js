import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const CategoriasCrear = () => {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState({
        nombreCategoria: '',
        descripcionCategoria: ''

    });

    const { nombreCategoria, descripcionCategoria, } = categoria;

    useEffect(() => {
        document.getElementById("nombreCategoria").focus();
    }, [])

    const onChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    const crearCategoria = async () => {
        const data = {
            nombreCategoria: categoria.nombreCategoria,
            descripcionCategoria: categoria.descripcionCategoria,
        }

        const response = await APIInvoke.invokePOST(`/api/categorias`, data);
        const idCategoria = response._id;

        if (idCategoria === '') {
            const msg = "La categoria NO fue creado correctamente.";
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
            navigate("/categorias-admin");
            const msg = "La categoria fue creada correctamente.";
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

            setCategoria({
                nombre: '',
                descripcion: ''
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearCategoria();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Creación de Categorias"}
                    breadCrumb1={"Listado de Categoria"}
                    breadCrumb2={"Creación"}
                    ruta1={"/categoriass-admin"}
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
                                            id="nombreCategoria"
                                            name="nombreCategoria"
                                            placeholder="Ingrese el nombre de la categoria"
                                            value={nombreCategoria}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Descripcion</label>
                                        <input type="text"
                                            className="form-control"
                                            id="apellidoCategoria"
                                            name="descripcionCategoria"
                                            placeholder="Ingrese la descripcion de la categoria"
                                            value={descripcionCategoria}
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

export default CategoriasCrear;