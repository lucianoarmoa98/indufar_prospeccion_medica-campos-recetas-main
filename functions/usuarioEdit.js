const {functions, Admin} = require('./main.js');
const { getPlainUsuarios } = require('./usuarios');

const usuarioEdit = async (data) => {
  const uid = data.uid;
  if (!uid) {
    throw new functions.https.HttpsError(
      'internal',
      'El usuario no posee identificador (uid).'
    );
  }
  const usuarios = await getPlainUsuarios();
  const usuarioWithLegajo = usuarios.find(usuario => data.legajo === usuario.legajo);
  if (usuarioWithLegajo && usuarioWithLegajo.uid !== uid) {
    throw new functions.https.HttpsError(
      'internal',
      'Existe otro usuario ya creado con el legajo introducido...'
    );
  }
  try {
    const userDataToUpdate = {
      email: data.email,
      displayName: `${data.nombre} ${data.apellido}`,
      disabled: !data.activo
    };
    if (data.contrasenha0) {
      userDataToUpdate.password = data.contrasenha0;
    }
    await Admin.auth().updateUser(uid, userDataToUpdate);
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

module.exports = usuarioEdit;
