import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { LOGIN_MUTATION } from "../../../graphql/Mutations";
import LoginForm, { LoginFormValues } from "../components/LoginForm";

const useStyles = makeStyles(() => ({
  wrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      localStorage.setItem("access_token", login.access_token);
      history.push("/");
    },
  });
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      login({
        variables: {
          input: {
            username: values.username,
            password: values.password,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.wrapper}>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
