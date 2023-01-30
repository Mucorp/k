import React from 'react';

export interface FormInputProps {
  label?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  id: string;
  checked?: boolean;
  error?: any;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  fieldRef?: any;
}

export default function CheckBox(props: FormInputProps) {
  const {
    label,
    disabled = false,
    id,
    checked = false,
    fieldRef,
    error,
    onChange,
  } = props;

  function isTrue(value: any) {
    if (typeof value === `string`) {
      value = value.trim().toLowerCase();
    }
    switch (value) {
      case true:
      case `true`:
        return true;
      default:
        return false;
    }
  }

  return (
    <div className="">
      <input
        checked={isTrue(checked)}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e)}
        ref={fieldRef}
        type="checkbox"
        id={id}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
