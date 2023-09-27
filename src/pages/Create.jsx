import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Components/UserReducer";
import { IoIosCreate } from "react-icons/io";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const handaleSubmit = (event) => {
    event.preventDefault();
    console.log(name, email);
    if (name.length == 0 || email.length == 0) {
      alert("Please enter name and email");
    } else {
      dispatch(addUser({ id: users[users.length - 1].id + 1, name, email }));
      navigate("/");
    }
  };
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto flex w-96 justify-center items-center">
      <div className="w-52 border bg-base-300 text-slate-500 p-5">
        <form onSubmit={handaleSubmit}>
          <div className="form-control w-full max-w-xs">
            <h3>Add New User</h3>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="enter name"
              className="input input-bordered w-full max-w-xs from-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="enter email"
              className="input input-bordered w-full max-w-xs from-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <button className="btn btn-info">
            <IoIosCreate />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
