import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteUser } from "../Components/UserReducer";
import { BiSolidEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import { addUser } from "../Components/UserReducer";

function Home() {
  const users = useSelector((state) => state.users);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [color, setColor] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    // Check if the showModal state is present in the location state
    if (location.state && location.state.showModal === "my_modal_3") {
      modalRef.current.showModal();
    }
  }, [location.state]);
  useEffect(() => {
    if (users.length > 0) {
      setName("");
      setEmail("");
      setCountry("");
      setColor("");
      setCompany("");
      setJobTitle("");
    }
  }, [users]);

  const handaleSubmit = (event) => {
    event.preventDefault();
    if (
      name.length == 0 ||
      email.length == 0 ||
      company.length == 0 ||
      country.length == 0 ||
      color.length == 0 ||
      jobTitle.length == 0
    ) {
      alert("Please fill out all fields");
    } else {
      dispatch(
        addUser({
          id: users[users.length - 1].id + 1,
          name,
          email,
          country,
          color,
          company,
          jobTitle,
        })
      );
      modalRef.current.close();
      navigate("/");
    }
  };
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(
      deleteUser({
        id: id,
      })
    );
  };
  return (
    <div className="container mx-auto flex flex-col pt-28 items-center justify-center">
      <div className="flex gap-6">
        <h2 className="text-slate-500 pt-6">Crud App with Json Server</h2>
        <button
          className="btn btn-primary my-3"
          onClick={() => modalRef.current.showModal()}
        >
          Create+
        </button>
        <dialog id="my_modal_3" className="modal" ref={modalRef}>
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handaleSubmit}>
              <div className="form-control w-full mb-4">
                <h3 className="text-3xl pb-4">Add New User</h3>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="enter name"
                  className="input input-bordered w-full from-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4">
                <label htmlFor="name">Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="enter email"
                  className="input input-bordered w-full from-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  name="country"
                  placeholder="enter country"
                  className="input input-bordered w-full from-control"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4">
                <label htmlFor="company">Company:</label>
                <input
                  type="text"
                  name="company"
                  placeholder="enter company"
                  className="input input-bordered w-full from-control"
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4">
                <label htmlFor="jobTitle">Job Title:</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="enter job title"
                  className="input input-bordered w-full from-control"
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  name="color"
                  placeholder="enter color"
                  className="input input-bordered w-full from-control"
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <br />
              <button className="btn btn-success w-full">Create</button>
            </form>
          </div>
        </dialog>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.country}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.company}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.jobTitle}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-x-2">
                    <div
                      className="w-[30px] h-[30px] rounded-full"
                      style={{ background: `${user.color}` }}
                    ></div>{" "}
                    <span className="text-[16px]">{user.color}</span>
                  </div>
                </td>
                <td className="gap-9 flex items-center">
                  <Link
                    to={`/edit/${user.id}`}
                    className="btn btn-primary btn-sm "
                  >
                    <BiSolidEditAlt />
                  </Link>
                  <Link
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-secondary ms-2 "
                  >
                    <AiFillDelete />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
