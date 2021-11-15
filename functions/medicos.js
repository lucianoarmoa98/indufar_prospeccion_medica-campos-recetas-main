const {db} = require('./main.js');
const paginar = require('./paginar.js');
const { buildSanitizeFunction } = require('express-validator');

const queryCleaner = buildSanitizeFunction(['query']);
const validatorOfMedicosQueryParam = [queryCleaner('categoria').toInt()];
module.exports.validatorOfMedicosQueryParam = validatorOfMedicosQueryParam;

const obtenerListaPaginadaDeMedicos = (data, req) => {
  let {
    paginaActual,
    porPagina,
    busqueda,
    orderBy
  } = req.query;
  let registros = data;
  if (busqueda) {
    registros = registros.filter(data => {
      const matchNombre = data.nombre && data.nombre.toLowerCase().includes(busqueda);
      const matchMatricula = data.matricula && data.matricula.toLowerCase().includes(busqueda);
      return matchNombre || matchMatricula;
    });
  }
  return paginar(registros, orderBy, paginaActual, porPagina);
};

const getMedicos = async (req, res) => {
  try {
    const medicos = [];
    const querySnapshot = await db.collection('medicos').get();
    querySnapshot.forEach((doc) => {
      medicos.push(doc.data());
    });
    let {
      cantidadDeRegistros,
      paginaActual,
      pagina
    } = obtenerListaPaginadaDeMedicos(medicos, req);
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

module.exports.getMedicos = getMedicos;
