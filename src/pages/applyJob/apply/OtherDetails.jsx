import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CandidatesSchema } from "../../services/Validation";
import { generateClient } from "aws-amplify/api";
import { GoUpload } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { listPersonalDetails } from "../../../graphql/queries";
import { createEducationDetails, createPersonalDetails } from "../../../graphql/mutations";
import { uploadDocString } from "../../services/uploadDocsS3/UploadDocs";
import { SpinLogo } from "../../../utils/SpinLogo";

const client = generateClient();

export const OtherDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigatingEducationData = location.state?.FormData;
  const [latestTempIDData, setLatestTempIDData] = useState("");
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [uploadedFileNames, setUploadedFileNames] = useState({
    uploadResume: null,
    uploadCertificate: null,
    uploadPp: null,
  });

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CandidatesSchema),
    defaultValues: {
      perIS: "no",
      perIDesc: "",
    },
  });

  const getTotalCount = async () => {
    try {
      let allTempIDs = [];
      let nextToken = null;

      do {
        const result = await client.graphql({
          query: listPersonalDetails,
          variables: { nextToken },
        });

        const items = result?.data?.listPersonalDetails?.items || [];
        const tempIDs = items.map((val) => val.tempID);
        allTempIDs = [...allTempIDs, ...tempIDs];

        nextToken = result?.data?.listPersonalDetails?.nextToken;
      } while (nextToken);

      const sortedData = allTempIDs.sort((a, b) => {
        const numA = a.match(/\d+/) ? parseInt(a.match(/\d+/)[0], 10) : 0;
        const numB = b.match(/\d+/) ? parseInt(b.match(/\d+/)[0], 10) : 0;

        const prefixA = a.replace(/\d+/g, "") || "";
        const prefixB = b.replace(/\d+/g, "") || "";

        if (prefixA === prefixB) {
          return numA - numB;
        }
        return prefixA.localeCompare(prefixB);
      });

      return sortedData[sortedData.length - 1] || "TEMP0"; 
    } catch (error) {
      console.error("Error fetching total count:", error);
      return "TEMP0"; // Fallback in case of error
    }
  };

  const generateNextTempID = (totalCount) => {
    const prefixMatch = totalCount.match(/[^\d]+/);
    const prefix = prefixMatch ? prefixMatch[0] : "TEMP";
    const numberMatch = totalCount.match(/\d+/);
    const numberPart = numberMatch ? parseInt(numberMatch[0], 10) : 0;
    const nextNumber = numberPart + 1;
  
    // Determine the length of the numeric part in the totalCount
    const numberLength = numberMatch ? numberMatch[0].length : 1;
  
    // Pad the nextNumber with leading zeros to match the length of the numeric part
    const paddedNextNumber = String(nextNumber).padStart(numberLength, "0");
  
    return `${prefix}${paddedNextNumber}`;
  };

  const handleFileChange = async (e, fieldName) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
      return;
    }

    if (selectedFile) {
      setValue(fieldName, selectedFile);
      setUploadedFileNames((prev) => ({
        ...prev,
        [fieldName]: selectedFile.name,
      }));
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const totalCount = await getTotalCount();
      const nextTempID = generateNextTempID(totalCount);
      setLatestTempIDData(nextTempID);

      const personName = nextTempID;

      // Upload files to S3
      const uploadedResume = await uploadDocString(data.uploadResume, "uploadResume", personName);
      const uploadedCertificate = await uploadDocString(data.uploadCertificate, "uploadCertificate", personName);
      const uploadedPp = await uploadDocString(data.uploadPp, "uploadPp", personName);
      const UpProfilePhoto = await uploadDocString(navigatingEducationData.profilePhoto, "profilePhoto", personName);

      const baseURL = "https://aweadininprod2024954b8-prod.s3.ap-southeast-1.amazonaws.com/";
      const storedData = {
        tempID: nextTempID,
        ...navigatingEducationData,
        ...data,
        profilePhoto: UpProfilePhoto?.replace(baseURL, ""),
        status: "Active",
        uploadResume: uploadedResume?.replace(baseURL, ""),
        uploadCertificate: uploadedCertificate?.replace(baseURL, ""),
        uploadPp: uploadedPp?.replace(baseURL, ""),
      };

      const totalData = {
        tempID: storedData.tempID,
        crime: storedData.crime || "",
        crimeDesc: storedData.crimeDesc,
        emgDetails: [storedData.emgDetails] || [],
        empStatement: storedData.empStatement || "",
        desc: storedData.desc || "",
        disease: storedData.disease || "",
        diseaseDesc: storedData.diseaseDesc,
        liquor: storedData.liquor || "",
        liquorDesc: storedData.liquorDesc,
        noticePeriod: storedData.noticePeriod || "",
        perIS: storedData.perIS || "",
        perIDesc: storedData.perIDesc,
        referees: [storedData.referees] || [],
        relatives: [storedData.relatives] || [],
        salaryExpectation: storedData.salaryExpectation || "",
        supportInfo: storedData.supportInfo || "",
        uploadResume: storedData.uploadResume || "",
        uploadCertificate: storedData.uploadCertificate || "",
        uploadPp: storedData.uploadPp || "",
      };

      const totalData1 = {
        tempID: storedData.tempID,
        age: storedData.age || "",
        alternateNo: storedData.alternateNo || "",
        bwnIcNo: storedData.bwnIcNo || "",
        bwnIcExpiry: storedData.bwnIcExpiry || "",
        bwnIcColour: storedData.bwnIcColour || "",
        contactNo: storedData.contactNo || "",
        cob: storedData.countryOfBirth || "",
        chinese: storedData.chinese || "",
        dob: storedData.dateOfBirth || "",
        driveLic: storedData.driveLic || "",
        email: storedData.email || "",
        eduDetails: [storedData.eduDetails] || [],
        familyDetails: [storedData.familyDetails] || [],
        gender: storedData.gender || "",
        lang: storedData.lang || "",
        marital: storedData.marital || "",
        name: storedData.name || "",
        nationality: storedData.nationality || "",
        otherNation: storedData.otherNationality || "",
        otherRace: storedData.otherRace || "",
        otherReligion: storedData.otherReligion || "",
        ppNo: storedData.ppNo || "",
        ppIssued: storedData.ppIssued || "",
        ppExpiry: storedData.ppExpiry || "",
        ppDestinate: storedData.ppDestinate || "",
        presentAddress: storedData.presentAddress || "",
        permanentAddress: storedData.permanentAddress || "",
        profilePhoto: storedData.profilePhoto || "",
        position: storedData.position || "",
        race: storedData.race || "",
        religion: storedData.religion || "",
        status: storedData.status || "",
        workExperience: [storedData.workExperience] || [],
      };
console.log(totalData,"11111111");
console.log(totalData1,"22222222");

      await Promise.all([
        client.graphql({
          query: createPersonalDetails,
          variables: { input: totalData1 },
        }),
        client.graphql({
          query: createEducationDetails,
          variables: { input: totalData },
        }),
      ]);

      localStorage.removeItem("position");
      localStorage.removeItem("applicantFormData");
      localStorage.removeItem("personalFormData");
      localStorage.removeItem("educationFormData");
      localStorage.removeItem("otherFormData");

      setShowTitle("Application Details Successfully Submitted");
      setNotification(true);
      setTimeout(() => navigate("/applyJob"), 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error("Error during form submission:", error);
      setShowTitle("Error submitting application");
      setNotification(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
      {/* Salary Expected */}
      <div className="mb-4">
        <label className="text_size_6 mb-2">Salary Expected</label>
        <input
          type="text"
          {...register("salaryExpectation")}
          className="input-field"
        />
      </div>

      {/* Termination Notice */}
      <div className="mb-4">
        <label className="text_size_6 mb-2">
          Termination Notice for Present job (Month/Date)
        </label>
        <input
          type="text"
          {...register("noticePeriod")}
          className="input-field"
        />
        {errors.noticePeriod && (
          <p className="text-[red] text-xs mt-1">
            {errors.noticePeriod.message}
          </p>
        )}
      </div>

      {/* Interviewed Before */}
      <div className="mb-4">
        <label className="text_size_6">
          Have you been interviewed for a position at this company before?
        </label>
        <div className="flex justify-between items-center mt-2 mb-4 max-sm:flex-col">
          <div className="mt-2">
            <Controller
              name="perIS"
              control={control}
              defaultValue="no"
              render={({ field }) => (
                <>
                  <input
                    type="radio"
                    id="yes"
                    {...field}
                    value="yes"
                    className="mr-2 p-3"
                  />
                  <label htmlFor="yes" className="mr-4 text_size_6">
                    Yes
                  </label>

                  <input
                    type="radio"
                    id="no"
                    {...field}
                    value="no"
                    className="mr-2 p-3"
                    defaultChecked
                  />
                  <label htmlFor="no" className="text_size_6">
                    No
                  </label>
                </>
              )}
            />
            {errors.perIS && (
              <p className="text-[red] text-xs mt-1">
                {errors.perIS.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label className="w-full sm:w-[350px] text_size_7">
              If yes, please give Details
            </label>
            <Controller
              name="perIDesc"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  disabled={watch("perIS") !== "yes"}
                  className={`input-field ${
                    errors.perIDesc ? "border-[red]" : ""
                  }`}
                />
              )}
            />
            {errors.perIDesc && (
              <p className="text-[red] text-xs mt-4">
                {errors.perIDesc.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Support Information */}
      <div className="mb-4">
        <label className="text_size_6 mb-2">
          Any other information you wish to provide?
        </label>
        <input
          {...register("supportInfo")}
          className="resize-none input-field"
          rows="4"
        />
      </div>

      {/* File Uploads */}
      <div className="my-5 ">
        <label className="text_size_6">Choose file</label>
        <div className=" grid max-sm:grid-cols-1 md:grid-cols-3 max-md:grid-cols-2 mt-3 mb-10 gap-5">
          {/* Resume Upload */}
          <div className="max-sm:mb-5">
            <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-white border border-[#dedddd] rounded-md cursor-pointer">
              <input
                type="file"
                {...register("uploadResume")}
                onChange={(e) => handleFileChange(e, "uploadResume")}
                className="hidden"
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
              <span className="ml-2 text-grey w-full font-normal flex justify-between items-center gap-10">
                Upload Resume
                <GoUpload />
              </span>
            </label>
            {uploadedFileNames.uploadResume ? (
              <p className="text-xs mt-1 text-grey">
                {uploadedFileNames.uploadResume}
              </p>
            ) : (
              <p className="text-[red] text-xs mt-1">
                {errors?.uploadResume?.message}
              </p>
            )}
          </div>

          {/* Certificate Upload */}
          <div className="max-sm:mb-5">
            <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-white border border-[#dedddd] rounded-md cursor-pointer">
              <input
                type="file"
                {...register("uploadCertificate")}
                onChange={(e) => handleFileChange(e, "uploadCertificate")}
                className="hidden"
                accept="application/pdf, image/png, image/jpeg"
              />
              <span className="ml-2 text-grey w-full font-normal flex justify-between items-center gap-10">
                Qualifi Certificate
                <GoUpload />
              </span>
            </label>
            {uploadedFileNames.uploadCertificate ? (
              <p className="text-xs mt-1 text-grey">
                {uploadedFileNames.uploadCertificate}
              </p>
            ) : (
              <p className="text-[red] text-xs mt-1">
                {errors?.uploadCertificate?.message}
              </p>
            )}
          </div>

          {/* Passport Upload */}
          <div className="max-sm:mb-5">
            <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-white border border-[#dedddd] rounded-md cursor-pointer">
              <input
                type="file"
                {...register("uploadPp")}
                onChange={(e) => handleFileChange(e, "uploadPp")}
                className="hidden"
                accept="application/pdf"
              />
              <span className="ml-2 text-grey w-full font-normal flex justify-between items-center gap-10">
                Upload IC / Passport
                <GoUpload />
              </span>
            </label>
            {uploadedFileNames.uploadPp ? (
              <p className="text-xs mt-1 text-grey">
                {uploadedFileNames.uploadPp}
              </p>
            ) : (
              <p className="text-[red] text-xs mt-1">
                {errors?.uploadPp?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-start mb-4">
        <input
          type="checkbox"
          id="empStatement"
          {...register("empStatement", { required: "This field is required" })}
          className="w-5 h-5 border-medium_grey rounded"
        />
        <label htmlFor="empStatement" className="ml-2 max-sm:text-[12px]">
          I Hereby Declare that every statement made by me in this form is true and correct and I understand and agree that any false declaration made by me may be ground for termination of my contract of employment without notice.
        </label>
      </div>
      {errors.empStatement && (
        <p className="text-[red] text-sm">{errors.empStatement.message}</p>
      )}

      <div className="text-center my-10">
        <button type="submit" className="primary_btn" >
           Submit
        </button>
      </div>
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/applyJob"
        />
      )}
    </form>
  );
};


// import React, { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { CandidatesSchema } from "../../services/Validation";
// import { generateClient } from "aws-amplify/api";
// import { GoUpload } from "react-icons/go"; // Ensure this import is correct
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import { listPersonalDetails } from "../../../graphql/queries";
// import { createEducationDetails, createPersonalDetails } from "../../../graphql/mutations";
// import { uploadDocString } from "../../services/uploadDocsS3/UploadDocs";
// import { SpinLogo } from "../../../utils/SpinLogo";
// import axios from "axios";

// const client = generateClient();

// export const OtherDetails = () => {
//   const location = useLocation();
//   const navigatingEducationData = location.state?.FormData;
//   console.log("Received form data:", navigatingEducationData);
//   const [latestTempIDData, setLatestTempIDData] = useState("");
//   const [notification, setNotification] = useState(false);
//   const [showTitle, setShowTitle] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
// console.log(navigatingEducationData.profilePhoto);

//   const [uploadedFileNames, setUploadedFileNames] = useState({
//     uploadResume: null,
//     uploadCertificate: null,
//     uploadPp: null,
//   });
  
//   const [uploadedDocs, setUploadedDocs] = useState({
//     uploadResume: null,
//     uploadCertificate: null,
//     uploadPp: null,
//   });
//   const [formData, setFormData] = useState(null);

//   useEffect(()=>{
//     window.scrollTo({
//       top:0,
//       behavior:"smooth"
//     })
//       },[])

//   const {
//     register,
//     control,
//     watch,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(CandidatesSchema),
//     defaultValues: {
//       perIS: "no",
//       perIDesc: "",
//     },
//   });


//   const handleFileChange = async (e, fieldName) => {
//     const selectedFile = e.target.files[0];
//     const allowedTypes = [
//       "application/pdf",
//       "image/jpeg",
//       "image/jpg",
//       "image/png",
//     ];

//     // Check if the file type is allowed
//     if (!allowedTypes.includes(selectedFile.type)) {
//       alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
//       return;
//     }
//     if (selectedFile) {
//       setValue(fieldName, selectedFile); // Set file in React Hook Form
//       setUploadedFileNames((prev) => ({
//         ...prev,
//         [fieldName]: selectedFile.name,
//       }));
//     }
//   };
// // console.log(navigatingEducationData.profilePhoto,"hhhhhhhh");

// const getTotalCount = async () => {
//   try {
//     const result = await client.graphql({
//       query: listPersonalDetails,
//     });
//     const items = result?.data?.listPersonalDetails?.items || [];
//     return items.length;
//   } catch (error) {
//     console.error("Error fetching total count:", error);
//     return 0;
//   }
// };

// const generateNextTempID = (totalCount) => {
//   const nextNumber = totalCount + 1;
//   const nextTempID = `TEMP${String(nextNumber).padStart(3, "0")}`;
//   return nextTempID;
// };

// useEffect(() => {
//   const fetchNextTempID = async () => {
//     const totalCount = await getTotalCount();
//     const nextTempID = generateNextTempID(totalCount);
//     setLatestTempIDData(nextTempID);
//   };
//   fetchNextTempID();
// }, []);

// const onSubmit = async (data) => {
//   if (!latestTempIDData) {
//     alert("TempID is not generated yet. Please wait...");
//     return;
//   }

//   setIsLoading(true);
//   const personName = latestTempIDData;

//   try {
//     // Upload files to S3 bucket
//     const uploadedResume = await uploadDocString(data.uploadResume, "uploadResume", personName);
//     const uploadedCertificate = await uploadDocString(data.uploadCertificate, "uploadCertificate", personName);
//     const uploadedPp = await uploadDocString(data.uploadPp, "uploadPp", personName);
//     const UpProfilePhoto = await uploadDocString(navigatingEducationData.profilePhoto, "profilePhoto", personName);

//     const baseURL = "https://aweadininprod2024954b8-prod.s3.ap-southeast-1.amazonaws.com/";
//     const storedData = {
//       tempID: latestTempIDData,
//       ...navigatingEducationData,
//       ...data,
//       profilePhoto: UpProfilePhoto?.replace(baseURL, ""),
//       status: "Active",
//       uploadResume: uploadedResume?.replace(baseURL, ""),
//       uploadCertificate: uploadedCertificate?.replace(baseURL, ""),
//       uploadPp: uploadedPp?.replace(baseURL, ""),
//     };

//     const totalData = {
//       tempID: storedData.tempID,
//       crime: storedData.crime || "",
//       crimeDesc: storedData.crimeDesc,
//       emgDetails: [storedData.emgDetails] || [],
//       empStatement: storedData.empStatement || "",
//       desc: storedData.desc || "",
//       disease: storedData.disease || "",
//       diseaseDesc: storedData.diseaseDesc,
//       liquor: storedData.liquor || "",
//       liquorDesc: storedData.liquorDesc,
//       noticePeriod: storedData.noticePeriod || "",
//       perIS: storedData.perIS || "",
//       perIDesc: storedData.perIDesc,
//       referees: [storedData.referees] || [],
//       relatives: [storedData.relatives] || [],
//       salaryExpectation: storedData.salaryExpectation || "",
//       supportInfo: storedData.supportInfo || "",
//       uploadResume: storedData.uploadResume || "",
//       uploadCertificate: storedData.uploadCertificate || "",
//       uploadPp: storedData.uploadPp || "",
//     };

//     const totalData1 = {
//       tempID: storedData.tempID,
//       age: storedData.age || "",
//       alternateNo: storedData.alternateNo || "",
//       bwnIcNo: storedData.bwnIcNo || "",
//       bwnIcExpiry: storedData.bwnIcExpiry || "",
//       bwnIcColour: storedData.bwnIcColour || "",
//       contactNo: storedData.contactNo || "",
//       cob: storedData.countryOfBirth || "",
//       chinese: storedData.chinese || "",
//       dob: storedData.dateOfBirth || "",
//       driveLic: storedData.driveLic || "",
//       email: storedData.email || "",
//       eduDetails: [storedData.eduDetails] || [],
//       familyDetails: [storedData.familyDetails] || [],
//       gender: storedData.gender || "",
//       lang: storedData.lang || "",
//       marital: storedData.marital || "",
//       name: storedData.name || "",
//       nationality: storedData.nationality || "",
//       otherNation: storedData.otherNationality || "",
//       otherRace: storedData.otherRace || "",
//       otherReligion: storedData.otherReligion || "",
//       ppNo: storedData.ppNo || "",
//       ppIssued: storedData.ppIssued || "",
//       ppExpiry: storedData.ppExpiry || "",
//       ppDestinate: storedData.ppDestinate || "",
//       presentAddress: storedData.presentAddress || "",
//       permanentAddress: storedData.permanentAddress || "",
//       profilePhoto: storedData.profilePhoto || "",
//       position: storedData.position || "",
//       race: storedData.race || "",
//       religion: storedData.religion || "",
//       status: storedData.status || "",
//       workExperience: [storedData.workExperience] || [],
//     };

//     await Promise.all([
//       client.graphql({
//         query: createPersonalDetails,
//         variables: { input: totalData1 },
//       }),
//       client.graphql({
//         query: createEducationDetails,
//         variables: { input: totalData },
//       }),
//     ]);

//     localStorage.removeItem("position");
//     localStorage.removeItem("applicantFormData");
//     localStorage.removeItem("personalFormData");
//     localStorage.removeItem("educationFormData");
//     localStorage.removeItem("otherFormData");

//     setShowTitle("Application Details Successfully Submitted");
//     setNotification(true);
//   } catch (error) {
//     console.error("Error during form submission:", error);
//     setShowTitle("Error submitting application");
//     setNotification(true);
//   } finally {
//     setIsLoading(false);
//   }
// };
 
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
//       {/* Salary Expected */}
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">Salary Expected</label>
//         <input
//           type="text"
//           {...register("salaryExpectation")}
//           className="input-field"
//         />
//       </div>

//       {/* Termination Notice */}
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">
//           Termination Notice for Present job (Month/Date)
//         </label>
//         <input
//           type="text"
//           {...register("noticePeriod")}
//           className="input-field"
//         />
//         {errors.noticePeriod && (
//           <p className="text-[red] text-xs mt-1">
//             {errors.noticePeriod.message}
//           </p>
//         )}
//       </div>
     
//       {/* Interviewed Before */}
// <div className="mb-4">
//   <label className="text_size_6">
//     Have you been interviewed for a position at this company before?
//   </label>
//   <div className="flex justify-between items-center mt-2 mb-4 max-sm:flex-col">
//     <div className="mt-2">
//       <Controller
//         name="perIS"
//         control={control}
//         defaultValue="no" // Provide a default value
//         render={({ field }) => (
//           <>
//             <input
//               type="radio"
//               id="yes"
//               {...field}
//               value="yes"
//               className="mr-2 p-3"
//             />
//             <label htmlFor="yes" className="mr-4 text_size_6">
//               Yes
//             </label>

//             <input
//               type="radio"
//               id="no"
//               {...field}
//               value="no"
//               className="mr-2 p-3"
//               defaultChecked // This ensures that "No" is checked by default
//             />
//             <label htmlFor="no" className="text_size_6">
//               No
//             </label>
//           </>
//         )}
//       />
//       {errors.perIS && (
//         <p className="text-[red] text-xs mt-1">
//           {errors.perIS.message}
//         </p>
//       )}
//     </div>

//     <div className="mt-4">
//       <label className="w-full sm:w-[350px] text_size_7">
//         If yes, please give Details
//       </label>
//       <Controller
//         name="perIDesc"
//         control={control}
//         defaultValue="" // Provide an initial value to avoid uncontrolled behavior
//         render={({ field }) => (
//           <input
//             {...field}
//             disabled={watch("perIS") !== "yes"}
//             className={`input-field ${
//               errors.perIDesc ? "border-[red]" : ""
//             }`}
//           />
//         )}
//       />
//       {errors.perIDesc && (
//         <p className="text-[red] text-xs mt-4">
//           {errors.perIDesc.message}
//         </p>
//       )}
//     </div>
//   </div>
// </div>

//       {/* Support Information */}
//       <div className="mb-4">
//         <label className="text_size_6 mb-2">
//           Any other information you wish to provide?
//         </label>
//         <textarea
//           {...register("supportInfo")}
//           className="resize-none input-field"
//           rows="4"
//         ></textarea>
//       </div>

//   {/* File Uploads */}
//   <div className="my-5 ">
//         <label className="text_size_6">Choose file</label>
//         <div className=" grid max-sm:grid-cols-1 md:grid-cols-3 max-md:grid-cols-2 mt-3 mb-10 gap-5">
//           {/* Resume Upload */}
//           <div className="max-sm:mb-5">
//             <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-white border border-[#dedddd] rounded-md cursor-pointer">
//               <input
//                 type="file"
//                 {...register("uploadResume")}
//                 onChange={(e) => handleFileChange(e, "uploadResume")}
//                 className="hidden"
//                 accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//               />
//               <span className="ml-2 text-grey w-full font-normal flex justify-between items-center gap-10">
//               Upload Resume
//               <GoUpload />
//               </span>
//             </label>
//             {/* Display uploaded file name */}
//             {uploadedFileNames.uploadResume ? (
//               <p className="text-xs mt-1 text-grey">
//                  {uploadedFileNames.uploadResume}
//               </p>
//             ):(<p className="text-[red] text-xs mt-1">
//               {errors?.uploadResume?.message}
//             </p>)}
//           </div>

//           {/* Certificate Upload */}
//           <div className="max-sm:mb-5">
//             <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-white border border-[#dedddd] rounded-md cursor-pointer">
//               <input
//                 type="file"
//                 {...register("uploadCertificate")}
//                 onChange={(e) => handleFileChange(e, "uploadCertificate")}
//                 className="hidden"
//                 accept="application/pdf, image/png, image/jpeg"
//               />
//               <span className="ml-2 text-grey w-full font-normal flex justify-between items-center gap-10">
//               Qualifi Certificate
//               <GoUpload />
//               </span>
//             </label>
//             {/* Display uploaded file name */}
//             {uploadedFileNames.uploadCertificate ? (
//               <p className="text-xs mt-1 text-grey">
//                  {uploadedFileNames.uploadCertificate}
//               </p>
//             ):(<p className="text-[red] text-xs mt-1">
//               {errors?.uploadCertificate?.message}
//             </p>)}
//           </div>

//           {/* Passport Upload */}
//           <div className="max-sm:mb-5">
//             <label className="flex items-center px-3 py-2 text_size_7 p-2.5 bg-white border border-[#dedddd] rounded-md cursor-pointer">
//               <input
//                 type="file"
//                 {...register("uploadPp")}
//                 onChange={(e) => handleFileChange(e, "uploadPp")}
//                 className="hidden"
//                 accept="application/pdf"
//               />
//               <span className="ml-2 text-grey w-full font-normal flex justify-between items-center gap-10">
//               Upload IC / Passport
//                 <GoUpload />
//               </span>
//             </label>
//             {uploadedFileNames.uploadPp ? (
//               <p className="text-xs mt-1 text-grey">
//                  {uploadedFileNames.uploadPp}
//               </p>
//             ):(<p className="text-[red] text-xs mt-1">
//               {errors?.uploadPp?.message}
//             </p>)}
//           </div>
//         </div>
//       </div>

//       <div className="flex items-start mb-4">
//         <input
//           type="checkbox"
//           id="empStatement"
//           {...register('empStatement', { required: 'This field is required' })}
//           className="w-5 h-5 border-medium_grey rounded"
//         />
//         <label htmlFor="empStatement" className="ml-2 max-sm:text-[12px]">
//           I Hereby Declare that every statement made by me in this form is true and correct and I understand and agree that any false declaration made by me may be ground for termination of my contract of employment without notice.
//         </label>
//       </div>
//       {errors.empStatement && (
//         <p className="text-[red] text-sm">{errors.empStatement.message}</p>
//       )}

//       <div className="text-center my-10">
//         <button type="submit" className="primary_btn">
//           Submit
//         </button>
//       </div>
//       {notification && (
//           <SpinLogo
//             text={showTitle}
//             notification={notification}
//             path="/applyJob"
//           />
//         )}
//     </form>
//   );
// };
