/* eslint-disable no-useless-escape */
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import MailIcon from "@material-ui/icons/Mail";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useHistory } from "react-router-dom";
import InputField from "../../../components/form-control/InputField";
import PasswordField from "../../../components/form-control/PasswordField";
const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(2, 0),
  },
}));

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Please enter your email.")
    .min(6, "Please enter at least 6 characters.")
    .max(35, "Please enter at most 35 characters"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Please enter at least 6 characters.")
    .max(30, "Please enter at most 30 characters"),
});

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => any;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const classes = useStyles();
  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  return (
    <Container component="main" maxWidth="xs">
      <Box border="1px solid #bdbdbd" borderRadius="24px" padding="32px 48px">
        <Typography variant="subtitle1">Bullo app</Typography>
        <Typography variant="subtitle2">
          Join to discover thousands of photos from around the world
        </Typography>
        <Typography variant="subtitle1">
          Beautiful, free images and photos that you can download and use for
          any project.
        </Typography>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputField
            name="username"
            placeholder="Your Email*"
            startIcon={<MailIcon />}
            form={form}
          />
          <PasswordField
            name="password"
            placeholder="Your password*"
            startIcon={<LockIcon />}
            form={form}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login now
          </Button>
          <Typography variant="subtitle1" align="center">
            Not registered yet?
            <Link to="/auth/register">Register</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
