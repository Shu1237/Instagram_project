import LeftSideActivity from "../home/leftSide";
import RightSideActivity from "../tracking_activity/rightSideActivity";
import { useParams } from "react-router-dom";
const TrackingActivity = () => {
    const { status } = useParams();
    return (
       <RightSideActivity status={status} />
    )
}
export default TrackingActivity;
