import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CandidatesSchema } from "../../services/Validation";
import { generateClient } from "aws-amplify/api";
import { uploadData } from "aws-amplify/storage";
import { GoUpload } from "react-icons/go"; // Ensure this import is correct
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { listPersonalDetails } from "../../../graphql/queries";
import { createEducationDetails, createPersonalDetails } from "../../../graphql/mutations";

const client = generateClient();

export const OtherDetails = () => {
  const location = useLocation();
  const navigatingEducationData = location.state?.FormData;
  console.log("Received form data:", navigatingEducationData);
  const [latestTempIDData, setLatesTempIDData] = useState("");

  const [formData, setFormData] = useState(null);

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
      },[])

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
      perInterviewStatus: "no",
      perInterviewDescription: '',
    },
  });


  const getTotalCount = async () => {
    try {
      const result = await client.graphql({
        query: listPersonalDetails,
      });
      const items = result?.data?.listPersonalDetails?.items || [];
      return items.length; // Return the count of all entries
    } catch (error) {
      console.error("Error fetching total count:", error);
      return 0; // Return 0 if there's an error
    }
  };

  const generateNextTempID = (totalCount) => {
    const nextNumber = totalCount + 1;
    const nextTempID = `TEMP${String(nextNumber).padStart(3, "0")}`;
    return nextTempID;
  };

  useEffect(() => {
    const fetchNextTempID = async () => {
      const totalCount = await getTotalCount();
      const nextTempID = generateNextTempID(totalCount);
      setLatesTempIDData(nextTempID); // Set the generated ID
    };
    fetchNextTempID();
  }, []);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
  
    try {
      // Merging stored form data
      const updatedValue = { ...data };
      const storedData = { ...updatedValue, ...navigatingEducationData };
  
      // First set of data (Education & Other Details)
      const totalData = {
        tempID: latestTempIDData,
        crime: storedData.crime || "",
        crimeDesc: storedData.crime === "Yes" ? storedData.crimeDescription || "" : "",
        emgDetails:
          storedData.emergencyContact?.map((contact) => ({
            name: contact.name,
            relationship: contact.relationship,
            address: contact.address,
            phoneNumber: contact.phoneNumber,
            bloodGroup: contact.bloodGroup,
          })) || [],
        noExperience: storedData.noExperience || "",
        empStatement: storedData.empStatement || "",
        desc: storedData.description || "",
        disease: storedData.disease || "",
        diseaseDesc: storedData.disease === "Yes" ? storedData.diseaseDescription || "" : "",
        liquor: storedData.liquor || "",
        liquorDesc: storedData.liquor === "Yes" ? storedData.liquorDescription || "" : "",
        noticePeriod: storedData.noticePeriod || "",
        perIS: storedData.perInterviewStatus || "",
        perIDesc: storedData.perInterviewStatus === "yes" ? storedData.perInterviewDescription || "" : "",
        referees:
          storedData.referees?.map((referee) => ({
            name: referee.name,
            address: referee.address,
            phoneNumber: referee.phoneNumber,
            profession: referee.profession,
          })) || [],
        relatives:
          storedData.relatives?.map((relative) => ({
            name: relative.name,
            position: relative.position,
            relationship: relative.relationship,
          })) || [],
        salaryExpectation: storedData.salaryExpectation || "",
        supportInfo: storedData.supportInfo || "",
        uploadResume: storedData.uploadResume || "",
        uploadCertificate: storedData.uploadCertificate || "",
        uploadPp: storedData.uploadPp || "",
      };
  
      // Second set of data (Personal & Work Details)
      const totalData1 = {
        tempID: latestTempIDData,
        age: storedData.age || "",
        alternateNo: storedData.alternateNo || "",
        agent: storedData.agent || "",
        bwnIcNo: storedData.icNo || "",
        bwnIcExpiry: storedData.icExpiry || "",
        bwnIcColour: storedData.icColour || "",
        contactNo: storedData.contactNo || "",
        cob: storedData.countryOfBirth || "",
        contractType: storedData.contractType || "",
        chinese: storedData.chinese || "",
        dob: storedData.dateOfBirth || "",
        driveLic: storedData.drivingLicense || "",
        email: storedData.email || "",
        empType: storedData.employeeType || "",
        eduDetails: storedData.educationDetails || [],
        familyDetails: storedData.familyDetails || [],
        gender: storedData.gender || "",
        lang: storedData.language || "",
        marital: storedData.marital || "",
        name: storedData.name || "",
        nationality: storedData.nationality || "",
        otherNation: storedData.otherNationality || "",
        otherRace: storedData.otherRace || "",
        otherReligion: storedData.otherReligion || "",
        ppNo: storedData.passportNo || "",
        ppIssued: storedData.passportIssued || "",
        ppExpiry: storedData.passportExpiry || "",
        ppDestinate: storedData.passportDestination || "",
        presentAddress: storedData.presentAddress || "",
        permanentAddress: storedData.permanentAddress || "",
        profilePhoto: storedData.profilePhoto || "",
        position: storedData.position || "",
        race: storedData.race || "",
        religion: storedData.religion || "",
        status: storedData.status || "",
        workExperience: storedData.workExperience || [],
      };
  
      console.log("Personal & Work Data:", totalData1);
      console.log("Education & Other Data:", totalData);
  
      // Execute both mutations in parallel
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
  
      console.log("Successfully submitted data!");
  
      // Clearing localStorage only after successful submission
      localStorage.removeItem("applicantFormData");
      localStorage.removeItem("personalFormData");
      localStorage.removeItem("educationFormData");
      localStorage.removeItem("otherFormData");
  
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error;
    }
  };
  
  // const onSubmit = async (data) => {
  //   console.log(data);

  //   try {
  //     const updatedValue = {
  //       ...data,
 
  //     };
  //     // console.log(updatedValue);
  //     const storedData = {
  //       ...updatedValue,
  //       ...navigatingEducationData,
  //     };
  //     // console.log(storedData);

  //     const totalData = {
  //       profilePhoto:storedData.profilePhoto,
  //       position: storedData.position,
  //       contractType: storedData.contractType,
  //       employeeType: storedData.employeeType,
  //       name: storedData.name,
  //       chinese: storedData.chinese,
  //       gender: storedData.gender,
  //       dateOfBirth: storedData.dateOfBirth,
  //       age: storedData.age,
  //       email: storedData.email,
  //       countryOfBirth: storedData.countryOfBirth,
  //       nationality: storedData.nationality,
  //       otherNationality: storedData.otherNationality,
  //       marital: storedData.marital,
  //       race: storedData.race,
  //       otherRace: storedData.otherRace,
  //       religion: storedData.religion,
  //       otherReligion: storedData.otherReligion,

  //       // personalDetails
  //       icNo: storedData.icNo,
  //       icExpiry: storedData.icExpiry,
  //       icColour: storedData.icColour,
  //       passportNo: storedData.passportNo,
  //       alternateNo: storedData.alternateNo,
  //       passportIssued: storedData.passportIssued,
  //       passportExpiry: storedData.passportExpiry,
  //       passportDestination: storedData.passportDestination,
  //       contactNo: storedData.contactNo,
  //       presentAddress: storedData.presentAddress,
  //       permanentAddress: storedData.permanentAddress,
  //       drivingLicense: storedData.drivingLicense,
  //       language: storedData.language,
  //       familyDetails: storedData.familyDetails,
  //       educationDetails: storedData.educationDetails,
  //       workExperience: storedData.workExperience,

  //       // educationDetails
  //       referees:
  //        storedData.referees?.map((referee) => ({
  //           name: referee.name,
  //           address: referee.address,
  //           phoneNumber: referee.phoneNumber,
  //           profession: referee.profession,
  //         })) || [],
  //       relatives:
  //        storedData.relatives?.map((relative) => ({
  //           name: relative.name,
  //           position: relative.position,
  //           relationship: relative.relationship,
  //         })) || [],
  //       description:storedData.description || "",
  //       emergencyContact:
  //        storedData.emergencyContact?.map((contact) => ({
  //           name: contact.name,
  //           relationship: contact.relationship,
  //           address: contact.address,
  //           phoneNumber: contact.phoneNumber,
  //           bloodGroup: contact.bloodGroup,
  //         })) || [],
  //       disease:storedData.disease || "",
  //       liquor:storedData.liquor || "",
  //       crime:storedData.crime || "",
  //       diseaseDescription:
  //        storedData.disease === "Yes"
  //           ?storedData.diseaseDescription || ""
  //           : "",
  //       liquorDescription:
  //        storedData.liquor === "Yes"
  //           ?storedData.liquorDescription || ""
  //           : "",
  //       crimeDescription:
  //        storedData.crime === "Yes"
  //           ?storedData.crimeDescription || ""
  //           : "",

  //       // otherDetails
  //       salaryException: storedData.salaryException || "",
  //       noticePeriod: storedData.noticePeriod || "",
  //       tempID: storedData.noticePeriod || "",
  //       perInterviewStatus: storedData.perInterviewStatus || "",
  //       perInterviewDescription:
  //         storedData.perInterviewStatus === "yes"
  //           ? storedData.perInterviewDescription || ""
  //           : "",
  //       supportInfo: storedData.supportInfo || "",
 
  //     };

  //     console.log(totalData);

  //     // Combine all form data
  //     const result = await client.graphql({
  //       query: createPersonalDetails,
  //       variables: {
  //         input: totalData ,
  //       },
  //     }).then((res)=>{
  //       console.log(res)

  //     }).catch((err)=>{
  //       console.log(err);
  //     })

  //     console.log("Successfully submitted:", result);

  //     // Clear localStorage after successful submission
  //     localStorage.removeItem('navigatingEducationData.applicationData');
  //     localStorage.removeItem('personalDetails');
  //     localStorage.removeItem('educationDetails');
  //     localStorage.removeItem('updatedValue');
  //   } catch (error) {
  //     console.log(error);

  //     console.error(
  //       "Error submitting data to AWS:",
  //       JSON.stringify(error, null, 2)
  //     );
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
      {/* Salary Expected */}
      <div className="mb-4">
        <label className="text_size_6 mb-2">Salary Expected</label>
        <input
          type="text"
          {...register("salaryException")}
          className="input-field"
        />
      </div>

      {/* Termination Notice */}
      <div className="mb-4">
        <label className="text_size_6 mb-2">
          Termination Notice for Present job (month/Date)
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
      <div className="mb-4">
        <label className="text_size_6 mb-2">
          Termination Notice for Present job (month/Date)
        </label>
        <input
          type="text"
          {...register("tempID")}
          className="input-field"
        />
        {errors.tempID && (
          <p className="text-[red] text-xs mt-1">
            {errors.tempID.message}
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
        name="perInterviewStatus"
        control={control}
        defaultValue="no" // Provide a default value
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
              defaultChecked // This ensures that "No" is checked by default
            />
            <label htmlFor="no" className="text_size_6">
              No
            </label>
          </>
        )}
      />
      {errors.perInterviewStatus && (
        <p className="text-[red] text-xs mt-1">
          {errors.perInterviewStatus.message}
        </p>
      )}
    </div>

    <div className="mt-4">
      <label className="w-full sm:w-[350px] text_size_7">
        If yes, please give Details
      </label>
      <Controller
        name="perInterviewDescription"
        control={control}
        defaultValue="" // Provide an initial value to avoid uncontrolled behavior
        render={({ field }) => (
          <input
            {...field}
            disabled={watch("perInterviewStatus") !== "yes"}
            className={`input-field ${
              errors.perInterviewDescription ? "border-[red]" : ""
            }`}
          />
        )}
      />
      {errors.perInterviewDescription && (
        <p className="text-[red] text-xs mt-4">
          {errors.perInterviewDescription.message}
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
        <textarea
          {...register("supportInfo")}
          className="resize-none input-field"
          rows="4"
        ></textarea>
      </div>

      <div className="flex items-start mb-4">
        <input
          type="checkbox"
          id="employeeStatement"
          {...register('employeeStatement', { required: 'This field is required' })}
          className="w-5 h-5 border-medium_grey rounded"
        />
        <label htmlFor="employeeStatement" className="ml-2 max-sm:text-[12px]">
          I Hereby Declare that every statement made by me in this form is true and correct and I understand and agree that any false declaration made by me may be ground for termination of my contract of employment without notice.
        </label>
      </div>
      {errors.employeeStatement && (
        <p className="text-[red] text-sm">{errors.employeeStatement.message}</p>
      )}

      <div className="text-center my-10">
        <button type="submit" className="primary_btn">
          Submit
        </button>
      </div>
    </form>
  );
};
