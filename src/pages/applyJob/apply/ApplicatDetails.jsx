import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import avatar from "../../../assets/applyJob/avatar.jpeg";
import { ApplicantSchema } from "../../services/Validation";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadDocString } from "../../services/uploadDocsS3/UploadDocs";
import { IoCameraOutline } from "react-icons/io5";
import { listPersonalDetails } from "../../../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { DataSupply } from "../../../utils/details/DataStoredContext";
const client = generateClient();

export const ApplicantDetails = () => {
  const {dropDownVal} = useContext(DataSupply);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const jobTitle = location.state?.position || localStorage.getItem("position") || "";

  const religionDD = dropDownVal[0]?.religionDD || [];
  const raceDD = dropDownVal[0]?.raceDD || [];
  const nationalityDD = dropDownVal[0]?.nationalityDD || [];

  const navigate = useNavigate();
  const [uploadedFileNames, setUploadedFileNames] = useState({ profilePhoto: null });
  const [profilePhoto, setProfilePhoto] = useState(null);
  // const [latestTempIDData, setLatesTempIDData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const data = location.state?.editingData;

  // const jobTitle = location.state?.position;

  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ApplicantSchema), // Use the Yup schema for validation
    defaultValues: JSON.parse(localStorage.getItem("applicantFormData")) || {}, // Load saved data from localStorage
  });
  const profile = watch("profilePhoto");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("applicantFormData"));
    if (savedData?.profilePhoto) {
      setProfilePhoto(savedData.profilePhoto); // Set the Base64 string as profile photo
      setValue("profilePhoto", savedData.profilePhoto);
    }
    localStorage.setItem("position", jobTitle); // Store position for persistence

    const handleBeforeUnload = () => {
      localStorage.removeItem("applicantFormData");
      localStorage.removeItem("position");
      localStorage.clear();

    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location,setValue]);

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!selectedFile) return;
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be an image (JPG, JPEG, PNG)");
      return;
    }

    setProfilePhoto(selectedFile);
    setValue("profilePhoto", selectedFile);
