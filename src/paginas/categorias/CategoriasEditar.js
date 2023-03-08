import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const CategoriasEditar = () => {

    const navigate = useNavigate();

    const { idcategoria } = useParams();
    let arreglo = idcategoria.split('@');

    const nombre = arreglo[1];
    const descripcion = arreglo[2];


    console.log(arreglo);

    const [categoria, setCategoria] = useState({
        nombreCategoria: nombre,
        descripcionCategoria: descripcion,

    });

    const { nombreCategoria, descripcionCategoria } = categoria;

    useEffect(() => {
        document.getElementById("nombreCategoria").focus();
    }, [])

    const onChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    const editarCategoria = async () => {
        let arreglo = idcategoria.split('@');
        const idCategoria = arreglo[0];

        const data = {
            nombreCategoria: categoria.nombreCategoria,
            descripcionCategoria: categoria.descripcionCategoria,

        }

        const response = await APIInvoke.invokePUT(`/api/categorias/${idCategoria}`, data);
        const idCategoriaEditado = response._id

        if (idCategoriaEditado !== idCategoria) {
            const msg = "La Categoria no fue editada correctamente.";
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
            const msg = "La categoria fue editada correctamente.";
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
        editarCategoria();
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
                    ruta1={"/categorias-admin"}
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
                                            id="descripcionCategoria"
                                            name="descripcionCategoria"
                                            placeholder="Ingrese la descripcion de la persona"
                                            value={descripcionCategoria}
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

export default CategoriasEditar;
