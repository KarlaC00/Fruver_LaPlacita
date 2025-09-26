import Imagetop from "../components/Imagetop";
import "../styles/Nosotros.css";
import CollapsibleNosotros from "../components/Nosotros/Collapsible";
import Descripcion from "../components/Nosotros/Descripcion";

const Nosotros = () => {
  return (
    <>
      <Imagetop title="Nosotros" />
      <Descripcion />
      <div className="row container">
        <div className="col s12 center-align">
          <CollapsibleNosotros />
        </div>
      </div>
    </>
  );
};

export default Nosotros;
