
import LeftSide from '../home/leftSide'
import MiddleSide from '../dashboard/middleSide'
import RightSide from '../dashboard/rightSide'
const dashBoardPage = () => {
    return (
        <div className="flex flex-row ">
            <div className='flex-[0.2]  max-xl:flex-[0.08]'>
                <LeftSide />
            </div>
            <div className='flex-[0.25]  border-x p-7 max-xl:flex-[0.42]   '>
                <MiddleSide />
            </div>

            <div className='flex-[0.55] p-8  max-xl:flex[0.5]     '>
                <RightSide />

            </div>

        </div>
    )
}
export default dashBoardPage