import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PageContext } from "../../context/PageContext";
import { jwtDecode } from "jwt-decode";

export default function AddUser() {
  let navigate = useNavigate();
  let { isAdding, reqID } = useContext(PageContext);

  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  let onSubmit = async (data) => {
    try {
      let res = await axios.post("https://dummyjson.com/users/add", data);
      toast.success("Added");
      navigate("/dashboard/users");
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  let [userdata, setUserData] = useState(null);

  let getUserData = async() => {
    try {
      let res = await axios.get(`https://dummyjson.com/users/${reqID}`);
      console.log(res?.data);
      setUserData(res?.data);
      

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [reqID]);

  useEffect(() => {
    if (userdata) {
      setValue("firstName", userdata?.firstName);
      setValue("lastName", userdata?.lastName);
      setValue("email", userdata?.email);
      setValue("age", userdata?.age);
      setValue("phone", userdata?.phone);
      
    }
  }, [userdata]);

  let onUpdate = async (data) => {
    try {
      let res = await axios.put(`https://dummyjson.com/users/${reqID}`, data);
      console.log("Response data", res?.data);
      toast.success("Updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  return (
    <>
      {isAdding == 0 ? (
        <>
          <div className="d-flex justify-content-between mx-3">
            <h3>Adding user</h3>
          </div>
          <hr />
          <div className="d-flex justify-content-center">
            <form
              className="container shadow-lg p-5 m-5 w-75 rounded-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="exampleInputfirstname">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputfirstname"
                      placeholder="Enter first name"
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
                      placeholder="Enter last name"
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
                      placeholder="Enter email"
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
                      placeholder="Enter age"
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
                      placeholder="Enter phone"
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
                      placeholder="Enter birthdate"
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
              <div className="d-flex justify-content-center mt-5">
                <button className="btn btn-warning w-50">Save</button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between mx-3">
            <h3>Updating user</h3>
          </div>
          <hr />
          <div className="d-flex justify-content-center">
            <form
              className="container shadow-lg p-5 m-5 w-75 rounded-4"
              onSubmit={handleSubmit(onUpdate)}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="exampleInputfirstname">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputfirstname"
                      
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
              <div className="d-flex justify-content-center mt-5">
                <button className="btn btn-warning w-50">Update</button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
