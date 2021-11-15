const {Admin} = require('./main.js');
const paginar = require('./paginar.js');
const { buildSanitizeFunction } = require('express-validator');

const queryCleaner = buildSanitizeFunction(['query']);
const validatorOfUsuariosQueryParam = [queryCleaner('activo').toBoolean()];
module.exports.validatorOfUsuariosQueryParam = validatorOfUsuariosQueryParam;

const normalizarUsuarios = (users) => {
  let usuariosNormalizados = [];
  users.forEach(u => {
    usuariosNormalizados.push({
      ...u,
      roles: u.customClaims && u.customClaims.roles,
      nombre: u.customClaims && u.customClaims.nombre,
      apellido: u.customClaims && u.customClaims.apellido,
      legajo:  u.customClaims && u.customClaims.legajo,
      activo: !u.disabled
    });
  });
  return usuariosNormalizados;
};

const getPlainUsuarios = async () => {
  let listUsersResult = await Admin.auth().listUsers(1000);
  let users = normalizarUsuarios(listUsersResult.users);
  let pageToken = listUsersResult.pageToken;
  /* eslint-disable no-await-in-loop */
  while (pageToken) {
    listUsersResult = await Admin.auth().listUsers(1000);
    users = [...users, normalizarUsuarios(listUsersResult.users)];
    pageToken = listUsersResult.pageToken;
  }
  return users;
};

module.exports.getPlainUsuarios = getPlainUsuarios;

const obtenerListaPaginadaDeUsuarios = (registros, req) => {
  let {
    paginaActual,
    porPagina,
    busqueda,
    orderBy,
    activo
  } = req.query;
  if (busqueda) {
    registros = registros.filter(data => {
      const patternEmail = data.email && data.email.toLowerCase().includes(busqueda);
      const patternNombre = data.nombre && data.nombre.toLowerCase().includes(busqueda);
      const patternApellido = data.apellido && data.apellido.toLowerCase().includes(busqueda);
      const patternLegajo = data.legajo && data.legajo.toLowerCase().includes(busqueda);
      return patternEmail || patternNombre || patternApellido || patternLegajo;
    });
  }
  registros = registros.filter(data => data.activo === activo);
  return paginar(registros, orderBy, paginaActual, porPagina);
};

const getUsuarios = async (req, res) => {
  try {
    let registros = await getPlainUsuarios();
    let {
      cantidadDeRegistros,
      paginaActual,
      pagina
    } = obtenerListaPaginadaDeUsuarios(registros, req);
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

module.exports.getUsuarios = getUsuarios;

const getUsuario = async (req, res) => {
  const {id} = req.params;
  try {
    const usuario = await Admin.auth().getUser(id);
    res.send({
      ...usuario,
      roles: usuario.customClaims && usuario.customClaims.roles,
      nombre: usuario.customClaims && usuario.customClaims.nombre,
      apellido: usuario.customClaims && usuario.customClaims.apellido,
      legajo: usuario.customClaims && usuario.customClaims.legajo,
      activo: !usuario.disabled
    });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send(e);
  }
};

module.exports.getUsuario = getUsuario;
