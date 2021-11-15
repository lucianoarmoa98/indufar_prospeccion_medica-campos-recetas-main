const {functions, Admin} = require('./main.js');
const { getPlainUsuarios } = require('./usuarios');

function removeArrobaPart(value) {
  return value.split('@')[0];
}

const usuarioCreate = async (data) => {
  const usuarios = await getPlainUsuarios();
  const existsUsuarioWirhLegajo = usuarios.find(usuario => data.legajo === usuario.legajo);
  if (existsUsuarioWirhLegajo) {
    throw new functions.https.HttpsError(
      'internal',
      'Existe usuario con el legajo introducido...'
    );
  }
  try {
    const uid = removeArrobaPart(data.email);
    await Admin.auth().createUser({
      uid,
      email: data.email,
      password: data.contrasenha0,
      displayName: `${data.nombre} ${data.apellido}`
    });
    const userRecord = await Admin.auth().setCustomUserClaims(
      uid,
      {
        roles: data.roles,
        nombre: data.nombre,
        apellido: data.apellido,
        legajo: data.legajo
      }
    );
    return {status: 'ok', success: true, user: userRecord};
  } catch (e) {
    throw new functions.https.HttpsError(
      'internal',
      e
    );
  }
};

module.exports = usuarioCreate;
