import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { PageContext } from "../../context/PageContext";

interface LoginFormInputs {
  username: string;
  password: string;
}

interface AuthContextType {
  saveUserData: () => void;
}

export default function Login() {

  const { saveUserData } = useContext(PageContext) as AuthContextType;
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", data);
      console.log(res);
      navigate("/dashboard");
      toast.success("Success");
      localStorage.setItem("userToken", res?.data?.accessToken);
      saveUserData();
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  return (
    <div className={`${styles.cont} vh-100`}>
      <form className={styles.formStyle} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.mainHeading}>User Management System</h4>
        <h5>SIGN IN</h5>
        <p>Enter your credentials to access your account</p>

        <div className={`form-group ${styles.groupStyle}`}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className={`form-control ${styles.formCells}`}
            id="username"
            placeholder="Enter username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <span className="text-danger">{errors.username.message}</span>}
        </div>

        <div className={`form-group ${styles.groupStyle}`}>
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            className={`form-control ${styles.formCells}`}
            id="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
        </div>

        <button type="submit" className={`btn btn-warning ${styles.button}`}>
          Submit
        </button>
      </form>
    </div>
  );
}
