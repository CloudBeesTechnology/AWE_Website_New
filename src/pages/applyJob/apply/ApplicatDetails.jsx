import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import avatar from "../../../assets/applyJob/avatar.jpeg";
import { ApplicantSchema } from "../../services/Validation";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadData } from "aws-amplify/storage";

export const ApplicantDetails = () => {
  // Scroll to the top when the component is mounted
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const navigate = useNavigate();
  const [file,setFile]=useState(null)
  const [profileUpdate,setProfileUpdate]=useState("")
  const location = useLocation();
  const data = location.state?.editingData;
  const jobTitle = location.state?.position;

  const {
    register,
    handleSubmit,
    setValue,watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ApplicantSchema), // Use the Yup schema for validation
  });

  // Handle file upload and set the profile photo URL
  const handleFileChange = async (e) => {
    const seletedFile = e.target.files[0];
    setFile(seletedFile)
    setValue("profilePhoto",seletedFile)
    uploadProfilePhoto(seletedFile)
  };

  // Upload the profile photo to AWS and set the form value
  const uploadProfilePhoto = async (tempID,file) => {
    try {
      const result = await uploadData({
        path: `uploadProfilePhoto/${tempID}/${file.name}`,
        data: file,
      }).result;
      const filePath = result.path;
      const encodedFilePath = encodeURIComponent(filePath);
      const fileUrl = `https://aweadininprod2024954b8-prod.s3.ap-southeast-1.amazonaws.com/public/${encodedFilePath}`;
      // const fileUrl = `https://awe-adinin-files-storage-1982502de-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;
      console.log("File uploaded successfully. File URL:", fileUrl);
      setProfileUpdate(fileUrl); // Store the uploaded photo URL in the state
      // setValue("profilePhoto", fileUrl); // Set the profile photo URL in the form
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const applicationUpdate = {
        ...data,
        profilePhoto: profileUpdate,
      };
     
      navigate("/addCandidates/personalDetails", {
        state: { FormData: applicationUpdate },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="w-full">
      <form
        className=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-center sm:justify-between gap-5 items-center flex-wrap">
          {/* Position */}
          <div className="mt-10 mb-5 text_size_6 max-w-[650px] w-full">
            <div>
              <label className="block">Applying for the position of</label>
              <input
                {...register("position")}
                type="text"
                className="input-field"
                value={jobTitle || ''}
              />
              {errors.position && (
                <p className="text-[red] text-[13px]">
                  {errors.position.message}
                </p>
              )}
            </div>
          </div>

       

{/* 
          <div>
            <div className="flex justify-center items-center gap-5">
              <input
                type="radio"
                id="offshore"
                {...register("employeeType")}
                value="offshore"
              />
              <label htmlFor="offshore">Offshore</label>
              <input
                type="radio"
                id="onshore"
                {...register("employeeType")}
                value="Onshore"
              />
              <label htmlFor="onshore">Onshore</label>
            </div>
            {errors.employeeType && (
              <p className="text-[red] text-[13px] text-center mt-3">
                {errors.employeeType.message}
              </p>
            )}
          </div> */}

          {/* Upload Photo */}
          <div className="py-2 center flex-col max-w-[160px]">
             <input
              type="file"
              id="fileInput"
              name="profilePhoto"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="h-[120px] max-w-[120px] rounded-md bg-lite_skyBlue">
              <img
                src={file ? URL.createObjectURL(file) : avatar}
                id="previewImg"
                alt="profile"
                className="object-cover w-full h-full"
                onError={(e) => e.target.src = avatar}
              />
            </div>
            <div className="mt-1 rounded-lg text-center">
              <button
                type="button"
                className="text_size_6"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Choose Image
              </button>
            </div>
            {errors.profilePhoto && (
              <p className="text-[red] text-[13px] text-center">{errors.profilePhoto.message}</p>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid  md:grid-cols-2 gap-x-12 gap-y-5 my-4 text_size_6">
          {[
                        // { label: "Contract Type", name: "contractType",  type: "select", options: ["", "LPA","SAWP","BRUNEI"]  },
                        // { label: "Agent", name: "agent", type: "text" },

            { label: "Name", name: "name", type: "text" },
            { label: "Chinese characters (if applicable)", name: "chinese", type: "text" },
            { label: "Gender", name: "gender", type: "select", options: ["", "Male", "Female"] },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
            { label: "Age", name: "age", type: "number", min: 20, max: 99 },  // Modified for age input
            { label: "Email ID", name: "email", type: "email" },
            { label: "Marital Status", name: "marital", type: "select", options: ["", "Single", "Married", "Widowed", "Separated", "Divorced"] },
            { label: "Country of Birth", name: "countryOfBirth", type: "text" },
            { label: "Nationality", name: "nationality", type: "select", options:["",
              "Bruneian",
              "Brunei PR",
              "Malaysian",
              "Indonesian",
              "Indian",
              "Bangladeshi",
              "Thai",
              "Sri Lankan",
              "Filipino",
              "Other"
              ] },
            { label: "Other Nationality", name: "otherNationality", type: "text", disabled: watch("nationality")?.toLowerCase() !== "other" },
            { label: "Race", name: "race", type: "select", options: ["", "Malay", "Chinese", "Indian", "Other"] },
            { label: "Other Race", name: "otherRace", type: "text", disabled: watch("race")?.toLowerCase() !== "other" },
            { label: "Religion", name: "religion", type: "select", options: ["", "Muslim", "Buddhist", "Christian", "Hindu", "Other"] },
            { label: "Other Religion", name: "otherReligion", type: "text", disabled: watch("religion")?.toLowerCase() !== "other" },

          ].map((field, index) => (
            <div key={index}>
              <label className="block">{field.label}</label>
              {field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className="input-field"
                >
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
                <p className="text-[red] text-[13px]">{errors[field.name]?.message}</p>
              )}
            </div>
          ))}
        </div>

        {/* Save Details Checkbox */}

        {/* Submit Button */}
        <div className="flex justify-center my-10 gap-10">
          <button
            type="submit"
            className="primary_btn"
          >
            Next
          </button>
        </div>
      </form>
    
    </section>
  );
};
