function TarjetaProducto({ nombre, precio, imagen }) {
  return (
    <div className="col s12 m6 l3">
      <div className="card grey lighten-3 z-depth-3">
        <div className="card-image">
          <img
            src={imagen || "https://via.placeholder.com/200"}
            alt={nombre || "Producto"}
            className="responsive-img"
            style={{ objectFit: "cover", height: "180px", width: "100%" }}
          />
        </div>
        <div className="card-content center-align">
          <h5 className="truncate">{nombre || "Producto sin nombre"}</h5>
          <p className="bold" style={{ fontSize: "18px", color: "#2e7d32" }}>
            {precio || "Sin precio"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProducto;
