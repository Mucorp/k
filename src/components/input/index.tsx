import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps as MuiButtonProps } from '@mui/material/TextField';
import { Box } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl, { useFormControl } from '@mui/material/FormControl';

export interface FormInputProps {
  label?: string;
  type?: string;
  size?: MuiButtonProps['size'];
  variant?: MuiButtonProps['variant'];
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  maxLength?: number;
  style?: any;
  value?: string;
  id?: string;
  error?: any;
  showPassword?: boolean;
  showCount?: boolean;
  pattern?: any;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function TextInput(props: FormInputProps) {
  const {
    label,
    type = `text`,
    fullWidth = false,
    disabled = false,
    multiline = false,
    error,
    id = ``,
    value = ``,
    rows = 1,
    maxRows = 4,
    onChange,
    showPassword,
    showCount = false,
    maxLength = 255,
    pattern,
  } = props;

  const [focused, setFocused] = useState(false);
  const [count, setCount] = useState(0);

  function CharCount() {
    const helperText = React.useMemo(() => {
      if (focused) {
        return (
          <span className="ml-auto">
            {count}/{maxLength}
          </span>
        );
      }

      return ``;
    }, [focused]);

    return (
      <small className="absolute right-0 -bottom-4 flex justify-end text-gray-700">
        {helperText}
      </small>
    );
  }

  return (
    <Box>
      <FormControl className="w-full">
        <TextField
          value={value}
          error={error ? true : false}
          label={label}
          id={id}
          disabled={disabled}
          fullWidth={fullWidth}
          variant={`outlined`}
          multiline={multiline}
          rows={rows || 1}
          maxRows={maxRows}
          onChange={(e) => {
            onChange && onChange(e);
            setCount(e.target.value.length);
          }}
          type={type == `password` && showPassword ? `password` : type}
          size="small"
          onFocus={(e) => {
            setFocused(true);
            setCount(e.target.value.length);
          }}
          onBlur={(e) => setFocused(false)}
          inputProps={{
            maxLength: maxLength,
            pattern: pattern,
          }}
        />
        {showCount && <CharCount />}
      </FormControl>
    </Box>
  );
}
