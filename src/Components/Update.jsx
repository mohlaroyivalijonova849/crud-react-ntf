import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "./UserReducer";

function Update() {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const existingUser = users.filter((f) => f.id == id);
  const { name, email, country, color, company, jobTitle } = existingUser[0];
  const [uname, setName] = useState(name);
  const [uemail, setEmail] = useState(email);
  const [ucountry, setCountry] = useState(country);
  const [ucolor, setColor] = useState(color);
  const [ucompany, setCompany] = useState(company);
  const [uJobTitle, setJobTitle] = useState(jobTitle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(
      updateUser({
        id: id,
        name: uname,
        email: uemail,
        country: ucountry,
        color: ucolor,
        company: ucompany,
        jobTitle: uJobTitle,
      })
    );
    navigate("/");
  };
  return (
    <div className="mainModal">
      <div className="modalBox">
        <form onSubmit={handleUpdate}>
          <div className="form-control w-full mb-4">
            <h3 className="text-white">Update User</h3>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="enter name"
              className="input input-bordered w-full from-control"
              value={uname}
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
              value={uemail}
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
              value={ucountry}
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
              value={ucompany}
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
              value={uJobTitle}
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
              value={ucolor}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <br />
          <button
            className="btn btn-info"
            onClick={() => modalRef.current.showModal()}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
