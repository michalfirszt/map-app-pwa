import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { tKeys } from '../../constants';
import AddressFields from './AddressFields';

export type RegisterFormFields = {
  notifications: boolean;
  age: number;
  addresses: {
    city: string;
    street: string;
  }[];
};

type Props = {
  defaultValues?: RegisterFormFields;
};

const useStyles = makeStyles(() =>
  createStyles({
    fieldPadding: {
      paddingBottom: '15px',
      paddingTop: '15px',
    },
  })
);

const RegisterForm = ({ defaultValues }: Props): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    defaultValues: defaultValues ?? {
      notifications: false,
      addresses: [{ city: '', street: '' }],
    },
  });

  const { notifications } = watch();

  const onSubmit: SubmitHandler<RegisterFormFields> = (formData) =>
    console.log(formData);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.fieldPadding}>
        <FormControlLabel
          control={<Checkbox color="primary" checked={notifications} />}
          label={t(tKeys.NOTIFICATIONS)}
          onChange={() => setValue('notifications', !notifications)}
        />
      </div>
      <div className={classes.fieldPadding}>
        <TextField
          inputProps={{
            ...register('age', {
              valueAsNumber: true,
              required: true,
              min: notifications ? 18 : 0,
            }),
          }}
          label={t(tKeys.AGE)}
          type="number"
          error={!!errors.age}
          helperText={errors.age ? t(tKeys.ERROR) : ''}
        />
      </div>
      <div className={classes.fieldPadding}>
        <AddressFields control={control} errors={errors} register={register} />
      </div>
      <div className={classes.fieldPadding}>
        <Button type="submit" color="primary" variant="contained">
          {t(tKeys.SAVE)}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
