import React, { useState, useEffect } from 'react';
import {
  frutasCitricas,
  frutasTropicales,
  verdurasDeHoja,
  verdurasDeRaiz,
  tuberculosYRaices,
  setasYHongos
} from '../productos/datos';

const categorias = [
  { nombre: 'Frutas Cítricas', key: 'citricas', datos: frutasCitricas },
  { nombre: 'Frutas Tropicales', key: 'tropicales', datos: frutasTropicales },
  { nombre: 'Verduras de Hoja', key: 'hoja', datos: verdurasDeHoja },
  { nombre: 'Verduras de Raíz', key: 'raiz', datos: verdurasDeRaiz },
  { nombre: 'Tubérculos y Raíces', key: 'tuberculos', datos: tuberculosYRaices },
  { nombre: 'Setas y Hongos', key: 'hongos', datos: setasYHongos },
];

function CheckboxFrutas({ onChangeFrutas }) {
  const [seleccionadas, setSeleccionadas] = useState({});

  useEffect(() => {
    const seleccionadasKeys = Object.keys(seleccionadas).filter((key) => seleccionadas[key]);
    let frutasSeleccionadas = [];

    if (seleccionadasKeys.length === 0) {
      frutasSeleccionadas = categorias.flatMap((cat) => cat.datos);
    } else {
      frutasSeleccionadas = categorias
        .filter((cat) => seleccionadas[cat.key])
        .flatMap((cat) => cat.datos);
    }

    onChangeFrutas(frutasSeleccionadas);
  }, [seleccionadas]);

  const toggleCategoria = (key) => {
    setSeleccionadas((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ul style={{ fontSize: '18px', padding: '10px', listStyle: 'none', margin: 0 }}>
      {categorias.map((categoria) => (
        <li key={categoria.key} style={{ marginBottom: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={!!seleccionadas[categoria.key]}
              onChange={() => toggleCategoria(categoria.key)}
              style={{ transform: 'scale(1.5)', marginRight: '10px' }}
            />
            <span>{categoria.nombre}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default CheckboxFrutas;
