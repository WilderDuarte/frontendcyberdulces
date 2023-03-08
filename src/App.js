import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {Fragment} from 'react';
import Login from './paginas/auth/Login';
import CrearCuenta from './paginas/auth/CrearCuenta';
import Index from './paginas/auth/Index';
import PersonasList from './paginas/auth/PersonasList';
import Home from './paginas/auth/Home';

import ProductosAdmin from './paginas/productos/ProductosAdmin';
import ProductosCrear from './paginas/productos/ProductosCrear';
import ProductosEditar from './paginas/productos/ProductosEditar';

import PersonasAdmin from './paginas/personas/PersonasAdmin';
import PersonasCrear from './paginas/personas/PersonasCrear';
import PersonasEditar from './paginas/personas/PersonasEditar';

import CategoriasAdmin from './paginas/categorias/CategoriasAdmin';
import CategoriasCrear from './paginas/categorias/CategoriasCrear';
import CategoriasEditar from './paginas/categorias/CategoriasEditar';

import CarritoDeComprasAdmin from './paginas/carritoDeCompras/CarritoDeComprasAdmin';
import CarritoDeComprasCrear from './paginas/carritoDeCompras/CarritoDeComprasCrear';
import CarritoDeComprasEditar from './paginas/carritoDeCompras/CarritoDeComprasEditar';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/crear-cuenta" exact element={<CrearCuenta/>}/>
          <Route path="/index" exact element={<Index/>}/>
          <Route path="/personas" exact element={<PersonasList/>}/>
          <Route path="/home" exact element={<Home/>}/>
          {/* Las rutas de productos */}
          <Route path="/productos-admin" exact element={<ProductosAdmin/>}/>
          <Route path="/productos-crear" exact element={<ProductosCrear/>}/>
          <Route path="/productos-editar/:idproducto" exact element={<ProductosEditar/>}/>
          {/* Las rutas de personas */}
          <Route path="/personas-admin" exact element={<PersonasAdmin/>}/>
          <Route path="/personas-crear" exact element={<PersonasCrear/>}/>
          <Route path="/personas-editar/:idpersona" exact element={<PersonasEditar/>}/>
          {/* Las rutas de carrito de compras */}
          <Route path="/carritoDeCompras-admin" exact element={<CarritoDeComprasAdmin/>}/>
          <Route path="/carritoDeCompras-crear" exact element={<CarritoDeComprasCrear/>}/>
          <Route path="/carritoDeCompras-editar/:idcarritoDeCompra" exact element={<CarritoDeComprasEditar/>}/>
          {/* Las rutas de categorias */}
          <Route path="/categorias-admin" exact element={<CategoriasAdmin/>}/>
          <Route path="/categorias-crear" exact element={<CategoriasCrear/>}/>
          <Route path="/categorias-editar/:idcategoria" exact element={<CategoriasEditar/>}/>

        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
