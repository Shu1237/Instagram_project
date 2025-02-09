import LeftSideMess from "../message/LeftSideMess";
import RightSideMess from "../message/RightSideMess";
import MiddleSideMess from "../message/middleSideMess";
import LeftSide from "../home/leftSide";
import { useParams } from "react-router-dom";
export default function Message() {
  const { id, idfr } = useParams();

  return (
    <div className="flex flex-row ">
      <div className="flex-[0.05] p-4 max-lg:hidden ">
        <LeftSideMess />
      </div>
      <div className="flex-[0.15] p-2 ">
        <RightSideMess id={id} />
      </div>
      <div className="flex-[0.8]  ">
        <MiddleSideMess id={id} idfr={idfr} />
      </div>
    </div>
  );
}
