import { FormHelperText, InputAdornment } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import { Controller, UseFormMethods } from "react-hook-form";

interface PasswordFieldProps {
  form: UseFormMethods<any>;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
  const { form, name, disabled, placeholder, startIcon } = props;
  const { errors } = form;
  const hasError = !!errors[name];
  const [isHidden, setIsHidden] = useState(false);

  const handleClickShowPassword = () => {
    setIsHidden((prev) => !prev);
  };
  return (
    <FormControl fullWidth variant="outlined" margin="normal" error={hasError}>
      <Controller
        name={name}
        control={form.control}
        as={<OutlinedInput />}
        id={name}
        placeholder={placeholder}
        type={isHidden ? "text" : "password"}
        startAdornment={
          <InputAdornment position="start">{startIcon}</InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {isHidden ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        error={hasError}
        disabled={disabled}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
};

export default PasswordField;
