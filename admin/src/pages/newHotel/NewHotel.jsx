import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/rooms");
  const [hotelInfo, setHotelInfo] = useState({});
  const [rooms, setRooms] = useState({});

  const handleChange = (e) => {
    setHotelInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const selectedRooms = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(selectedRooms);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgRooms = [];
    for (let i = 0; i < files.length; i++) {
      imgRooms.push(URL.createObjectURL(files[i]));
    }
    const newHotel = {
      ...hotelInfo,
      rooms, //don't need key, then name of variable is the same with key
      photos: imgRooms,
    };
    try {
      await axios.post("/Hotels", newHotel);
      navigate("/hotels");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "Loading"
                    : data &&
                      data.map((room) => {
                        return (
                          <option value={room._id} key={room._id}>
                            {room.title}
                          </option>
                        );
                      })}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
