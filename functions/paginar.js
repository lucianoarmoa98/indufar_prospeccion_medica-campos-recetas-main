
const paginar = (registros, orderBy, paginaActual, porPagina) => {
  const cantidadDeRegistros = registros.length;
  if (orderBy) {
    const camposYDireccion = orderBy.split(';');
    const campo = camposYDireccion[0];
    const direccion = camposYDireccion[1];
    const compare = (a, b) => {
      const factor = direccion === 'asc' ? 1 : -1;
      if (a[campo] < b[campo]) {
        return -factor;
      }
      if (a[campo] > b[campo]) {
        return factor;
      }
      return 0;
    };
    registros = registros.sort(compare);
  }
  paginaActual = paginaActual ? parseInt(paginaActual) : 1;
  porPagina = porPagina ? parseInt(porPagina) : 10;
  const indiceInicial = porPagina * (paginaActual - 1);
  const indiceFinal = Math.min(indiceInicial + porPagina - 1, cantidadDeRegistros - 1);
  const pagina = registros.slice(indiceInicial, indiceFinal + 1);
  return {cantidadDeRegistros, paginaActual, pagina};
};

module.exports = paginar;
