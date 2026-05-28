//import React from 'react';
import './Footer.css';

import logoNutrik from '../assets/logoNutrick.png'; 
import Tiktok from '../assets/Tiktok.jpg';
import Instagram from '../assets/Instagram.jpg';
import Facebook from '../assets/Facebook.jpg';
import Colombia from '../assets/Colombia.jpg';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        <div className="footer-section brand-column">
          <img src={logoNutrik} alt="Nutrik Logo" className="footer-logo" />
          <p className="tagline">TU SALUD EMPIEZA AQUÍ</p>
        </div>

        <div className="footer-section">
          <h3>Información</h3>
          <ul>
            <li><a href="/nosotros">Acerca de Nosotros</a></li>
            <li><a href="/contacto">Contactanos</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Ayuda</h3>
          <ul>
            <li><a href="/servicio">Servicio al cliente</a></li>
            <li><a href="/pedidos">Atención y pedidos</a></li>
            <li><a href="/horarios">Horarios de atención</a></li>
          </ul>
        </div>

        <div className="footer-section socials-column">
          <h3>Síguenos</h3>
          <div className="footer-socials">
            <a href="#"><img src={Tiktok} alt="TikTok" /></a>
            <a href="#"><img src={Instagram} alt="Instagram" /></a>
            <a href="#"><img src={Facebook} alt="Facebook" /></a>
          </div>
          <div className="legal-links">
            <a href="/terminos">Términos y condiciones</a>
            <a href="/datos">Tratamiento de datos</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Nutrik. Todos los derechos reservados.</p>
        <div className="developer-tag">
          Hecho por <strong>@Nutrik Co</strong>
          <img src={Colombia} alt="Colombia" className="flag" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

