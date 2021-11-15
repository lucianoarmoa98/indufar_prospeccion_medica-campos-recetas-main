import React, {useContext} from 'react';
import {AppBar, Avatar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import UsuarioContext from '../../UsuarioContext';

const useStyles = makeStyles(theme => ({
  root: {
    '&.user': {
      '& .username, & .email': {
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut
        })
      }
    }
  },
  avatar: {
    width: 64,
    height: 64,
    position: 'absolute',
    top: 72,
    padding: 8,
    background: theme.palette.background.default,
    boxSizing: 'content-box',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    }),
    '& > img': {
      borderRadius: '50%'
    }
  }
}));

function UserNavbarHeader(props) {
  const {usuario} = useContext(UsuarioContext);
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      classes={{root: classes.root}}
      className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0">
      <Typography className="username text-16 whitespace-no-wrap"
                  color="inherit">{usuario && usuario.email}</Typography>
      {
        usuario &&
        <Avatar
          className={clsx(classes.avatar, 'avatar')}
          alt="user photo"
          src={`https://ui-avatars.com/api/?name=${usuario.email}&background=ffc107&color=000`}/>
      }
    </AppBar>
  );
}

export default UserNavbarHeader;
