import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  DateRange as DateRangeIcon,
  Map as MapIcon,
  Room as RoomIcon,
} from '@material-ui/icons';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { tKeys } from '../../constants';
import paths from '../../routes/paths';
import DialogItem from '../DialogItem';
import EventList from '../EventList';

const SidebarList = (): ReactElement => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <List data-testid="sidebar-list">
      <ListItem
        button
        onClick={() => {
          history.push(paths.root);
        }}
      >
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary={t(tKeys.MAP)} />
      </ListItem>
      <DialogItem dialogContent={<EventList />}>
        <ListItem button>
          <ListItemIcon>
            <DateRangeIcon />
          </ListItemIcon>
          <ListItemText primary={t(tKeys.EVENTS)} />
        </ListItem>
      </DialogItem>
      <ListItem
        button
        onClick={() => {
          history.push(paths.eventCreate);
        }}
      >
        <ListItemIcon>
          <RoomIcon />
        </ListItemIcon>
        <ListItemText primary={t(tKeys.CREATE_EVENT)} />
      </ListItem>
    </List>
  );
};

export default SidebarList;
