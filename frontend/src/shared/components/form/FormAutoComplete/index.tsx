/* eslint-disable no-nested-ternary */
import { Autocomplete, SxProps, TextField } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type IFormAutoComplete = {
  name: string;
  label: string;
  control: Control<any>;
  defaultValue?: any;
  options: any;
  optionLabel?: string;
  multiple?: boolean;
  errors?: FieldError | FieldError[];
  disabled?: boolean;
  margin_type?: 'no-margin' | 'left-margin';
  sx?: SxProps;
};

export function FormAutoComplete({
  multiple,
  options,
  optionLabel,
  control,
  label,
  name,
  defaultValue,
  errors,
  disabled,
  margin_type,
  sx,
}: IFormAutoComplete) {
  const sxFixed = useMemo(() => {
    let marginTop: string | undefined = '1em';
    let marginLeft: string | undefined;

    if (margin_type) {
      marginTop = undefined;
    }

    if (margin_type === 'left-margin') {
      marginLeft = '1em';
    }

    return {
      marginTop,
      marginLeft,
      ...sx,
    };
  }, [margin_type, sx]);

  const getLabel = useCallback<(option: any) => string>(
    (option: any) => {
      if (!optionLabel) {
        return option;
      }

      return option[optionLabel];
    },
    [optionLabel],
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || multiple ? [] : ''}
      render={({ field }) => (
        <Autocomplete
          {...field}
          noOptionsText="Nenhuma Opção"
          filterSelectedOptions
          getOptionLabel={getLabel}
          multiple={multiple}
          options={options}
          disabled={disabled}
          onChange={(_, data) => field.onChange(data)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              name={name}
              error={!!errors}
              helperText={
                errors ? (Array.isArray(errors) ? errors[0].message : errors.message) : ''
              }
              inputProps={{
                ...params.inputProps,
              }}
              sx={sxFixed}
            />
          )}
          fullWidth
        />
      )}
    />
  );
}
