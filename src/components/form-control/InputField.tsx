import {
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller } from "react-hook-form";

interface InputFieldProps {
  form: any;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  startIcon?: any;
  endIcon?: any;
  size?: string;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const {
    form,
    name,
    disabled,
    placeholder,
    startIcon,
    label,
    size,
    endIcon,
  } = props;
  const { errors } = form;
  const hasError = !!errors[name];
  return (
    <FormControl fullWidth margin="normal" error={hasError}>
      <Typography variant="h6" color="initial">
        {label}
      </Typography>
      <Controller
        name={name}
        control={form.control}
        as={<TextField />}
        variant="outlined"
        error={hasError}
        disabled={disabled}
        placeholder={placeholder}
        size={size}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ),
        }}
        helperText={errors[name]?.message}
      />
    </FormControl>
  );
};

export default InputField;
