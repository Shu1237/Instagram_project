import { useState, useEffect } from "react"


export default function MiddileSide() {
    const [click, setClick] = useState(1)
    // const [windowHeight, setWindowHeight] = useState(window.innerHeight-60);

    // useEffect(() => {
    //     const updateWindowHeight = () => {
    //         setWindowHeight(window.innerHeight);
    //     };

    //     window.addEventListener("resize", updateWindowHeight);

    //     return () => {
    //         window.removeEventListener("resize", updateWindowHeight);
    //     };
    // }, []);
    return (
        <div className="cursor-pointer h-auto overflow-hidden scrollbar-hide scroll-smooth">
            <h1 className="font-bold text-2xl mb-4">Setting</h1>
            {/* box */}
            <div className="w-[350] min-h-[350px]  border p-6 shadow-lg rounded-2xl hover:bg-[#F2F2F2] overflow-hidden  mb-4 ">
                <div className=" mb-4 ">
                    <svg aria-label="Facebook wordmark and family of apps logo" className="x1lliihq x1n2onr6 x5n08af " fill="currentColor" height="12" role="img" viewBox="0 0 500 100" width="60"> <title>Facebook wordmark and family of apps logo</title> <defs><linearGradient gradientUnits="userSpaceOnUse" id="b" x1="125" x2="160.217" y1="97" y2="57.435"><stop offset=".21" stopColor="#0278F1"></stop><stop offset=".533" stopColor="#0180FA"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="c" x1="44" x2="0" y1="5" y2="64"><stop offset=".427" stopColor="#0165E0"></stop><stop offset=".917" stopColor="#0180FA"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="d" x1="28.5" x2="135" y1="29" y2="72"><stop stopColor="#0064E0"></stop><stop offset=".656" stopColor="#0066E2"></stop><stop offset="1" stopColor="#0278F1"></stop></linearGradient><clipPath id="a"><path d="M0 0h496.236v100H0z" fill="#fff"></path></clipPath></defs><g clipPath="url(#a)"><path d="M182.141 3.213h18.808l31.98 57.849 31.979-57.849h18.401V98.27h-15.345V25.416l-28.042 50.448h-14.394l-28.042-50.448V98.27h-15.345V3.213ZM332.804 99.967c-7.107 0-13.353-1.573-18.739-4.718-5.387-3.146-9.586-7.504-12.595-13.07-3.011-5.569-4.515-11.95-4.515-19.148 0-7.287 1.47-13.738 4.413-19.35 2.942-5.613 7.027-10.004 12.255-13.173 5.229-3.168 11.238-4.753 18.027-4.753 6.744 0 12.55 1.596 17.416 4.787 4.865 3.191 8.611 7.661 11.237 13.41 2.624 5.749 3.938 12.492 3.938 20.233v4.21h-52.077c.95 5.794 3.292 10.354 7.027 13.68 3.735 3.328 8.453 4.991 14.157 4.991 4.571 0 8.509-.679 11.814-2.037 3.303-1.358 6.404-3.417 9.302-6.178l8.147 9.98c-8.103 7.425-18.038 11.136-29.807 11.136Zm11.204-56.389c-3.215-3.281-7.425-4.923-12.629-4.923-5.07 0-9.314 1.676-12.731 5.025-3.418 3.35-5.58 7.854-6.484 13.512h37.343c-.453-5.794-2.286-10.331-5.499-13.614ZM382.846 40.014h-14.123V27.453h14.123V6.676h14.802v20.777h21.455v12.561h-21.455v31.844c0 5.295.905 9.075 2.716 11.338 1.809 2.264 4.911 3.395 9.302 3.395 1.945 0 3.598-.078 4.956-.237a92.35 92.35 0 0 0 4.481-.646v12.425c-1.675.498-3.564.906-5.669 1.223a44.63 44.63 0 0 1-6.62.475c-15.979 0-23.968-8.735-23.968-26.208V40.014ZM496.236 98.27h-14.53v-9.913c-2.58 3.712-5.862 6.575-9.845 8.588-3.983 2.014-8.51 3.022-13.579 3.022-6.247 0-11.78-1.596-16.601-4.787s-8.612-7.581-11.373-13.172c-2.761-5.59-4.142-11.983-4.142-19.18 0-7.243 1.403-13.648 4.21-19.216 2.806-5.567 6.688-9.935 11.645-13.104 4.956-3.168 10.648-4.753 17.075-4.753 4.844 0 9.189.94 13.037 2.818a25.768 25.768 0 0 1 9.573 7.978v-9.098h14.53V98.27Zm-14.801-46.035c-1.585-4.028-4.085-7.207-7.503-9.54-3.418-2.33-7.367-3.496-11.848-3.496-6.338 0-11.384 2.128-15.141 6.382-3.758 4.255-5.635 10.004-5.635 17.246 0 7.289 1.809 13.06 5.431 17.314 3.621 4.255 8.532 6.382 14.734 6.382 4.571 0 8.645-1.176 12.222-3.53 3.575-2.353 6.155-5.522 7.74-9.506V52.235Z" fill="currentColor"></path><path d="M108 0C95.66 0 86.015 9.294 77.284 21.1 65.284 5.821 55.25 0 43.24 0 18.76 0 0 31.862 0 65.586 0 86.69 10.21 100 27.31 100c12.308 0 21.16-5.803 36.897-33.31 0 0 6.56-11.584 11.072-19.564 1.582 2.553 3.243 5.3 4.997 8.253l7.38 12.414C102.03 91.848 110.038 100 124.551 100c16.659 0 25.931-13.492 25.931-35.034C150.483 29.656 131.301 0 108 0ZM52.207 59.241c-12.759 20-17.172 24.483-24.276 24.483-7.31 0-11.655-6.418-11.655-17.862 0-24.483 12.207-49.517 26.759-49.517 7.88 0 14.465 4.55 24.552 18.991-9.578 14.691-15.38 23.905-15.38 23.905Zm48.153-2.517-8.823-14.715a301.425 301.425 0 0 0-6.884-10.723c7.952-12.274 14.511-18.39 22.313-18.39 16.206 0 29.172 23.863 29.172 53.173 0 11.172-3.659 17.655-11.241 17.655-7.268 0-10.739-4.8-24.537-27Z" fill="#0180FA"></path><path d="M145.586 35H130.66c3.452 8.746 5.478 19.482 5.478 31.069 0 11.172-3.659 17.655-11.241 17.655-1.407 0-2.672-.18-3.897-.631V99.82c1.143.122 2.324.18 3.552.18 16.659 0 25.931-13.492 25.931-35.034 0-10.737-1.774-20.95-4.897-29.966Z" fill="url(#b)"></path><path d="M43.241 0c.254 0 .507.003.759.008v16.36c-.32-.015-.642-.023-.965-.023-14.183 0-26.139 23.782-26.736 47.655H.014C.59 30.87 19.143 0 43.24 0Z" fill="url(#c)"></path><path d="M43.241 0c11.152 0 20.601 5.02 31.502 17.971 3.065 3.828 6.761 8.805 10.716 14.557l.017.025.025-.003a311.041 311.041 0 0 1 6.036 9.459l8.823 14.715c13.798 22.2 17.269 27 24.537 27H125v16.273c-.149.002-.298.003-.448.003-14.513 0-22.522-8.152-36.897-32.207l-7.38-12.414a596.368 596.368 0 0 0-2.294-3.834L78 51.5c-5.5-9-9-14.5-12-18.5l-.05.038c-9.18-12.63-15.47-16.693-22.916-16.693H43V0L43.241 0Z" fill="url(#d)"></path></g></svg>
                </div>
                <div className="flex flex-col gap-4 mb-3">
                    <h1 className="font-bold text-2xl">Account Center</h1>
                    <p className="text-gray-500">
                        Manage your connected experiences and account setting across Meta technologies.
                    </p>
                    <div className="flex flex-row items-center gap-4 text-[#7E6D6D] ">
                        <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title></title><path d="M2.667 22v-1.355a5.271 5.271 0 0 1 5.271-5.271h8.124a5.271 5.271 0 0 1 5.271 5.271V22" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></path><circle cx="12" cy="7.268" fill="none" r="5" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle></svg>
                        <p>Personal details</p>
                    </div>
                    <div className="flex flex-row items-center gap-4 text-[#7E6D6D]">
                        <svg aria-label="" className="w-4 h-4" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16" > <title></title><polyline fill="none" points="16.723 8.93 10.498 15.155 7.277 11.933" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.978"  ></polyline> <path d="M3 13.5a9 9 0 0 0 18 0V4.488A17.848 17.848 0 0 1 12 1.5a17.848 17.848 0 0 1-9 2.988Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.978"  ></path> </svg>

                        <p>Password and security</p>
                    </div>
                    <div className="flex flex-row items-center gap-4 text-[#7E6D6D]">
                        <svg aria-label="" className="w-4 h-4" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16" > <title></title>  <path d="M18.44 1H5.56A4.565 4.565 0 0 0 1 5.561v12.878A4.565 4.565 0 0 0 5.56 23h12.88A4.566 4.566 0 0 0 23 18.44V5.56A4.566 4.566 0 0 0 18.44 1ZM21 18.44A2.564 2.564 0 0 1 18.44 21H5.56A2.563 2.563 0 0 1 3 18.44V5.56A2.563 2.563 0 0 1 5.56 3h12.88A2.564 2.564 0 0 1 21 5.561Z"></path> <path d="M12 16H6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Zm6-10H6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm-1 6H7V8h10Zm1 4h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Z"></path></svg>
                        <p>Ad preferences</p>
                    </div>
                </div>
                <div>
                    <p className="text-blue-500 font-medium">See more in Account Center</p>
                </div>
            </div>
            <div className="flex flex-col " >
                <h1 className="mb-4">How you use Instagram</h1>
                <div onClick={() => setClick(1)} className={`flex flex-row gap-4 h-14 p-4  rounded-xl hover:bg-[#EFEFEF]   ${click === 1 ? 'bg-[#EFEFEF] ' : ' bg-white'}    `}>
                    <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title></title><circle cx="12.004" cy="12.004" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle><path d="M18.793 20.014a6.08 6.08 0 0 0-1.778-2.447 3.991 3.991 0 0 0-2.386-.791H9.38a3.994 3.994 0 0 0-2.386.791 6.09 6.09 0 0 0-1.779 2.447" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></path><circle cx="12.006" cy="9.718" fill="none" r="4.109" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle></svg>
                    <p className="text-lg">Edit Profile</p>

                </div>
                <div onClick={() => setClick(2)} className={`flex flex-row gap-4 h-14 p-4  rounded-xl hover:bg-[#EFEFEF]   ${click === 2 ? 'bg-[#EFEFEF] ' : ' bg-white'}    `}>
                    <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title></title><path d="m21.306 14.019-.484-.852A6.358 6.358 0 0 1 20 9.997a7.953 7.953 0 0 0-4.745-7.302 3.971 3.971 0 0 0-6.51.002 7.95 7.95 0 0 0-4.74 7.323 6.337 6.337 0 0 1-.83 3.175l-.468.823a4.001 4.001 0 0 0 3.476 5.983h1.96a3.98 3.98 0 0 0 7.716 0h1.964a4.004 4.004 0 0 0 3.482-5.982Zm-9.304 6.983a1.993 1.993 0 0 1-1.722-1.001h3.444a1.993 1.993 0 0 1-1.722 1.001Zm7.554-3.997a1.986 1.986 0 0 1-1.732.996H6.184a2.002 2.002 0 0 1-1.74-2.993l.47-.822a8.337 8.337 0 0 0 1.093-4.174 5.962 5.962 0 0 1 3.781-5.584.996.996 0 0 0 .494-.426 1.976 1.976 0 0 1 3.439 0 1 1 0 0 0 .494.425 5.989 5.989 0 0 1 3.786 5.634 8.303 8.303 0 0 0 1.082 4.094l.483.852a1.984 1.984 0 0 1-.01 1.998Z"></path></svg>
                    <p className="text-lg">Notifications</p>

                </div>
            </div>

            <div className="flex flex-col " >
                <h1 className="mb-4">Who can see your content</h1>
                <div onClick={() => setClick(3)} className={`flex flex-row gap-4 h-14 p-4  rounded-xl hover:bg-[#EFEFEF]   ${click === 3 ? 'bg-[#EFEFEF] ' : ' bg-white'}    `}>
                    <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title></title><path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Zm4.691-11.82L13.91 9.35l-1.08-2.537a.893.893 0 0 0-1.66 0L10.086 9.35l-2.783.334a.963.963 0 0 0-.493 1.662l2.095 1.905-.606 2.837a.918.918 0 0 0 1.363 1.018l2.335-1.504 2.335 1.504a.918.918 0 0 0 1.363-1.018l-.605-2.837 2.094-1.905a.962.962 0 0 0-.493-1.662Z" fillRule="evenodd"></path></svg>
                    <p className="text-lg">Close Friends</p>

                </div>
                <div onClick={() => setClick(4)} className={`flex flex-row gap-4 h-14 p-4  rounded-xl hover:bg-[#EFEFEF]   ${click === 4 ? 'bg-[#EFEFEF] ' : ' bg-white'}    `}>
                    <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title></title><path d="M20.153 20.106A11.493 11.493 0 0 0 3.893 3.858c-.007.007-.016.009-.023.016s-.009.016-.015.023a11.493 11.493 0 0 0 16.247 16.26c.01-.009.022-.012.03-.02.01-.01.012-.022.021-.031Zm1.348-8.102a9.451 9.451 0 0 1-2.119 5.968L6.033 4.622a9.49 9.49 0 0 1 15.468 7.382Zm-19 0a9.451 9.451 0 0 1 2.118-5.967l13.35 13.35A9.49 9.49 0 0 1 2.5 12.003Z"></path></svg>
                    <p className="text-lg">Bolocked</p>

                </div>
                <div onClick={() => setClick(5)} className={`flex flex-row gap-4 h-14 p-4  rounded-xl hover:bg-[#EFEFEF]   ${click === 5 ? 'bg-[#EFEFEF] ' : ' bg-white'}    `}>
                    <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title></title><path d="M2.667 22v-1.355a5.271 5.271 0 0 1 5.271-5.271h8.124a5.271 5.271 0 0 1 5.271 5.271V22" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></path><circle cx="12" cy="7.268" fill="none" r="5" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle></svg>
                    <p className="text-lg">Account Status</p>

                </div>
            </div>

        </div>
    )
} 