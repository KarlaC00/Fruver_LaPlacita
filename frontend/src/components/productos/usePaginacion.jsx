import { useState } from "react";

const usePaginacion = (items, itemsPorPagina = 4) => {
  const [paginaActual, setPaginaActual] = useState(1);

  const totalPaginas = Math.ceil(items.length / itemsPorPagina);

  const indiceInicio = (paginaActual - 1) * itemsPorPagina;
  const itemsPaginados = items.slice(indiceInicio, indiceInicio + itemsPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return {
    paginaActual,
    totalPaginas,
    itemsPaginados,
    cambiarPagina,
    setPaginaActual,
  };
};

export default usePaginacion;
