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
}

export default Contacto
