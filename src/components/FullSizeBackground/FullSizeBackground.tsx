import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

type Props = {
  color: 'white' | 'grey';
  children: ReactNode;
};

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    fullScreen: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    },
    whiteBackground: {
      backgroundColor: fade(theme.palette.common.white, 0.7),
    },
    greyBackground: {
      backgroundColor: fade(theme.palette.secondary.main, 0.7),
    },
  })
);

const FullSizeBackground = ({ color, children }: Props) => {
  const classes = useStyle();

  return (
    <div
      className={clsx(
        classes.fullScreen,
        color === 'grey' ? classes.greyBackground : classes.whiteBackground
      )}
    >
      {children}
    </div>
  );
};

export default FullSizeBackground;
