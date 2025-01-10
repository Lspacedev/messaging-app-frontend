import { useNavigate } from "react-router";
import { MdOutlineGroups2 } from "react-icons/md";
function GrpContainer({ group }) {
  const navigation = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  function goToGroup() {
    navigation(`/home/groups/${group.id}`);
  }
  return (
    <div className="GrpContainer" onClick={goToGroup}>
      <MdOutlineGroups2 fontSize="3rem" />
      <h4>{group && group.groupName}</h4>
      <div>{group && new Date(group.timestamp).toDateString()}</div>
    </div>
  );
}

export default GrpContainer;
