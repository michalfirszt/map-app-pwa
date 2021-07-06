import { Button, FormLabel, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as L from 'leaflet';
import { includes } from 'lodash';
import React, {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useReducer,
} from 'react';
import { useTranslation } from 'react-i18next';

export type EventFormData = {
  name: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
};

type Props = {
  defaultValues: EventFormData;
};

import { tKeys } from '../../constants';
import { useMap } from '../../hooks';
import { blueIcon } from '../../hooks/useMap/icons';
import { Latlng } from '../../hooks/useMap/types';

type Actions =
  | { type: 'setName'; payload: string }
  | { type: 'setDescription'; payload: string }
  | { type: 'setLocation'; payload: Latlng }
  | { type: 'createEvent'; payload: (state: any) => void };

const reducer = (state: any, { type, payload }: Actions) => {
  switch (type) {
    case 'setName': {
      return { ...state, name: payload };
    }
    case 'setDescription': {
      return { ...state, description: payload };
    }
    case 'setLocation': {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { lat, lng } = payload;
      return { ...state, latitude: lat, longitude: lng };
    }
    case 'createEvent': {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      payload?.(state);

      return state;
    }
  }
};

const useStyles = makeStyles(() =>
  createStyles({
    fieldPadding: {
      paddingBottom: '15px',
      paddingTop: '15px',
    },
    map: {
      width: '100%',
      height: '500px',
      margin: 0,
      padding: 0,
    },
  })
);

const EventForm = ({ defaultValues }: Props): ReactElement => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [formData, dispatch] = useReducer(reducer, defaultValues);
  const { name, description } = formData;

  const handleOnClickMap = useCallback((map, latlng) => {
    L.marker(latlng, {
      icon: blueIcon,
    }).addTo(map);

    dispatch({ type: 'setLocation', payload: latlng });
  }, []);

  const handleSubmit = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
  }, []);

  const mapRef = useMap({
    latitude: Number(process.env.REACT_APP_MAIN_MAP_LAT),
    longitude: Number(process.env.REACT_APP_MAIN_MAP_LNG),
    zoom: Number(process.env.REACT_APP_MAIN_MAP_ZOOM),
    onClickMap: handleOnClickMap,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.fieldPadding}>
        <TextField
          id="name-input"
          label={t(tKeys.NAME)}
          name="name"
          autoComplete="off"
          defaultValue={name}
          required
          fullWidth
          onChange={(event) =>
            dispatch({ type: 'setName', payload: event.target.value })
          }
        />
      </div>
      <div className={classes.fieldPadding}>
        <TextField
          id="description-input"
          label={t(tKeys.DESCRIPTION)}
          name="description"
          autoComplete="off"
          defaultValue={description}
          required
          fullWidth
          onChange={(event) =>
            dispatch({
              type: 'setDescription',
              payload: event.target.value,
            })
          }
        />
      </div>
      <div className={classes.fieldPadding}>
        <FormLabel>{t(tKeys.LOCATION)}</FormLabel>
        <div ref={mapRef} className={classes.map}></div>
      </div>
      <div className={classes.fieldPadding}>
        <Button type="submit" disabled={includes(formData, null)}>
          {t(tKeys.SAVE)}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