// console.log(selectedFile,"selectedFile");

    setUploadedFileNames((prev) => ({
      ...prev,
      profilePhoto: selectedFile.name,
    }));    

    const savedData = JSON.parse(localStorage.getItem("applicantFormData")) || {};
    savedData.profilePhoto = selectedFile.name;
    // console.log( savedData.profilePhoto,"saveData");
    // console.log(selectedFile.name,"selectedFile.name");
    
    
    localStorage.setItem("applicantFormData", JSON.stringify(savedData));
  };

  const onSubmit = async (data) => {
    try {
      const applicationUpdate = {
        ...data,
        profilePhoto:profilePhoto,
        uploadedFileNames: uploadedFileNames.profilePhoto,
      };

      localStorage.setItem("applicantFormData", JSON.stringify(applicationUpdate));
      navigate("/addCandidates/personalDetails", {
        state: { FormData: applicationUpdate },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center sm:justify-between gap-5 items-center flex-wrap">
          {/* Position Field */}
          <div className="mt-10 mb-5 text_size_6 max-w-[650px] w-full">
            <div>
              <label className="block">Applying for the position of</label>
              <input
                {...register("position")}
                type="text"
                className="input-field"
                value={jobTitle}
                // readOnly
              />
              {errors.position && (
                <p className="text-[red] text-[13px]">{errors.position.message}</p>
              )}
            </div>
          </div>

          {/* Profile Photo Upload */}
          <div className="py-2 center flex-col max-w-[160px]">
            <input
              type="file"
              id="fileInput"
              name="profilePhoto"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="h-[120px] max-w-[120px] relative rounded-md bg-lite_skyBlue">
            <img
  src={profilePhoto instanceof File ? URL.createObjectURL(profilePhoto) : avatar}
  id="previewImg"
  alt="profile"
  className="object-cover w-full h-full"
  onError={(e) => (e.target.src = avatar)}
/>

              {profilePhoto && (
                <div
                  className="absolute top-24 -right-3 bg-lite_grey p-[2px] rounded-full cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <IoCameraOutline className="w-6 h-6 p-1" />
                </div>
              )}
            </div>

            {!profilePhoto && (
              <div className="mt-1 rounded-lg text-center">
                <button
                  type="button"
                  className="text_size_6"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Choose Image
                </button>
              </div>
            )}

            {errors.profilePhoto && (
              <p className="text-[red] text-[13px] text-center">
                {errors.profilePhoto.message}
              </p>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid  md:grid-cols-2 gap-x-12 gap-y-5 my-4 text_size_6">
          {[
            // { label: "Contract Type", name: "contractType",  type: "select", options: ["", "LPA","SAWP","BRUNEI"]  },
            // { label: "Agent", name: "agent", type: "text" },

            { label: "Name", name: "name", type: "text" },
            {
              label: "Chinese characters (if applicable)",
              name: "chinese",
              type: "text",
            },
            {
              label: "Gender",
              name: "gender",
              type: "select",
              options: ["Male", "Female"],
            },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
            { label: "Age", name: "age", type: "number", min: 20, max: 99 }, // Modified for age input
            { label: "Email ID", name: "email", type: "email" },
            {
              label: "Marital Status",
              name: "marital",
              type: "select",
              options: ["Single", "Married", "Widow", "Separate", "Divorce"],
            },
            { label: "Country of Birth", name: "countryOfBirth", type: "text" },
            {
              label: "Nationality",
              name: "nationality",
              type: "select",
              options: nationalityDD,
            },
            {
              label: "Other Nationality",
              name: "otherNationality",
              type: "text",
              disabled: watch("nationality")?.toLowerCase() !== "other",
            },
            { label: "Race", name: "race", type: "select", options: raceDD },
            {
              label: "Other Race",
              name: "otherRace",
              type: "text",
              disabled: watch("race")?.toLowerCase() !== "other",
            },
            {
              label: "Religion",
              name: "religion",
              type: "select",
              options: religionDD,
            },
            {
              label: "Other Religion",
              name: "otherReligion",
              type: "text",
              disabled: watch("religion")?.toLowerCase() !== "others",
            },
          ].map((field, index) => (
            <div key={index}>
              <label className="block">{field.label}</label>
              {field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className="input-field select-custom"
                >
                  <option value="">Select</option>{" "}
                  {/* Ensure default empty option */}
                  {(field.options || []).map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...register(field.name)}
                  type={field.type}
                  disabled={field.disabled}
                  min={field.min}
                  max={field.max}
                  className="input-field"
                /> // border border-[#EAEAEA]
              )}
              {errors[field.name] && (
                <p className="text-[red] text-[13px]">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center my-10 gap-10">
          <button type="submit" className="primary_btn">
            Next
          </button>
        </div>
      </form>
    </section>
  );
};



// import { useEffect, useState, useContext } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import avatar from "../../../assets/applyJob/avatar.jpeg";
// import { ApplicantSchema } from "../../services/Validation";
// import { useLocation, useNavigate } from "react-router-dom";
// import { uploadDocString } from "../../services/uploadDocsS3/UploadDocs";
// import { IoCameraOutline } from "react-icons/io5";
// // import { listPersonalDetails } from "../../../graphql/queries";
// import { generateClient } from "aws-amplify/api";
// import { DataSupply } from "../../../utils/details/DataStoredContext";
// const client = generateClient();

// export const ApplicantDetails = () => {
//   const {dropDownVal} = useContext(DataSupply);
//   const location = useLocation();
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);
//   const jobTitle = location.state?.position || localStorage.getItem("position") || "";

//   const religionDD = dropDownVal[0]?.religionDD || [];
//   const raceDD = dropDownVal[0]?.raceDD || [];
//   const nationalityDD = dropDownVal[0]?.nationalityDD || [];

//   const navigate = useNavigate();
//   const [uploadedFileNames, setUploadedFileNames] = useState({ profilePhoto: null });
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   // const [latestTempIDData, setLatesTempIDData] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const data = location.state?.editingData;

//   // const jobTitle = location.state?.position;

  
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(ApplicantSchema), // Use the Yup schema for validation
//     defaultValues: JSON.parse(localStorage.getItem("applicantFormData")) || {}, // Load saved data from localStorage
//   });
//   const profile = watch("profilePhoto");

//   useEffect(() => {
//     const savedData = JSON.parse(localStorage.getItem("applicantFormData"));
//     if (savedData?.profilePhoto) {
//       setProfilePhoto(savedData.profilePhoto); // Set the Base64 string as profile photo
//       setValue("profilePhoto", savedData.profilePhoto);
//     }
//     localStorage.setItem("position", jobTitle); // Store position for persistence

//     const handleBeforeUnload = () => {
//       localStorage.removeItem("applicantFormData");
//       localStorage.removeItem("position");
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [location,setValue]);

//   // Handle file change
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

//     if (!selectedFile) return;
//     if (!allowedTypes.includes(selectedFile.type)) {
//       alert("Upload must be an image (JPG, JPEG, PNG)");
//       return;
//     }

//     // Store actual File object
//     setProfilePhoto(selectedFile);
//     setValue("profilePhoto", selectedFile);

//     // Store file name separately
//     setUploadedFileNames((prev) => ({
//       ...prev,
//       profilePhoto: selectedFile.name,
//     }));

//     // Store file info in localStorage
//     const savedData = JSON.parse(localStorage.getItem("applicantFormData")) || {};
//     savedData.profilePhoto = selectedFile.name;
//     localStorage.setItem("applicantFormData", JSON.stringify(savedData));
//   };

//   const onSubmit = async (data) => {
//     try {
//       const applicationUpdate = {
//         ...data,
//         profilePhoto, // Send the actual File object
//         uploadedFileNames: uploadedFileNames.profilePhoto,
//       };

//       console.log(applicationUpdate, "Application Data Sent");

//       localStorage.setItem("applicantFormData", JSON.stringify(applicationUpdate));
//       navigate("/addCandidates/personalDetails", {
//         state: { FormData: applicationUpdate },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <section className="w-full">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="flex justify-center sm:justify-between gap-5 items-center flex-wrap">
//           {/* Position Input */}
//           <div className="mt-10 mb-5 text_size_6 max-w-[650px] w-full">
//             <label className="block">Applying for the position of</label>
//             <input
//               {...register("position")}
//               type="text"
//               className="input-field"
//               value={jobTitle}
//               readOnly
//             />
//             {errors.position && (
//               <p className="text-[red] text-[13px]">{errors.position.message}</p>
//             )}
//           </div>

//           {/* Profile Photo Upload */}
//           <div className="py-2 center flex-col max-w-[160px]">
//             <input
//               type="file"
//               id="fileInput"
//               name="profilePhoto"
//               accept=".jpg,.jpeg,.png"
//               onChange={handleFileChange}
//               className="hidden"
//             />
//             <div className="h-[120px] max-w-[120px] relative rounded-md bg-lite_skyBlue">
//             <img
//   src={profilePhoto instanceof File ? URL.createObjectURL(profilePhoto) : avatar}
//   id="previewImg"
//   alt="profile"
//   className="object-cover w-full h-full"
//   onError={(e) => (e.target.src = avatar)}
// />

//               {profilePhoto && (
//                 <div
//                   className="absolute top-24 -right-3 bg-lite_grey p-[2px] rounded-full cursor-pointer"
//                   onClick={() => document.getElementById("fileInput").click()}
//                 >
//                   <IoCameraOutline className="w-6 h-6 p-1" />
//                 </div>
//               )}
//             </div>

//             {!profilePhoto && (
//               <div className="mt-1 rounded-lg text-center">
//                 <button
//                   type="button"
//                   className="text_size_6"
//                   onClick={() => document.getElementById("fileInput").click()}
//                 >
//                   Choose Image
//                 </button>
//               </div>
//             )}

//             {errors.profilePhoto && (
//               <p className="text-[red] text-[13px] text-center">
//                 {errors.profilePhoto.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Form Fields */}
//         <div className="grid  md:grid-cols-2 gap-x-12 gap-y-5 my-4 text_size_6">
//           {[
//             // { label: "Contract Type", name: "contractType",  type: "select", options: ["", "LPA","SAWP","BRUNEI"]  },
//             // { label: "Agent", name: "agent", type: "text" },

//             { label: "Name", name: "name", type: "text" },
//             {
//               label: "Chinese characters (if applicable)",
//               name: "chinese",
//               type: "text",
//             },
//             {
//               label: "Gender",
//               name: "gender",
//               type: "select",
//               options: ["Male", "Female"],
//             },
//             { label: "Date of Birth", name: "dateOfBirth", type: "date" },
//             { label: "Age", name: "age", type: "number", min: 20, max: 99 }, // Modified for age input
//             { label: "Email ID", name: "email", type: "email" },
//             {
//               label: "Marital Status",
//               name: "marital",
//               type: "select",
//               options: ["Single", "Married", "Widow", "Separate", "Divorce"],
//             },
//             { label: "Country of Birth", name: "countryOfBirth", type: "text" },
//             {
//               label: "Nationality",
//               name: "nationality",
//               type: "select",
//               options: nationalityDD,
//             },
//             {
//               label: "Other Nationality",
//               name: "otherNationality",
//               type: "text",
//               disabled: watch("nationality")?.toLowerCase() !== "other",
//             },
//             { label: "Race", name: "race", type: "select", options: raceDD },
//             {
//               label: "Other Race",
//               name: "otherRace",
//               type: "text",
//               disabled: watch("race")?.toLowerCase() !== "other",
//             },
//             {
//               label: "Religion",
//               name: "religion",
//               type: "select",
//               options: religionDD,
//             },
//             {
//               label: "Other Religion",
//               name: "otherReligion",
//               type: "text",
//               disabled: watch("religion")?.toLowerCase() !== "others",
//             },
//           ].map((field, index) => (
//             <div key={index}>
//               <label className="block">{field.label}</label>
//               {field.type === "select" ? (
//                 <select
//                   {...register(field.name)}
//                   className="input-field select-custom"
//                 >
//                   <option value="">Select</option>{" "}
//                   {/* Ensure default empty option */}
//                   {(field.options || []).map((option, i) => (
//                     <option key={i} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   {...register(field.name)}
//                   type={field.type}
//                   disabled={field.disabled}
//                   min={field.min}
//                   max={field.max}
//                   className="input-field"
//                 /> // border border-[#EAEAEA]
//               )}
//               {errors[field.name] && (
//                 <p className="text-[red] text-[13px]">
//                   {errors[field.name]?.message}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center my-10 gap-10">
//           <button type="submit" className="primary_btn">
//             Next
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };