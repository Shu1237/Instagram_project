import { useParams } from "react-router-dom";
import Avatar from "../../assets/profilepic.png";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ICon from '../comment/iconPick'
const MiddleSideMess = ({ id, idfr }) => {

    return (
        // <div className="h-screen flex items-center justify-center p-2">
        //     {/* header */}
        //     {/* PHAN NAY K XOA */}

        //     {/* <div className="flex flex-col items-center w-full max-w-sm text-center justify-center">
        //                 <div>
        //                     <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96">
        //                         <title></title>
        //                         <path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path>
        //                     </svg>
        //                 </div>
        //                 <h1 className="text-lg font-semibold mt-2">Your messages</h1>
        //                 <span className="text-gray-500">Send a message to start a chat.</span>
        //                 <button className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 transition">
        //                     Send message
        //                 </button>
        //             </div> */}


        // </div>






        <>
            <div className=" w-full h-full flex flex-col justify-between  ">
                {/* header */}
                <div className="flex flex-row justify-between items-center border-b border-gray-300 py-3  ">
                    <div className=" flex flex-row gap-4 items-center p-2">
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full border-2 border-white ring-1 ring-gray-200 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover"
                                    src={Avatar}
                                    alt="User"
                                />
                            </div>
                            {/* Online status indicator */}
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </div>

                        {/* User info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-800 truncate">
                                    Minh Nghi Nguyen
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1" />
                                Active 7m ago
                            </p>
                        </div>
                    </div>
                    {/* icon */}
                    <div className=" flex flex-row gap-4 mr-2">
                        <div>
                            <svg aria-label="Audio call" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Audio call</title><path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path></svg>
                        </div>
                        <div>
                            <svg aria-label="Video call" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Video call</title><rect fill="none" height="18" rx="3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="16.999" x="1" y="3"></rect><path d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                        </div>
                        <div>
                            <svg aria-label="Conversation information" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Conversation information</title><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><circle cx="11.819" cy="7.709" r="1.25"></circle><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line><polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
                        </div>
                    </div>

                </div>
                  {/* body */}  
                <div className="flex flex-col items-center  ">
                    <div className="w-24 h-24 mt-6">
                        <img className="w-full h-full rounded-[50%]" src={Avatar} alt="" />
                    </div>
                    <h1 className=" mt-2 text-lg font-medium">Minh Nghi Nguyen</h1>
                    <p className="text-base text-gray-400">nm.jhi · Instagram</p>
                    <div className="m-5">
                        <button className="bg-gray-200 p-[5px_12px] rounded-md text-sm font-medium">
                            View Profile
                        </button>
                    </div>
                </div>
                {/* buttomsection */}
                <div className="p-4 mt-auto flex flex-col ">
                    <div className="flex flex-row items-center bg-white border-2 border-gray-300 rounded-3xl hover:border-gray-400 focus-within:border-blue-500 transition-colors group">
                        <div className="pl-3 text-gray-500">
                            <ICon />
                        </div>
                        <div className="flex-1 px-2 py-2">
                            <input
                                className="w-full outline-none placeholder-gray-500 text-gray-700 bg-transparent"
                                placeholder="Message..."
                            />
                        </div>
                        <div className="flex items-center gap-3 pr-3 text-gray-600">

                            <button className="p-1 hover:text-blue-500 transition-colors">
                                <svg aria-label="Voice Clip" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Voice Clip</title><path d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19.068" y2="22"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="8.706" x2="15.104" y1="22" y2="22"></line><path d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                            </button>
                            <button className="p-1 hover:text-blue-500 transition-colors">
                                <svg aria-label="Add Photo or Video" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Add Photo or Video</title><path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fill-rule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                            </button>
                            <button className="p-1 hover:text-blue-500 transition-colors">
                                <svg aria-label="Choose a GIF or sticker" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Choose a GIF or sticker</title><path d="M13.11 22H7.416A5.417 5.417 0 0 1 2 16.583V7.417A5.417 5.417 0 0 1 7.417 2h9.166A5.417 5.417 0 0 1 22 7.417v5.836a2.083 2.083 0 0 1-.626 1.488l-6.808 6.664A2.083 2.083 0 0 1 13.11 22Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><circle cx="8.238" cy="9.943" r="1.335"></circle><circle cx="15.762" cy="9.943" r="1.335"></circle><path d="M15.174 15.23a4.887 4.887 0 0 1-6.937-.301" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M22 10.833v1.629a1.25 1.25 0 0 1-1.25 1.25h-1.79a5.417 5.417 0 0 0-5.417 5.417v1.62a1.25 1.25 0 0 1-1.25 1.25H9.897" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                            </button>
                            <button className="p-1 hover:text-blue-500 transition-colors">
                                <svg aria-label="Like" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>








        </>



    );
};

export default MiddleSideMess;
