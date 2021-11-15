const { db } = require('./main.js');
const paginar = require('./paginar.js');

const obtenerListaPaginadaDeProductos = (data, req) => {
  let {
    paginaActual,
    porPagina,
    busqueda,
    orderBy
  } = req.query;
  let registros = data;
  if (busqueda) {
    registros = registros.filter(data => {
      const matchCategoria = data.categoria && data.categoria.toLowerCase().includes(busqueda);
      const matchNombre = data.nombre && data.nombre.toLowerCase().includes(busqueda);
      const matchMatricula = data.matricula && data.matricula.toLowerCase().includes(busqueda);
      return matchCategoria || matchNombre || matchMatricula;
    });
  }
  return paginar(registros, orderBy, paginaActual, porPagina);
};

const getProductosProspeccion = async (req, res) => {
  try {
    const productos = [];
    const querySnapshot = await db.collection('productos').get();
    querySnapshot.forEach((doc) => {
      productos.push(
        {
          id: doc.id,
          ...doc.data()
        }
      );
    });
    let {
      cantidadDeRegistros,
      paginaActual,
      pagina
    } = obtenerListaPaginadaDeProductos(productos, req);
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

module.exports.getProductosProspeccion = getProductosProspeccion;
