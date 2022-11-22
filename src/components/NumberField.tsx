import { InputAdornment, styled, TextField } from "@mui/material";
import React from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

export interface NumberFieldProps {
  value?: number | null;
  onChange?: (value: number | undefined) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  adornment?: React.ReactNode;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const StyledTextInput = styled(TextField)`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    display: none;
  }
`;
export const NumberField = (props: NumberFieldProps) => {
  return (
    <StyledTextInput
      disabled={props.disabled}
      label={props.label}
      type="number"
      size="small"
      inputProps={{ min: props.min, max: props.max, step: props.step }}
      value={
        props.value?.toFixed((props.step?.toString().length ?? 2) - 2) ?? ""
      }
      onChange={(event) => {
        const parsed = Number.parseInt(
          (event.target as HTMLTextAreaElement).value
        );
        props.onChange && props.onChange(isNaN(parsed) ? undefined : parsed);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{props.adornment}</InputAdornment>
        ),
      }}
      sx={{ backgroundColor: "white", borderRadius: 1, mx: 1, ...props.sx }}
    />
  );
};
