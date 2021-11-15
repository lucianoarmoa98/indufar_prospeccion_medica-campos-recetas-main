/* eslint-disable */
import React, {useContext, useRef, useState} from 'react';
import {Tab, Tabs} from '@material-ui/core';
import {FuseAnimateGroup, FusePageSimple} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import Widget6 from './widgets/Widget6';
import Widget7 from './widgets/Widget7';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
import Widget10 from './widgets/Widget10';
import Widget11 from './widgets/Widget11';
import {makeStyles} from '@material-ui/styles';
import UsuarioContext from '../../../UsuarioContext';

const useStyles = makeStyles(theme => ({
  content: {
    '& canvas': {
      maxHeight: '100%'
    }
  },
  selectedProject: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '8px 0 0 0'
  },
  projectMenuButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '0 8px 0 0',
    marginLeft: 1
  }
}));

function ProjectDashboardApp(props) {
  const { user } = useContext(UsuarioContext);
  const dispatch = useDispatch();
  const widgets = useSelector(({projectDashboardApp}) => projectDashboardApp.widgets);
  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);
  const [selectedProject, setSelectedProject] = useState({
    id: 1,
    menuEl: null
  });

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  function handleChangeProject(id) {
    setSelectedProject({
      id,
      menuEl: null
    });
  }

  function handleOpenProjectMenu(event) {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: event.currentTarget
    });
  }

  function handleCloseProjectMenu() {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: null
    });
  }
  return (
    <FusePageSimple
      classes={{
        header: 'min-h-160 h-160',
        toolbar: 'min-h-48 h-48',
        rightSidebar: 'w-288',
        content: classes.content
      }}
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="off"
          className="w-full border-b-1 px-24">
          <Tab className="text-14 font-600 normal-case" label="Inicio"/>
          <Tab className="text-14 font-600 normal-case" label="Resumen"/>
          <Tab className="text-14 font-600 normal-case" label="Equipo"/>
        </Tabs>
      }
      content={
        <div className="p-12">
          {tabValue === 0 &&
          (
            <FuseAnimateGroup
              className="flex flex-wrap"
              enter={{
                animation: 'transition.slideUpBigIn'
              }}>
              <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                <Widget1 widget={widgets.widget1}/>
              </div>
              <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                <Widget2 widget={widgets.widget2}/>
              </div>
              <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                <Widget3 widget={widgets.widget3}/>
              </div>
              <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                <Widget4 widget={widgets.widget4}/>
              </div>
              <div className="widget flex w-full p-12">
                <Widget5 widget={widgets.widget5}/>
              </div>
              <div className="widget flex w-full sm:w-1/2 p-12">
                <Widget6 widget={widgets.widget6}/>
              </div>
              <div className="widget flex w-full sm:w-1/2 p-12">
                <Widget7 widget={widgets.widget7}/>
              </div>
            </FuseAnimateGroup>
          )}
          {tabValue === 1 && (
            <FuseAnimateGroup
              className="flex flex-wrap"
              enter={{
                animation: 'transition.slideUpBigIn'
              }}>
              <div className="widget flex w-full sm:w-1/2 p-12">
                <Widget8 widget={widgets.widget8}/>
              </div>
              <div className="widget flex w-full sm:w-1/2 p-12">
                <Widget9 widget={widgets.widget9}/>
              </div>
              <div className="widget flex w-full p-12">
                <Widget10 widget={widgets.widget10}/>
              </div>
            </FuseAnimateGroup>
          )}
          {tabValue === 2 && (
            <FuseAnimateGroup
              className="flex flex-wrap"
              enter={{
                animation: 'transition.slideUpBigIn'
              }}>
              <div className="widget flex w-full p-12">
                <Widget11 widget={widgets.widget11}/>
              </div>
            </FuseAnimateGroup>
          )}
        </div>
      }
      ref={pageLayout}
    />
  );
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
