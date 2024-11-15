import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuPlusSquare } from "react-icons/lu";
import { EducationSchema } from "../../services/Validation"; // Adjust import as necessary
import { useLocation, useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
// import { createEducation } from "../../graphql/mutations"; 
const client = generateClient();

export const EducationDetails = () => {
  const location = useLocation();
  const [navigateEduData,setNavigateEduData]=useState("")
  const navigatingPersonalData = location.state?.FormData;
  // console.log("Received form data:", navigatingPersonalData );
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
      },[])
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(EducationSchema),
    defaultValues: {
      referees: [{ name: "", address: "", telephone: "", profession: "" }],
      relatives: [{ name: "", positionHeld: "", relationship: "" }],
      emergencyContact: [{ name: "", relationship: "", address: "", phoneNumber: "", bloodGroup: "" }],
      disease:"no",
      liquor:"no",
      crime:"no",
      diseaseDescription: "",
      liquorDescription: "",
      crimeDescription: "",

    },
  });
  const navigate = useNavigate();
  // const { handleNext } = useOutletContext();
  const { fields: emergencyContact, append: appendEmergency } = useFieldArray({
    control,
    name: "emergencyContact",
  });
  const { fields: referees, append: appendCharacterReferee } = useFieldArray({
    control,
    name: "referees",
  });
  const { fields: relatives, append: appendRelative } = useFieldArray({
    control,
    name: "relatives",
  });

  // const onSubmit = handleSubmit((data) => {
  //   console.log(data);
  //   localStorage.setItem('educationDetails', JSON.stringify(data));
  //   // handleNext();   
  //   navigate("/addCandidates/otherDetails");
  // });
  const onSubmit = (data) => {
    console.log(data);
    const navigatingEduData={
      ...data,
      ...navigatingPersonalData
    }
    // console.log(navigatingEduData);
    // setNavigateEduData(navigatingEduData)
    // handleNext();
    navigate("/addCandidates/otherDetails" ,{
      state: { FormData:navigatingEduData},
    });
  }
  // const onSubmit = async (data) => {
  // try {
   
  //   console.log(data);

  //   // Combine all form data
  //   const result = await client.graphql({
  //     query: createEducation,
  //     variables: {
  //       input: data ,
  //     }, 
  //   });
  //   console.log("Successfully submitted:hiiiiiiiii", result);
   
  // } catch (error) {
  //   console.log(error);
    
  //   console.error(
  //     "Error submitting data to AWS:",
  //     JSON.stringify(error, null, 2)
  //   );
  // } 
  // navigate("/addCandidates/personalDetails", {
  //   state: { FormData: data },
  // });
