import { useState } from "react";

export default function FileUploader() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  return (
    <div className="a">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          className="p-1 hover:text-blue-500 transition-colors"
          onClick={() => document.querySelector("input[type=file]").click()}
        >
          <svg
            aria-label="Add Photo or Video"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Add Photo or Video</title>
            <path
              d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z"
              fillRule="evenodd"
            ></path>
            <path
              d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <path
              d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </button>
      </label>
    </div>
  );
}
