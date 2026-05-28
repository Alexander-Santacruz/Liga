<<<<<<< HEAD
import React, { useState } from 'react'
import './Contact.css'

const Contacto = () => {
  const [form, setForm] = useState({
    nombre: '',
    asunto: 'Queja / Reclamo / Contacto',
    mensaje: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const destinatario = 'davidalexanderchangosantacruz@gmail.com'
    const subject = `${form.asunto} - Nutrik`
    const body = `Nombre: ${form.nombre}\n\nMensaje:\n${form.mensaje}`
    window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="contacto-container">
      <div className="contacto-intro">
        <h1>Contacto Profesional</h1>
        <p>
          Si necesitas información, soporte o tienes un reclamo, estamos para ayudarte.
          Nuestro objetivo es ofrecer atención rápida y clara para que tu experiencia en
          Nutrik sea siempre confiable.
        </p>
      </div>

      <div className="contacto-grid">
        <div className="contacto-card">
          <h2>Datos de contacto</h2>
          <p>Teléfono: <strong>+57 314 585 9831</strong></p>
          <p>Correo de atención: <strong>davidalexanderchangosantacruz@gmail.com</strong></p>
          <p>
            Para consultas profesionales, contacto o cualquier requerimiento relacionado con
            la plataforma Nutrik, contáctanos directamente y te responderemos lo antes posible.
          </p>
        </div>

        <form className="contacto-form" onSubmit={handleSubmit}>
          <h2>Envía tu queja o contacto</h2>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />

          <label htmlFor="asunto">Asunto</label>
          <input
            id="asunto"
            name="asunto"
            type="text"
            value={form.asunto}
            onChange={handleChange}
            required
          />

          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            placeholder="Escribe aquí tu queja, reclamo o contacto"
            rows="6"
            required
          />

          <button type="submit">Enviar al correo</button>
          <p className="contacto-note">
            Al enviar, se abrirá tu cliente de correo para concretar el mensaje hacia el equipo
            de Nutrik.
          </p>
        </form>
      </div>
    </div>
  )
=======
import { useState } from 'react';

function Contact() {
  const [estadoEnvio, setEstadoEnvio] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    setEstadoEnvio('sending');

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/davidalexanderchangosantacruz@gmail.com',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario.');
      }

      setEstadoEnvio('success');
      form.reset();
      window.setTimeout(() => setEstadoEnvio('idle'), 5000);
    } catch {
      setEstadoEnvio('error');
    }
  };

  return (
    <section className="contacto-section" id="contacto">
      <div className="card-glass">
        <div className="contacto-header">
          <span className="section-tag">Centro de ayuda</span>
          <h2>Atencion al usuario</h2>
          <p>
            Tu opinion nos importa. Escribenos para una queja, reclamo,
            sugerencia o una consulta general.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="pqr-form">
          <input
            type="hidden"
            name="_subject"
            value="Nueva solicitud desde Nutrick"
          />
          <input type="hidden" name="_template" value="table" />
          <input
            type="text"
            name="_honey"
            className="hidden-field"
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="input-group">
            <div className="field">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ej. David Santacruz"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="correo">Correo electronico</label>
              <input
                id="correo"
                name="email"
                type="email"
                placeholder="david@nutrick.com"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="tipo">Tipo de solicitud</label>
            <select id="tipo" name="tipo_solicitud" required defaultValue="">
              <option value="" disabled>
                Selecciona una opcion...
              </option>
              <option value="queja">Queja o reclamo</option>
              <option value="sugerencia">Sugerencia</option>
              <option value="consulta">Contacto general</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="mensaje">Mensaje detallado</label>
            <textarea
              id="mensaje"
              name="mensaje"
              placeholder="Describe aqui tu situacion con el mayor detalle posible..."
              rows="6"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-glow"
            disabled={estadoEnvio === 'sending'}
          >
            {estadoEnvio === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>

        {estadoEnvio === 'success' && (
          <div className="alerta-success" role="status">
            Solicitud enviada. Revisa el correo de destino para confirmar
            FormSubmit la primera vez.
          </div>
        )}

        {estadoEnvio === 'error' && (
          <div className="alerta-error" role="alert">
            No pudimos enviar el formulario en este intento. Intenta
            nuevamente en un momento.
          </div>
        )}
      </div>
    </section>
  );
>>>>>>> 730b791b052c998ac1f09d33e3ae2de46687988a
}

export default Contact;
