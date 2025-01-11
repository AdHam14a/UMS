import axios from "axios";
import { useContext, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { PageContext } from "../../context/PageContext";
import styles from "./Profile.module.css";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: number;
  birthDate: string;
  image?: string;
}

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: number;
  birthDate: string;
}

export default function Profile() {
  const {
      register,
      formState: { errors },
      setValue,
  } = useForm<UserFormData>();
  
  const { userData } = useContext(PageContext) || {};

  const [data, getData] = useState(null);

  const getUserData = async () => {
    try {
      const res = await axios.get<UserData>(`https://dummyjson.com/user/${userData?.id}`);
      console.log(res?.data);
      getData(res?.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const formatDateString = (dateString: string): string => {
    console.log(dateString);
    const [year, month, day] = dateString.split('-').map(Number);
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    return `${year}-${pad(month)}-${pad(day)}`;
  };

  useEffect(() => {
    if (userData?.id) {
      getUserData();
    }
  }, [userData]);
  
  useEffect(() => { 
    console.log(userData);
    if (data) {
      console.log(data.firstName);
      console.log(data.lastName);
      console.log(data.email);
      console.log(data.phone);
      console.log(data.birthDate);
      console.log(data.age);
      
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("email", data.email);
      setValue("phone", data.phone);
      setValue("birthDate", formatDateString(data.birthDate));
      setValue("age", data.age);
    }
  }, [data]);

  return (
    <>
      <h4 className="m-3">Profile</h4>
      <hr />
      <div className="d-flex justify-content-center">
        <form className={`container shadow-lg p-5 m-5 w-75 rounded-4 ${styles.formLayout}`}>
          <div className={styles.imgDiv}>
            <img src={userData?.image} />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputfirstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputfirstname"
                  readOnly
                  {...register("firstName", {
                    required: "first name is required",
                  })}
                />
                {errors.firstName && (
                      <span className="text-danger">
                        {errors.firstName.message}
                      </span>
                    )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group  mb-3">
                <label htmlFor="exampleInputLastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputLastname"
                  readOnly
                  {...register("lastName", {
                    required: "last name is required",
                  })}
                />
                {errors.lastName && (
                      <span className="text-danger">
                        {errors.lastName.message}
                      </span>
                    )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail"
                  readOnly
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputAge">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputAge"
                  readOnly
                  {...register("age", {
                    required: "age is required",
                    max: {
                      value: 50,
                      message: "Max age is 50",
                    },
                    min: {
                      value: 5,
                      message: "Min age is 5",
                    },
                  })}
                />
                {errors.age && (
                      <span className="text-danger">{errors.age.message}</span>
                    )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleInputPhone">Phone number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="exampleInputPhone"
                  readOnly
                  {...register("phone", { required: "phone is required" })}
                />
                {errors.phone && (
                      <span className="text-danger">
                        {errors.phone.message}
                      </span>
                    )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleInputBirthdate">Birthdate</label>
                <input
                  type="date"
                  className="form-control"
                  id="exampleInputBirthdate"
                  readOnly
                  {...register("birthDate", {
                    required: "birth date is required",
                  })}
                />
                {errors.birthDate && (
                      <span className="text-danger">
                        {errors.birthDate.message}
                      </span>
                    )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
