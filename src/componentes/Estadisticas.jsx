const Estadisticas = () => {
  return (
    <div className="stats-grid-pro">
      <div className="stat-card-pro">
        <div className="stat-icon" aria-hidden="true">
          01
        </div>
        <div className="stat-info">
          <span className="stat-label">Usuarios activos</span>
          <span className="stat-value">1,240</span>
        </div>
      </div>

      <div className="stat-card-pro">
        <div className="stat-icon" aria-hidden="true">
          02
        </div>
        <div className="stat-info">
          <span className="stat-label">Inventario total</span>
          <span className="stat-value">850</span>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