// };
console.log("Successfully submitted Three Data:",navigateEduData);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      {/* h-screen overflow-y-auto scrollbar-hide */}
      {/* Character Referees */}
      <div className="relative mt-10">
        <label className="text_size_6 mb-3">
          Characters Referees <span className="text-[#838383]">(Names of relatives should not be given)</span>
        </label>
        {referees.map((referee, index) => (
          <div key={referee.id} className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 mb-7">
            <Controller
              name={`referees.${index}.name`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Name"
                  className="input-field"
                />
              )}
            />
            <Controller
              name={`referees.${index}.address`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Address"
                  className="input-field"
                />
              )}
            />
            <Controller
              name={`referees.${index}.telephone`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Telephone"
                  className="input-field"
                />
              )}
            />
            <Controller
              name={`referees.${index}.profession`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Profession"
                  className="input-field"
                />
              )}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendCharacterReferee({ name: "", address: "", telephone: "", profession: "" })}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <LuPlusSquare />
        </button>
      </div>

      {/* Relatives Employed by the Company */}
      <div className="relative">
        <label className="text_size_6 mb-3">Relatives Employed by the company</label>
        {relatives.map((relative, index) => (
          <div key={relative.id} className="grid sm:grid-cols-3 gap-4 mb-7">
            <Controller
              name={`relatives.${index}.name`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Name"
                  className="input-field"
                />
              )}
            />
            <Controller
              name={`relatives.${index}.positionHeld`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Position Held"
                  className="input-field"
                />
              )}
            />
            <Controller
              name={`relatives.${index}.relationship`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Relationship"
                  className="input-field"
                />
              )}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendRelative({ name: "", positionHeld: "", relationship: "" })}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <LuPlusSquare />
        </button>
      </div>

      {/* Brief Description of Present Duties */}
      <div>
        <label className="text_size_6 mb-3">Brief Description of Present Duties</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="resize-none input-field"
              rows="3"
            ></textarea>
          )}
        />
      </div>

      {/* Emergency Contact */}
      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">In Case of Accident / Emergency</label>
        {emergencyContact.map((emergency, index) => (
          <div key={emergency.id} className="grid sm:grid-cols-3 md:grid-cols-5 gap-3 mb-2">
            <Controller
              name={`emergencyContact.${index}.name`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="Name of Person notify"
                    className="resize-none input-field"
                  />
                  {errors.emergencyContact?.[index]?.name && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.emergencyContact[index].name.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`emergencyContact.${index}.relationship`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="Relationship"
                    className="input-field"
                  />
                  {errors.emergencyContact?.[index]?.relationship && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.emergencyContact[index].relationship.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`emergencyContact.${index}.address`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="Address"
                    className="input-field"
                 
                  />
                  {errors.emergencyContact?.[index]?.address && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.emergencyContact[index].address.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`emergencyContact.${index}.phoneNumber`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="Contant Number"
                    className="input-field"
                  />
                  {errors.emergencyContact?.[index]?.phoneNumber && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.emergencyContact[index].phoneNumber.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`emergencyContact.${index}.bloodGroup`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="Blood Group"
                    className=" input-field"
                  />
                  {errors.emergencyContact?.[index]?.bloodGroup && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.emergencyContact[index].bloodGroup.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendEmergency({ name: "", relationship: "", address: "", phoneNumber: "", bloodGroup: "" })}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <LuPlusSquare />
        </button>
      </div>

     


    {/* Yes or NO */}

      {[
        { field: "disease", label: "Have you ever suffered from any disease or received treatment?" },
        { field: "liquor", label: "Were you ever an alcoholic or substance abuser?" },
        { field: "crime", label: "Have you ever been convicted of a crime?" },
      ].map((section, idx) => (
        <div key={idx} className="grid grid-cols-1 gap-4 text_size_6 mt-5 ">
          <div>
            <label htmlFor={section.field} className="text_size_6 mb-2">{section.label}</label>
          </div>
          <div className="flex max-sm:flex-col justify-between items-center mb-5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Controller
                  name={section.field}
                  control={control}
                  defaultValue="no" // Set initial value
                  render={({ field }) => (
                    <>
                      <input
                        type="radio"
                        id={`${section.field}_yes`}
                        {...field}
                        value="yes"
                        name={`${section.field}`}
                        className="border p-2.5 rounded"
                      />
                      <label htmlFor={`${section.field}_yes`}>Yes</label>
                    </>
                  )}
                />
              </div>
              <div className="flex items-center gap-2">
                <Controller
                  name={section.field}
                  control={control}
                  defaultValue="no" // Set initial value
                  render={({ field }) => (
                    <>
                      <input
                        type="radio"
                        id={`${section.field}_no`}
                        {...field}
                        value="no"
                        name={`${section.field}`}
                        defaultChecked
                        className="border p-2.5 rounded"
                      />
                      <label htmlFor={`${section.field}_no`}>No</label>
                    </>
                  )}
                />
              </div>
            </div>

            {/* Conditional Description Input */}
            <div className="items-center max-sm:mt-4">
              <label htmlFor={`${section.field}Description`} className="text_size_7  text-[#C7C7C7]">
                If yes, please provide details
              </label>
              <Controller
                name={`${section.field}Description`}
                control={control}
                defaultValue="" // Set initial value
                render={({ field }) => (
                  <input
                    id={`${section.field}Description`}
                    {...field}
                    className={`w-full sm:w-[450px] mt-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded ${
                      errors[`${section.field}Description`] ? "border-red-500" : ""
                    }`}
                    disabled={watch(section.field) !== "yes"} // Disable when "No" is selected
                  />
                )}
              />
              {errors[`${section.field}Description`] && (
                <p className="text-[red] text-xs mt-4">
                  {errors[`${section.field}Description`]?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    



      {/* Submit Button */}
      <div className="flex justify-center my-7 gap-10">
        <button  type="submit" className="primary_btn">
          Next
        </button>
      </div>
    </form>
  );
};
// import React from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { LuPlusSquare } from "react-icons/lu";
// import { CandidatesSchema } from "../../services/Validation"; // Adjust import as necessary

// export const EducationDetails = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     watch,
//   } = useForm({
//     resolver: yupResolver(CandidatesSchema),
//   });

//   const { fields: emergencyContact, append: appendEmergency } = useFieldArray({
//     control,
//     name: "emergencyContact",
//   });
//   const { fields: referees, append: appendCharacterReferee } = useFieldArray({
//     control,
//     name: "characterReferees",
//   });
//   const { fields: relatives, append: appendRelative } = useFieldArray({
//     control,
//     name: "relatives",
//   });

//   const onSubmit = handleSubmit((data) => {
//     console.log(data);
//     window.location.href = "/recruitment/otherDetails";
//   });

//   return (
//     <form onSubmit={onSubmit} className="scrollbar-hide">
//       {/* Character Referees */}
//       <div className="relative mt-10">
//         <label className="text_size_6 mb-3">
//           Characters Referees <span className="text-[#838383]">(Names of relatives should not be given)</span>
//         </label>
//         {characterReferees.map((referee, index) => (
//           <div key={referee.id} className="flex gap-2 mb-7">
//             <input
//               type="text"
//               {...register(`characterReferees.${index}.name`)}
//               placeholder="Name"
//               className="mt-2 p-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//             />
//             <input
//               type="text"
//               {...register(`characterReferees.${index}.address`)}
//               placeholder="Address"
//               className="mt-2 p-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//             />
//             <input
//               type="text"
//               {...register(`characterReferees.${index}.telephone`)}
//               placeholder="Telephone"
//               className="mt-2 p-2 text_size_7 w-[150px] p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//             />
//             <input
//               type="text"
//               {...register(`characterReferees.${index}.profession`)}
//               placeholder="Profession"
//               className="mt-2 p-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => appendCharacterReferee({ name: "", address: "", telephone: "", profession: "" })}
//           className="absolute top-10 -right-7 text-medium_grey"
//         >
//           <LuPlusSquare />
//         </button>
//       </div>

//       {/* Relatives Employed by the Company */}
//       <div className="relative">
//         <label className="text_size_6 mb-3">Relatives Employed by the company</label>
//         {relatives.map((relative, index) => (
//           <div key={relative.id} className="grid grid-cols-3 gap-4 mb-7">
//             <input
//               type="text"
//               {...register(`relatives.${index}.name`)}
//               placeholder="Name"
//               className="mt-2 p-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//             />
//             <input
//               type="text"
//               {...register(`relatives.${index}.positionHeld`)}
//               placeholder="Position Held"
//               className="mt-2 p-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//             />
//             <input
//               type="text"
//               {...register(`relatives.${index}.relationship`)}
//               placeholder="Relationship"
//               className="mt-2 p-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => appendRelative({ name: "", positionHeld: "", relationship: "" })}
//           className="absolute top-10 -right-7 text-medium_grey"
//         >
//           <LuPlusSquare />
//         </button>
//       </div>

//       {/* Brief Description of Present Duties */}
//       <div>
//         <label className="text_size_6 mb-3">Brief Description of Present Duties</label>
//         <textarea
//           {...register("duties")}
//           className="resize-none mt-2 p-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
//           rows="3"
//         ></textarea>
//       </div>

//       {/* Emergency Contact */}
//       <div className="mb-4 relative text_size_6">
//         <label className="block mb-1">In Case of Accident / Emergency</label>
//         {emergencyContact.map((emergency, index) => (
//           <div key={emergency.id} className="flex gap-4 mb-2">
//             <Controller
//               name={`emergencyContact.${index}.name`}
//               control={control}
//               render={({ field }) => (
//                 <div className="flex flex-col">
//                   <input
//                     {...field}
//                     placeholder="Name"
//                     className="resize-none text_size_9 mt-2 p-2 w-[250px] p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//                   />
//                   {errors.emergencyContact?.[index]?.name && (
//                     <p className="text-[red] text-xs mt-1">
//                       {errors.emergencyContact[index].name.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <Controller
//               name={`emergencyContact.${index}.relationship`}
//               control={control}
//               render={({ field }) => (
//                 <div className="flex flex-col">
//                   <input
//                     {...field}
//                     placeholder="Relationship"
//                     className="resize-none mt-2 p-2 text_size_9 w-[120px] p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//                   />
//                   {errors.emergencyContact?.[index]?.relationship && (
//                     <p className="text-[red] text-xs mt-1">
//                       {errors.emergencyContact[index].relationship.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <Controller
//               name={`emergencyContact.${index}.address`}
//               control={control}
//               render={({ field }) => (
//                 <div className="flex flex-col">
//                   <input
//                     {...field}
//                     placeholder="Address"
//                     className="resize-none mt-2 p-2 text_size_9 w-[120px] p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//                     rows="3"
//                   />
//                   {errors.emergencyContact?.[index]?.address && (
//                     <p className="text-[red] text-xs mt-1">
//                       {errors.emergencyContact[index].address.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <Controller
//               name={`emergencyContact.${index}.phoneNumber`}
//               control={control}
//               render={({ field }) => (
//                 <div className="flex flex-col">
//                   <input
//                     {...field}
//                     placeholder="Phone Number"
//                     className="resize-none mt-2 p-2 w-[280px] p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded text_size_9"
//                   />
//                   {errors.emergencyContact?.[index]?.phoneNumber && (
//                     <p className="text-[red] text-xs mt-1">
//                       {errors.emergencyContact[index].phoneNumber.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <Controller
//               name={`emergencyContact.${index}.bloodGroup`}
//               control={control}
//               render={({ field }) => (
//                 <div className="flex flex-col">
//                   <input
//                     {...field}
//                     placeholder="Blood Group"
//                     className="resize-none mt-2 p-2 text_size_9 w-[120px] p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//                   />
//                   {errors.emergencyContact?.[index]?.bloodGroup && (
//                     <p className="text-[red] text-xs mt-1">
//                       {errors.emergencyContact[index].bloodGroup.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => appendEmergency({ name: "", relationship: "", address: "", phoneNumber: "", bloodGroup: "" })}
//           className="absolute top-0 right-0 text-medium_grey"
//         >
//           <LuPlusSquare />
//         </button>
//       </div>

//       {/* Health, Substance Abuse, Crime Conviction */}
//       {["disease", "substanceAbuse", "crimeConviction"].map((section, idx) => (
//         <div key={idx} className="grid grid-cols-1 gap-4 text_size_6 mt-5">
//           <div>
//             <label className="text_size_6 mb-2">
//               {section === "disease"
//                 ? "Have you ever suffered From or Experienced or Received Treatment for any Disease and conditions?"
//                 : section === "substanceAbuse"
//                 ? "Were you ever an Alcoholic, Drug Addict or Abuser of Substances, Like Glue Sniffing?"
//                 : "Have you ever Been Convicted of a Crime in any court of law?"}
//             </label>
//           </div>
//           <div className="flex justify-between items-center mb-5">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   {...register(`${section}`)}
//                   value="yes"
//                   className="border p-2 rounded"
//                 />
//                 <label>Yes</label>
//               </div>
//               <div className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   {...register(`${section}`)}
//                   value="no"
//                   className="border p-2 rounded"
//                 />
//                 <label>No</label>
//               </div>
//             </div>
//             <div className="flex justify-center gap-3 items-center">
//               <label className="text_size_7">If yes, please give Details</label>
//               <input
//                 type="text"
//                 {...register(`${section}Details`)}
//                 className="w-[450px] mt-2 p-2 text_size_7 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
//                 disabled={watch(`${section}`) !== "yes"} // Disable when "No" is selected
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Submit Button */}
//       <div className="flex justify-center my-7 gap-10">
//         <button type="submit" className="primary_btn">
//           Next
//         </button>
//       </div>
//     </form>
//   );
// };
