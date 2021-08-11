import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { ReactNode, useCallback, useReducer } from 'react';
import { useTranslation } from 'react-i18next';

import { tKeys } from '../../constants';

type Props = {
  children: ReactNode;
  dialogContent: JSX.Element;
  onClose?: () => void;
  onOpen?: () => void;
};

type Actions = { type: 'setIsOpen'; payload: boolean };

const reducer = (state: any, { type, payload }: Actions) => {
  switch (type) {
    case 'setIsOpen': {
      return { ...state, isOpen: payload };
    }
  }
};

const useStyles = makeStyles(() =>
  createStyles({
    dialog: {
      width: '500px',
    },
  })
);

const DialogItem = ({
  children,
  dialogContent,
  onClose,
  onOpen,
}: Props): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [{ isOpen }, dispatch] = useReducer(reducer, { isOpen: false });

  const handleClickOpen = useCallback(() => {
    dispatch({ type: 'setIsOpen', payload: true });

    onOpen?.();
  }, [dispatch, onOpen]);

  const handleClose = useCallback(() => {
    dispatch({ type: 'setIsOpen', payload: false });

    onClose?.();
  }, [dispatch, onClose]);

  return (
    <>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog open={isOpen}>
        <DialogContent className={classes.dialog}>
          {dialogContent}
          <DialogActions>
            <Button onClick={handleClose}>{t(tKeys.CANCEL)}</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogItem;
