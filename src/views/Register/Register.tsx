import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Sidebar from '../../components/Sidebar';
import { tKeys } from '../../constants';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
    },
    fieldPadding: {
      paddingBottom: '15px',
      paddingTop: '15px',
    },
  })
);

type FormFields = {
  notifications: boolean;
  age: number;
  addresses: {
    city: string;
    street: string;
  }[];
};

const Register = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      notifications: false,
      addresses: [{ city: '', street: '' }],
    },
  });
  const {
    fields: addressFields,
    append,
    remove,
  } = useFieldArray({
    name: 'addresses',
    control,
  });

  const { notifications } = watch();

  const onSubmit: SubmitHandler<FormFields> = (formData) =>
    console.log(formData);

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <Container>
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
              {addressFields.map((address, index) => (
                <div className={classes.fieldPadding} key={index}>
                  <div className={classes.fieldPadding}>
                    <TextField
                      inputProps={{
                        ...register(`addresses.${index}.city` as const, {
                          required: true,
                        }),
                      }}
                      label={t(tKeys.CITY)}
                      error={!!errors?.addresses?.[index]?.city}
                    />
                  </div>
                  <div className={classes.fieldPadding}>
                    <TextField
                      inputProps={{
                        ...register(`addresses.${index}.street` as const, {
                          required: true,
                        }),
                      }}
                      label={t(tKeys.STREET)}
                      error={!!errors?.addresses?.[index]?.street}
                    />
                  </div>
                  <Button onClick={() => remove(index)}>Delete</Button>
                </div>
              ))}
            </div>
            <div className={classes.fieldPadding}>
              <Button onClick={() => append({ city: '', street: '' })}>
                {`${t(tKeys.ADD)} ${t(tKeys.ADDRESS)}`}
              </Button>
              <Button type="submit" color="primary" variant="contained">
                {t(tKeys.SAVE)}
              </Button>
            </div>
          </form>
        </Container>
      </main>
    </div>
  );
};

export default Register;
