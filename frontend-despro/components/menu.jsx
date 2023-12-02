import { useNavigate } from 'react-router-dom';

function Menu(){
 const navigate = useNavigate();
 const to_crowd = () => {
    navigate("/crowd_monitor");
 }

 const to_announce = () => {
    console.log("To be announced");
    navigate("/past_crowd_monitor");
 }
 return(
    <>
    <div className='max-md:h-screen max-md:my-auto max-md:flex-col max-md:flex max-md:justify-center'>
    <div className='flex justify-center mt-5'>
        <div className="shadow-md rounded p-6 bg-white w-[80%] text-center">
            <h2 className="text-xl font-semibold mt-4">Halte Monitoring</h2>
            <img className="rounded mx-auto" src="https://cdn-icons-png.flaticon.com/512/2109/2109108.png" alt="Image"></img>
            {/* <p className="mt-2">Description</p> */}
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Button
            </button> */}
            {/* <div className='flex justify-center'>
                <Button className='mt-4 hover:active:text-black hover:active:bg-black'>Login gan </Button>
            </div> */}
        </div>
    </div>

    <div className='flex justify-center mt-4'>
        <div className="shadow-md rounded p-6 bg-white w-[80%] flex items-center transition-transform transform-gpu hover:scale-105 hover:cursor-pointer" onClick={to_crowd}>
        <i className="fa fa-users mr-4"></i>
            <p className="mt-2 mx-auto">Crowd Monitor</p>
        </div>
    </div>

    <div className='flex justify-center mt-4'>
        <div className="shadow-md rounded p-6 bg-white w-[80%] flex items-center transition-transform transform-gpu hover:scale-105 hover:cursor-pointer" onClick={to_announce}>
        <i className="fa fa-users mr-4"></i>
            <p className="mt-2 mx-auto">Past Crowd Monitor</p>
        </div>
    </div>

    {/* <div className='flex justify-center mt-4 hover:cursor-pointer transition-transform transform-gpu hover:scale-105' onClick={to_crowd}>
        <div className="shadow-md rounded p-6 bg-white w-[80%] flex items-center">
        <i className="fa fa-users mr-4"></i>
            <p className="mt-2 mx-auto">Past Crowd Monitor</p>
        </div>
    </div> */}

    <div className='flex justify-center mt-4'>
        <div className="shadow-md rounded p-6 bg-white w-[80%] flex items-center transition-transform transform-gpu hover:scale-105 hover:cursor-pointer"> 
        <i className="fa fa-bus mr-4"></i>
            <p className="mt-2 mx-auto">Bus Tracker</p>
        </div>
    </div>
    </div>
    </>
 )
}

export {Menu}