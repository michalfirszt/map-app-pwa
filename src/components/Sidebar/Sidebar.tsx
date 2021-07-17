import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Drawer,
  IconButton,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Person as PersonIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import classNames from 'classnames';
import React, { ReactElement, useContext, useState } from 'react';
import { useWindowSize } from 'react-use';

import AppContext from '../../contexts/AppContext';
import SearchInput from '../SearchInput';
import SidebarList from './SidebarList';

type Props = {
  searchDisabled?: boolean;
};

const drawerWidth = 240;

const useStyle = makeStyles((theme) =>
  createStyles({
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
  })
);

const Sidebar = ({ searchDisabled = true }: Props): ReactElement => {
  const classes = useStyle();
  const { width } = useWindowSize();
  const {
    userData: { username },
  } = useContext<any>(AppContext);

  const [isDraverOpen, setIsDraverOpen] = useState<boolean>(width > 700);
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
        {isDraverOpen ? (
          <SearchInput disabled={searchDisabled} />
        ) : (
          <SearchIcon />
        )}
        <IconButton onClick={() => setIsDraverOpen(!isDraverOpen)}>
          {isDraverOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <SidebarList />
      <BottomNavigation>
        <BottomNavigationAction label={username} icon={<PersonIcon />} />
      </BottomNavigation>
    </Drawer>
  );
};

export default Sidebar;
