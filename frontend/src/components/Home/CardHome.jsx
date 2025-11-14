import { useNavigate } from "react-router-dom";

export const CardHome = ({ title = "", description = "", icon = "info", boton = "", path = "/" }) => {
  const navigate = useNavigate();
  
  return (
    <div className="col s12 m4 l4 my-5">
      <div
        className="card center-align z-depth-1 hoverable"
        style={{
          padding: "20px",
          borderRadius: "10px",
          height: "100%",
        }}
      >
        <i className="material-icons large light-green-text text-darken-3">{icon}</i>
        <span className="card-title flow-text" style={{ fontWeight: "bold" }}>
          {title}
        </span>
        <div className="card-content flow-text">
          <p>{description}</p>
        </div>
        <button
          className="btn light-green darken-3"
          onClick={() => navigate(path)}
          style={{ marginTop: "20px" }}
        >
          {boton}
        </button>
      </div>
    </div>
  );
};