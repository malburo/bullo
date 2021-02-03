import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

interface Props {
  form: any;
  name: string;
  label?: string;
  disabled?: boolean;
}
const InputField: React.FC<Props> = (props) => {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = !!errors[name];
  return (
    <Controller
      as={<TextField />}
      control={form.control}
      name={name}
      label={label}
      disabled={disabled}
      fullWidth
      variant="outlined"
      margin="normal"
      error={hasError}
      helperText={errors[name]?.message}
    />
  );
};

export default InputField;
