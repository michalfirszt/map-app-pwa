import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { tKeys } from '../../constants';
import { RegisterFormFields } from './RegisterForm';

type Props = {
  control: Control<RegisterFormFields>;
  errors: FieldErrors<RegisterFormFields>;
  register: UseFormRegister<RegisterFormFields>;
};

const useStyles = makeStyles(() =>
  createStyles({
    fieldPadding: {
      paddingBottom: '15px',
      paddingTop: '15px',
    },
  })
);

const AddressFields = ({ control, errors, register }: Props): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    name: 'addresses',
    control,
  });

  return (
    <div>
      <div>
        <Button type="button" onClick={() => append({ city: '', street: '' })}>
          {`${t(tKeys.ADD)} ${t(tKeys.ADDRESS)}`}
        </Button>
      </div>
      <div>
        {fields.map((address, index) => (
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
            <Button type="button" onClick={() => remove(index)}>
              {t(tKeys.DELETE)}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressFields;
