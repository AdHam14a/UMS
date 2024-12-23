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

export default function Users() {
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(false);
  let getUsers = async () => {
    try {
      setLoading(true);
      let res = await axios.get("https://dummyjson.com/users");
      setUsers(res?.data?.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  let { changeAddPage , user_ID } = useContext(PageContext);

  let navigate = useNavigate();
  let moveToAddUser = (num) => {
    changeAddPage(num);
    console.log("from add button")
    navigate("/dashboard/add-user");
  };

  let { setID } = useContext(PageContext);

  let movetoUpdateUser = (user,num) => {
    changeAddPage(num);
    setID(user.id);
    console.log("from update button")
    navigate("/dashboard/add-user");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState(null);
  const handleShow = (user) => {
    setShow(true);
    setUserData(user);
    setUserID(user.id);
  };
  let deleteUsers = async () => {
    try {
      let res = await axios.delete(`https://dummyjson.com/users/${userID}`);
      console.log(res);
      handleClose();
      toast.success("Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed");
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
            <button className="btn btn-warning" onClick={()=>moveToAddUser(0)}>
              Add User
            </button>
          </div>
          <hr />
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
                <>
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td className="d-flex justify-content-center align-align-items-center">
                      <img src={user.image} alt="image" className="w-25" />
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
                        onClick={() => movetoUpdateUser(user,1)}
                      />
                      <MdOutlineDelete
                        onClick={() => handleShow(user)}
                        size={25}
                        className="text-warning cursor-pointer"
                      />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You will delete {userData?.firstName} {userData?.lastName}, Are
              you sure?
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
