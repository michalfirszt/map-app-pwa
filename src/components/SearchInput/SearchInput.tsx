import { IconButton, InputBase } from '@material-ui/core';
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { tKeys } from '../../constants';

type Props = {
  defaultValue?: string;
  onSearch?: () => void;
};

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      border: `1px solid ${theme.palette.secondary.main}`,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    iconButton: {
      padding: 10,
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);

const SearchInput = ({ defaultValue = '', onSearch }: Props) => {
  const classes = useStyle();
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState<string>(defaultValue);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    [setInputValue]
  );

  const handleOnSearch = useCallback(() => {
    onSearch?.();
  }, [onSearch]);

  return (
    <div className={classes.search}>
      <InputBase
        value={inputValue}
        placeholder={t(tKeys.SEARCH)}
        onChange={handleInputChange}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        onClick={handleOnSearch}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchInput;
