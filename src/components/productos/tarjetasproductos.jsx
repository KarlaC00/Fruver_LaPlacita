function TarjetaProducto({ nombre, precio, imagen }) {
  return (
    <div className="col s12 m6 l3">
      <div className="card grey lighten-2">
        <div className="card-image">
          <img className="imgproductos"
            src={imagen}
            alt={nombre}
          />
        </div>
        <div className="card-content">
          <h5>{nombre}</h5>
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>{precio}</p>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProducto;
