import LeftSide from '../home/leftSide';
import RightSideProfile from '../profile/rightSideProfile';
// import '../css/profile.css'
import { useParams } from 'react-router-dom';


export default function Profile(){
    const {id}=useParams();
return(
    <div className='font-montserrat p-0 m-0 box-border flex'>
        <div className="p-[25px_10px] flex-[0.15]">
            <LeftSide />
        </div>
        <div className="flex-[0.85] border-l border-gray-300">
            <RightSideProfile id={id} />
        </div>

      
    </div>
)


}