import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
                <b>Version</b> 1.0
            </div>
            <strong>Copyright © 2022 Cyber Dulces.</strong> Todos los derechos reservados.
        </footer>
    );
}

export default Footer;