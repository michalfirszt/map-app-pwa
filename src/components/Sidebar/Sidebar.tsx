import { Divider, Drawer, IconButton, makeStyles } from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import classNames from 'classnames';
import React, { useState } from 'react';

import SearchInput from '../SearchInput';

const drawerWidth = 240;

const useStyle = makeStyles((theme) => ({
  drawer: {
    position: 'absolute',
    minWidth: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    minWidth: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const Sidebar = () => {
  const classes = useStyle();

  const [isDraverOpen, setIsDraverOpen] = useState<boolean>(true);
  return (
    <Drawer
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isDraverOpen,
        [classes.drawerClose]: !isDraverOpen,
      })}
      variant="permanent"
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isDraverOpen,
          [classes.drawerClose]: !isDraverOpen,
        }),
      }}
    >
      <div className={classes.drawerHeader}>
        {isDraverOpen ? <SearchInput /> : <SearchIcon />}
        <IconButton onClick={() => setIsDraverOpen(!isDraverOpen)}>
          {isDraverOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
