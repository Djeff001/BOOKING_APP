import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import "./reserve.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading } = useFetch("/hotels/room/" + hotelId);
  const { dates } = useContext(SearchContext);
  const { dispatch } = useContext(AuthContext);

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const navigate = useNavigate();
  const isAailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => {
      return alldates.includes(new Date(date).getTime());
    });

    return !isFound;
  };

  const handleClick = async () => {
    if (!document.cookie) {
      dispatch({ type: "LOGOUT" });
      setOpen(false);
      navigate("/login");
    }
    // promise used when we call map function
    else {
      try {
        await Promise.all(
          selectedRooms.map((roomId) => {
            return axios.put("/rooms/availability/" + roomId, {
              dates: alldates,
            });
          })
        );
        setOpen(false);
        navigate("/");
      } catch (err) {}
    }
  };

  return (
    <div className="reserve">
      {loading ? (
        "Wait for loading"
      ) : (
        <div className="rContainer">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rClose"
            onClick={() => setOpen(false)}
          />
          <span>Select your room:</span>
          {data.map((room) => {
            return (
              <div className="rItem" key={room._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{room.title}</div>
                  <div className="rDesc">{room.desc}</div>
                  <div className="rMax">
                    Max people: <b>{room.maxPeople}</b>
                  </div>
                  <div className="rPrice">{room.price}</div>
                </div>
                <div className="rSelectRooms">
                  {room.roomNumbers.map((roomNumber) => {
                    return (
                      <div className="room" key={roomNumber._id}>
                        <label>{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={handleSelect}
                          disabled={!isAailable(roomNumber)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button onClick={handleClick} className="rButton">
            Reserve Now!
          </button>
        </div>
      )}
    </div>
  );
};

export default Reserve;
