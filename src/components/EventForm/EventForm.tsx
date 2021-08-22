import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormLabel, Grid, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import * as L from 'leaflet';
import React, { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { tKeys } from '../../constants';
import { useMap } from '../../hooks';
import { blueIcon } from '../../hooks/useMap/icons';

export type EventFormData = {
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  location: {
    latitude: number;
    longitude: number;
  };
};

type Props = {
  defaultValues?: EventFormData;
  onSubmit?: (formData: EventFormData) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fieldRow: {
      padding: theme.spacing(1.5, 1),
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
  startDate: yup.date().required(),
  endDate: yup.date().required().min(yup.ref('startDate')),
  location: yup.object().shape({
    latitude: yup.number().required(),
    longitude: yup.number().required(),
  }),
});

const EventForm = ({ defaultValues, onSubmit }: Props): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    control,
    register,
    clearErrors,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: defaultValues ?? {
      name: '',
      description: '',
      startDate: null,
      endDate: null,
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
      <Grid container>
        <Grid item xs={12} className={classes.fieldRow}>
          <TextField
            id="name-input"
            label={t(tKeys.NAME)}
            name="name"
            autoComplete="off"
            error={!!errors.name}
            helperText={errors.name ? t(tKeys.ERROR) : ''}
            inputProps={register('name')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} className={classes.fieldRow}>
          <TextField
            id="description-input"
            label={t(tKeys.DESCRIPTION)}
            name="description"
            autoComplete="off"
            error={!!errors.description}
            helperText={errors.description ? t(tKeys.ERROR) : ''}
            inputProps={register('description')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} className={classes.fieldRow}>
          <Controller
            control={control}
            name="startDate"
            render={({
              field: { onChange, ref, value },
              fieldState: { error },
            }) => (
              <DatePicker
                label={t(tKeys.START)}
                value={value}
                onChange={onChange}
                error={!!error}
                format="dd MMMM yyyy"
                helperText={error ? t(tKeys.ERROR) : ''}
                inputProps={{ ref }}
                clearable
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6} className={classes.fieldRow}>
          <Controller
            control={control}
            name="endDate"
            render={({
              field: { onChange, ref, value },
              fieldState: { error },
            }) => (
              <DatePicker
                label={t(tKeys.END)}
                value={value}
                onChange={onChange}
                error={!!error}
                format="dd MMMM yyyy"
                helperText={error ? t(tKeys.ERROR) : ''}
                inputProps={{ ref }}
                clearable
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} className={classes.fieldRow}>
          <FormLabel>{t(tKeys.LOCATION)}</FormLabel>
          <div ref={mapRef} className={classes.map} />
          {!!errors.location && <p>{t(tKeys.ERROR)}</p>}
        </Grid>
        <Grid item xs={12} className={classes.fieldRow}>
          <Button type="submit">{t(tKeys.SAVE)}</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EventForm;
