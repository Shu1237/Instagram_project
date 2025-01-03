import LeftSide from '../jsx/leftSide';
import RightSideProfile from '../jsx/rightSideProfile';
// import '../css/profile.css'


export default function Profile(){
return(
    <div className='font-montserrat p-0 m-0 box-border flex'>
        <div className="p-[25px_10px] flex-[0.15]">
            <LeftSide />
        </div>
        <div className="flex-[0.85] border-l border-gray-300">
            <RightSideProfile />
        </div>

      
    </div>
)


}