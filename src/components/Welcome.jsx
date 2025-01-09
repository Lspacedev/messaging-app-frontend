import { BiSolidMessageRoundedDots } from "react-icons/bi";

function Welcome() {
  return (
    <div className="Welcome">
      <BiSolidMessageRoundedDots className="icon" />

      <div className="title">Welcome to QUIQ</div>
      <div className="text">A simple instant messaging platform</div>
    </div>
  );
}

export default Welcome;
