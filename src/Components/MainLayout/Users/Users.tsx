import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Preloader from "../../Preloader/Preloader";
import { PageContext } from "../../context/PageContext";
import styles from "./Users.module.css";


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

export default function Users() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null); 
  const [show, setShow] = useState<boolean>(false);

  const { changeAddPage, setID } = useContext(PageContext) || {}; 

  const navigate = useNavigate();


  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://dummyjson.com/users");
      setUsers(res?.data?.users || []); 
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const moveToAddUser = (num: number) => {
    if (changeAddPage) {
      changeAddPage(num);
      navigate("/dashboard/add-user");
    }
  };


  const movetoUpdateUser = (user: UserData, num: number) => {
    if (changeAddPage && setID) {
      changeAddPage(num);
      setID(Number(user.id)); 
      navigate("/dashboard/add-user");
    }
  };


  const handleShow = (user: UserData) => {
    setShow(true);
    setUserData(user);
    setUserID(user.id);
  };


  const handleClose = () => setShow(false);


  const deleteUsers = async () => {
    if (userID) {
      try {
        const res = await axios.delete(`https://dummyjson.com/users/${userID}`);
        console.log(res);
        handleClose();
        toast.success("Deleted");
      } catch (error) {
        console.log(error);
        toast.error("Failed");
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <div className="d-flex justify-content-between mx-3">
            <h3>Users list</h3>
            <button className="btn btn-warning" onClick={() => moveToAddUser(0)}>
              Add User
            </button>
          </div>
          <hr />
          <div className="d-none d-md-block">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Birth Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td className="d-flex justify-content-center align-items-center">
                      <img src={user.image} alt="image" className="w-25"/>
                    </td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.birthDate}</td>
                    <td>
                      <FaRegEdit
                        size={25}
                        className="text-warning ms-2 me-3 cursor-pointer"
                        onClick={() => movetoUpdateUser(user, 1)}
                      />
                      <MdOutlineDelete
                        onClick={() => handleShow(user)}
                        size={25}
                        className="text-warning cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          
          <div className="d-block d-md-none">
            {users.map((user) => (
              <div key={user.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <img src={user.image} alt="image" className={`w-25 ${styles.imageFit}`} />
                    <div>
                      <h5>{user.firstName} {user.lastName}</h5>
                      <p>{user.email}</p>
                      <p>{user.phone}</p>
                      <p>{user.birthDate}</p>
                      <div className="d-flex justify-content-between">
                        <FaRegEdit
                          size={25}
                          className="text-warning ms-2 me-3 cursor-pointer"
                          onClick={() => movetoUpdateUser(user, 1)}
                        />
                        <MdOutlineDelete
                          onClick={() => handleShow(user)}
                          size={25}
                          className="text-warning cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You will delete {userData?.firstName} {userData?.lastName}, Are you sure?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="warning" onClick={() => deleteUsers()}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
