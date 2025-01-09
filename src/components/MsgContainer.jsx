import { useNavigate } from "react-router";
import { FaRegEnvelope } from "react-icons/fa";
function MsgContainer({ message }) {
  const navigation = useNavigate();
  let userId = localStorage.getItem("userId");

  function goToMessage() {
    let senderId = message.senderId;
    let receiverId = message.receiverId;
    let id = Number(userId) === senderId ? receiverId : senderId;
    navigation(`/home/inbox/${message.id}`);
  }

  return (
    <div className="MsgContainer" onClick={goToMessage}>
      <h4>
        <FaRegEnvelope className="icon" />
        {message.senderId === Number(userId)
          ? message.receiverUsername
          : message.senderUsername}
      </h4>
      <p>{message && new Date(message.timestamp).toDateString()}</p>
    </div>
  );
}

export default MsgContainer;
