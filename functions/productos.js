const axios = require('axios');
const paginar = require('./paginar.js');

const END_POINT_PRODUCTS = 'http://apps.indufar.com.py:8080/indufar-vademecum/rest/productos';
const obtenerListaPaginadaDeProductos = (response, req) => {
  let {
    paginaActual,
    porPagina,
    busqueda,
    orderBy
  } = req.query;
  let registros = response.data;
  if (busqueda) {
    registros = registros.filter(data => {
      const matchCodigoProducto = data.codigoProducto && data.codigoProducto.toLowerCase().includes(busqueda);
      const matchFamilia = data.familia && data.familia.toLowerCase().includes(busqueda);
      const matchNombreComercial = data.nombreComercial && data.nombreComercial.toLowerCase().includes(busqueda);
      const matchAccionTerapeutica = data.accionTerapeutica && data.accionTerapeutica.toLowerCase().includes(busqueda);
      return matchCodigoProducto || matchFamilia || matchNombreComercial || matchAccionTerapeutica;
    });
  }
  return paginar(registros, orderBy, paginaActual, porPagina);
};

const getProductos = async (req, res) => {
  try {
    const response = await axios.get(END_POINT_PRODUCTS);
    let {
      cantidadDeRegistros,
      paginaActual,
      pagina
    } = obtenerListaPaginadaDeProductos(response, req);
    res.send({
      data: pagina,
      totalRegistros: cantidadDeRegistros,
      paginaActual
    });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send(e);
  }
};

module.exports = getProductos;
