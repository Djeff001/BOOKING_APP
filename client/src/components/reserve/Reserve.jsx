import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading } = useFetch("/hotels/room/6301009bea826608f652b333");

  const handleSelect = () => {};
  return (
    <div className="reserve">
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
              {room.roomNumbers.map((roomNumber) => {
                return (
                  <div className="room">
                    <label>{roomNumber.number}</label>
                    <input
                      type="select"
                      value={roomNumber._id}
                      onChange={handleSelect}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reserve;
