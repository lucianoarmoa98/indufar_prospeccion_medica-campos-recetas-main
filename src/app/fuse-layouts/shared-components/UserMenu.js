/* global firebase:false */
import React, {useContext, useState} from 'react';
import {
  Avatar,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  Popover,
  MenuItem,
  Typography
} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import UsuarioContext from '../../UsuarioContext';

function UserMenu(props) {
  const {usuario, actualizarUsuario} = useContext(UsuarioContext);
  const [userMenu, setUserMenu] = useState(null);
  const userMenuClick = event => {
    setUserMenu(event.currentTarget);
  };
  const userMenuClose = () => {
    setUserMenu(null);
  };
  return (
    <React.Fragment>
      <Button className="h-64" onClick={userMenuClick}>
        {
          usuario &&
          <Avatar
            className=""
            alt="user photo"
            src={`https://ui-avatars.com/api/?name=${usuario.email}&background=795548&color=fff`}/>
        }
        <div className="hidden md:flex flex-col mx-12 items-start">
          <Typography component="span" className="normal-case font-600 flex">
            {usuario && usuario.email}
          </Typography>
        </div>
        <Icon
          className="text-16 hidden sm:flex"
          variant="action">
          keyboard_arrow_down
        </Icon>
      </Button>
      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        classes={{
          paper: 'py-8'
        }}>
        <React.Fragment>
          <MenuItem
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  const username = localStorage.getItem('username');
                  const fcmToken = localStorage.getItem('fcmToken');
                  const db = firebase.firestore();
                  db.collection('users')
                    .doc(username)
                    .update({
                      tokens: firebase.firestore.FieldValue.arrayRemove(fcmToken)
                    })
                    .catch(error => {
                      console.error('No se pudo eliminar el token. ', error);
                    });
                  localStorage.removeItem('username');
                  localStorage.removeItem('fcmToken');
                  actualizarUsuario(null);
                })
                .catch(e => console.error(e));
              userMenuClose();
            }}>
            <ListItemIcon className="min-w-40">
              <Icon>exit_to_app</Icon>
            </ListItemIcon>
            <ListItemText primary="Salir"/>
          </MenuItem>
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
}

export default withRouter(UserMenu);
