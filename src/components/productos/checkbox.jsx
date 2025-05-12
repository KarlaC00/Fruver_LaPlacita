import React, { useState, useEffect } from 'react';
import { frutasCitricas, frutasTropicales } from '../productos/datos';

function CheckboxFrutas({ onChangeFrutas }) {
  const [verCitricas, setVerCitricas] = useState(false);
  const [verTropicales, setVerTropicales] = useState(false);

  useEffect(() => {
    let frutasSeleccionadas = [];

    if (verCitricas) frutasSeleccionadas = frutasSeleccionadas.concat(frutasCitricas);
    if (verTropicales) frutasSeleccionadas = frutasSeleccionadas.concat(frutasTropicales);

    if (!verCitricas && !verTropicales) {
      frutasSeleccionadas = [...frutasCitricas, ...frutasTropicales];
    }

    onChangeFrutas(frutasSeleccionadas);
  }, [verCitricas, verTropicales]);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={verCitricas}
          onChange={() => setVerCitricas(!verCitricas)}
        />
        <span>Frutas Cítricas</span>
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={verTropicales}
          onChange={() => setVerTropicales(!verTropicales)}
        />
        <span>Frutas Tropicales</span>
      </label>
    </div>
  );
}

export default CheckboxFrutas;