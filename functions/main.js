const functions = require('firebase-functions');
const Admin = require('firebase-admin');
Admin.initializeApp(functions.config().firebase);
const db = Admin.firestore();

module.exports.Admin = Admin;
module.exports.db = db;
module.exports.functions = functions;
