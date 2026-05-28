import './Botones.css';

const Botones = () => {
  return (
    <div className="button-group">
      <button className="btn-nav btn-nav--primary" type="button">
        Inicio
      </button>
      <button className="btn-nav" type="button">
        Nuevo registro
      </button>
    </div>
  );
};

export default Botones;
