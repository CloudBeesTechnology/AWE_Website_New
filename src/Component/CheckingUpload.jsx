import { useState } from "react";
import axios from "axios";
import { uploadDocs } from "../pages/services/uploadDocsS3/UploadDocs";

export const CheckingUpload = () => {
  const [uploadedDocs, setUploadedDocs] = useState({
    CheckingUpload:null
  });
  const [uploadedFileNames, setUploadedFileNames] = useState({});
  const [file, setFile] = useState(null); // state for the file upload
const watchedEmpID="temp1000"
  const handleFileUpload = async (e,type) => {
    const selectedFile = e.target.files[0];

    // Allowed file types
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
      return;
    }

    if (selectedFile) {
      try {
        await uploadDocs(selectedFile, type, setUploadedDocs, watchedEmpID);
      setUploadedFileNames((prev) => ({
        ...prev,
        [type]: selectedFile.name, // Dynamically store file name
      }));
      } catch (err) {
        console.log(err);
      }
    }
  };
console.log(uploadedDocs);

  const handlePost = () => {
    console.log(uploadedFileNames);
    // Here you can handle the actual submission of data, like calling an API to save the form data
  };
//   const handlePUT = async () => {
//     // Here you can handle the actual submission of data, like calling an API to save the form data
//     try {
//       await axios
//         .put(
//           "https://gnth2qx5cf.execute-api.ap-southeast-1.amazonaws.com/fileupload/commonfiles/download.jpeg"
//         )

//         .then((res) => {
//           console.log(res, "kjl");
//         })
//         .catch((err) => {
//           console.log(err, "124");
//         });
//     } catch (error) {
//       console.log(error, "err");
//     }
//   };

  return (
    <div>
      <div>
        <h2 className="text_size_5 mb-2">Upload Job Document</h2>
        <label className="flex items-center px-3 py-2 p-2.5 bg-lite_skyBlue w-72 border border-[#dedddd] rounded-md cursor-pointer">
          <input
            type="file"
            onChange={(e)=>{handleFileUpload(e,"CheckingUpload")}}
            className="hidden"
            accept=".pdf, .jpg, .jpeg, .png"
          />
          <span className="ml-2 flex p-1 text-grey gap-10">PDF</span>
        </label>

        <p className="text-xs mt-1 text-grey">
          {uploadedFileNames?.uploadJobDetails}
        </p>
      </div>
      <div className="w-full center">
        <button className="primary_btn" onClick={handlePost}>
          Post
        </button>
      </div>
      <div className="w-full center">
        <button className="primary_btn" 
        // onClick={handlePUT}
        >
          PUT
        </button>
      </div>
    </div>
  );
};
