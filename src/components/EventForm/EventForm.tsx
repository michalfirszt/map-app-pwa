import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormLabel, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as L from 'leaflet';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { tKeys } from '../../constants';
import { useMap } from '../../hooks';
import { blueIcon } from '../../hooks/useMap/icons';

export type EventFormData = {
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

type Props = {
  defaultValues?: EventFormData;
  onSubmit?: (formData: EventFormData) => void;
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

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  location: yup.object().shape({
    latitude: yup.number().required(),
    longitude: yup.number().required(),
  }),
});

const EventForm = ({ defaultValues, onSubmit }: Props): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    register,
    clearErrors,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: defaultValues ?? {
      name: '',
      description: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit: SubmitHandler<EventFormData> = useCallback(
    (formData) => {
      onSubmit?.(formData);
    },
    []
  );

  const handleOnClickMap = useCallback(
    (map, latlng) => {
      const { lat, lng } = latlng;

      L.marker(latlng, {
        icon: blueIcon,
      }).addTo(map);

      setValue('location', { latitude: lat, longitude: lng });
      clearErrors('location');
    },
    [setValue]
  );

  const mapRef = useMap({
    latitude: Number(process.env.REACT_APP_MAIN_MAP_LAT),
    longitude: Number(process.env.REACT_APP_MAIN_MAP_LNG),
    zoom: Number(process.env.REACT_APP_MAIN_MAP_ZOOM),
    markers: defaultValues
      ? [
          {
            latitude: defaultValues.location.latitude,
            longitude: defaultValues.location.longitude,
          },
        ]
      : [],
    onClickMap: handleOnClickMap,
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={classes.fieldPadding}>
        <TextField
          id="name-input"
          label={t(tKeys.NAME)}
          name="name"
          autoComplete="off"
          error={!!errors.name}
          helperText={errors.name ? t(tKeys.ERROR) : ''}
          inputProps={{ ...register('name') }}
          fullWidth
        />
      </div>
      <div className={classes.fieldPadding}>
        <TextField
          id="description-input"
          label={t(tKeys.DESCRIPTION)}
          name="description"
          autoComplete="off"
          error={!!errors.description}
          helperText={errors.description ? t(tKeys.ERROR) : ''}
          inputProps={{ ...register('description') }}
          fullWidth
        />
      </div>
      <div className={classes.fieldPadding}>
        <FormLabel>{t(tKeys.LOCATION)}</FormLabel>
        <div ref={mapRef} className={classes.map} />
        {!!errors.location && <p>{t(tKeys.ERROR)}</p>}
      </div>
      <div className={classes.fieldPadding}>
        <Button type="submit">{t(tKeys.SAVE)}</Button>
      </div>
    </form>
  );
};

export default EventForm;
