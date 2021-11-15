import * as Actions from '../../actions/fuse/index';
import navigationConfig from 'app/fuse-configs/navigationConfig';
import _ from '@lodash';

const initialState = navigationConfig;

const navigation = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_NAVIGATION: {
      return [
        ...state
      ];
    }
    case Actions.SET_NAVIGATION: {
      return [
        ...action.navigation
      ];
    }
    case Actions.RESET_NAVIGATION: {
      return [
        ...initialState
      ];
    }
    case Actions.REMOVE_MENU_CHILDREN_NAVIGATION: {
      const {menu, roles} = action.payload;
      const menus = [...initialState];
      const childIndex = menus.findIndex(e => {
        return e.id === menu;
      });
      if (childIndex === -1) {
        return state;
      }
      const leftSide = menus.slice(0, childIndex);
      const rightSide = menus.slice(childIndex + 1, menus.length);
      const childrenUdated = menus[childIndex].children.filter(e => {
        if (_.isUndefined(e.isVisible)) {
          return true;
        }
        return e.isVisible(roles);
      });
      return [
        ...leftSide,
        {
          ...menus[childIndex],
          children: [
            ...childrenUdated
          ]
        },
        ...rightSide
      ];
    }
    default: {
      return state;
    }
  }
};

export default navigation;
