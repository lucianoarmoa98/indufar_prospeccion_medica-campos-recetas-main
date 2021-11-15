import Dashboard from './Dashboard';
import React from 'react';

export const DashboardConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/dashboard',
      component: Dashboard,
      exact: true
    }
  ]
};

const API_KEY = 'AIzaSyB6xhEa2cnWZ6zgrOOG9pj49ZKCiI6KxwA';

export const config = {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
  eventStyleBigCalendar: (event) => {
    const backgroundColor = event.hexColor;
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.65,
      color: 'black',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  }
};

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ProductosConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
