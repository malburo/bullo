import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { REGISTER_MUTATION } from "../../../graphql/Mutations";
import RegisterForm, { RegisterFormValues } from "../components/RegisterForm";

const useStyles = makeStyles(() => ({
  wrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [register] = useMutation(REGISTER_MUTATION, {
    onCompleted: ({ register }) => {
      localStorage.setItem("access_token", register.access_token);
      history.push("/");
    },
  });
  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      register({
        variables: {
          input: {
            fullname: values.fullname,
            username: values.username,
            email: values.email,
            password: values.password,
          },
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.wrapper}>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Register;
