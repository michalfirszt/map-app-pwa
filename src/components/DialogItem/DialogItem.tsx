import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { tKeys } from '../../constants';

type Props = {
  children: ReactNode;
  dialogContent: ReactElement;
  onClose?: () => void;
  onOpen?: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
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
}: Props): ReactElement => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOpen = useCallback(() => {
    setIsOpen(true);

    onOpen?.();
  }, [setIsOpen, onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);

    onClose?.();
  }, [setIsOpen, onClose]);

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
