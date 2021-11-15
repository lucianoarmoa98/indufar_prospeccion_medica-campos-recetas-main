const {Admin, db} = require('./main.js');
const { check, validationResult } = require('express-validator');

const validadorDeNotificacion = [
  check('notification').exists(),
  check('notification.title').exists(),
  check('notification.body').exists(),
  check('notification.icon').exists(),
  check('notification.click_action').exists()
];

const obtenerTokens = async () => {
  const users = await db.collection('users').get();
  let tokens = [];
  users.forEach(e => {
    const user = e.data();
    tokens = [
      ...tokens,
      ...user.tokens
    ];
  });
  return tokens;
};

const postNotificaciones = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }
  const tokens = await obtenerTokens();
  if (_.isEmpty(tokens)) {
    return res.send('ok');
  }
  const message = {
    notification: {
      ...req.body.notification
    },
    data: {
      redirect: req.body.notification.click_action
    }
  };
  try {
    Admin.messaging().sendToDevice(tokens, message);
    res.send('ok');
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send(e);
  }
};

module.exports.validadorOfNotificacionBody = validadorDeNotificacion;
module.exports.postNotificaciones = postNotificaciones;
