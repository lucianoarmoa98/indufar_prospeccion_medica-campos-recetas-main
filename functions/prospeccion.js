const { db } = require('./main.js');
const paginar = require('./paginar.js');

const obtenerListaPaginadaDeProspecciones = (data, req) => {
  let {
    paginaActual,
    porPagina,
    busqueda,
    orderBy
  } = req.query;
  let registros = data;
  if (busqueda) {
    const _busqueda = JSON.parse(busqueda);
    registros = registros.filter(data => {
      for (let key in _busqueda) {
        if (data[key] === _busqueda[key]) {
          return true;
        }
      }
      return false;
    });
  }
  return paginar(registros, orderBy, paginaActual, porPagina);
};

const getProspecciones = async (req, res) => {
  try {
    const prospecciones = [];
    const querySnapshot = await db.collection('prospeccion').get();
    querySnapshot.forEach((doc) => {
      prospecciones.push(doc.data());
    });
    let {
      cantidadDeRegistros,
      paginaActual,
      pagina
    } = obtenerListaPaginadaDeProspecciones(prospecciones, req);
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

module.exports.getProspecciones = getProspecciones;

const getProspeccion = async (req, res) => {
  try {
    const { idProspecto } = req.params;
    const querySnapshot = await db.collection('prospeccion').get();
    let data = {};
    for (let i in querySnapshot.docs) {
      const doc = querySnapshot.docs[i];
      if (doc.data().id === Number(idProspecto)) {
        const fechaDeActualizacion =
          doc.data().fechaDeActualizacion && (doc.data().fechaDeActualizacion._seconds * 1000) ||
            null;
        data = {
          ...doc.data(),
          fechaDeActualizacion
        };
        break;
      }
    }
    res.send({
      data
    });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send(e);
  }
};

module.exports.getProspeccion = getProspeccion;

const getProductosDeProspecto = async (req, res) => {
  try {
    const { idProspecto } = req.params;
    const querySnapshot = await db.collection('prospectosProductos')
      .where('idProspecto', '==', Number(idProspecto)).get();
    let data = [];
    for (let i in querySnapshot.docs) {
      const doc = querySnapshot.docs[i];
      const dataFormated = {
        ...doc.data(),
        fechaDeActualizacion: (doc.data().fechaDeActualizacion._seconds * 1000)
      };
      data.push(dataFormated);
    }
    res.send({
      data
    });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send(e);
  }
};

module.exports.getProductosDeProspecto = getProductosDeProspecto;
