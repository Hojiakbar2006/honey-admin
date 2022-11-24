import view from "../../Assets/Images/view.svg";
import { useNavigate } from "react-router-dom";

export function Notification({ open, setOpen, data }) {
  const navigate = useNavigate();

  return (
    <div
      className={open ? " NotifModalCard open" : "NotifModalCard"}
      onClick={() => setOpen(!open)}
    >
      <div className={open ? "openNOtif notifModal1" : "notifModal1"}>
        <button onClick={()=>navigate("/order")}>You have {data.length} orders</button>
        {data.map((item, index) => {
          return (
            <div key={index} onClick={() => navigate(`order_view/${item.id}`)}>
              <div>
                <h2>{item.name}</h2>
                <p>{item.phone}</p>
              </div>
              <img width="30px" src={view} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
