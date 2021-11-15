const { functions } = require('./main.js');
const express = require('express');
const cors = require('cors');

/**
 * Aplicación.
 * @type {*|Express}
 */
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.get('/', (req, res) => res.send('ok'));

// Notificaciones.
const { validadorOfNotificacionBody, postNotificaciones } = require('./notificaciones.js');
app.post('/broadcast-notificaciones', validadorOfNotificacionBody, postNotificaciones);

// Productos.
const getProductos = require('./productos.js');
app.get('/productos', getProductos);

// Productos de prospeccion.
const {getProductosProspeccion} = require('./productosProspeccion.js');
app.get('/prospectos/productos', getProductosProspeccion);

// Productos de prospeccion.
const {getProspecciones, getProspeccion, getProductosDeProspecto} = require('./prospeccion.js');
app.get('/prospectos', getProspecciones);
app.get('/prospectos/:idProspecto', getProspeccion);
app.get('/prospectos/:idProspecto/productos', getProductosDeProspecto);

// Medicos.
const {validatorOfMedicosQueryParam, getMedicos} = require('./medicos.js');
app.get('/medicos', validatorOfMedicosQueryParam, getMedicos);

// Sección de usuarios.
const { validatorOfUsuariosQueryParam, getUsuarios, getUsuario } = require('./usuarios.js');
app.get('/usuarios', validatorOfUsuariosQueryParam, getUsuarios);
app.get('/usuarios/:id', getUsuario);

/**
 * Admin. Creación de usuarios.
 * @type {usuarioCreate}
 */
const usuarioCreate = require('./usuarioCreate.js');

/**
 * Admin. Edición de usuarios.
 * @type {usuarioCreate}
 */
const usuarioCEdit = require('./usuarioEdit.js');

exports.prospeccion = functions.https.onRequest(app);
exports.usuarioCreate = functions.https.onCall(usuarioCreate);
exports.usuarioEdit = functions.https.onCall(usuarioCEdit);
