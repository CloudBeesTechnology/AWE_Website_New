import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalSchema } from "../../services/Validation";
import { LuPlusSquare } from "react-icons/lu";
import { useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
// import { createPersona } from "../../graphql/mutations"; 
const client = generateClient();

export const PersonalDetails = () => {
  const location = useLocation();
  const [navigateData, setNavigateData] = useState("");
  const applicationData = location.state?.FormData;

  // console.log("Received form data:", applicationData);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PersonalSchema),
    defaultValues: {
      familyDetails: [{}], // Initialize with one empty family detail
      educationDetails: [
        { university: "", fromDate: "", toDate: "", degree: "" },
      ], // Initialize with one empty education detail
      workExperience: [{}], // Initialize with one empty employment detail
    },
  });
  const { fields: familyFields, append: appendFamily } = useFieldArray({
    control,
    name: "familyDetails",
  });

  const { fields: educationFields, append: appendEducation } = useFieldArray({
    control,
    name: "educationDetails",
  });

  const { fields: employmentFields, append: appendEmployment } = useFieldArray({
    control,
    name: "workExperience",
  });
  const navigate = useNavigate();

  // const { handleNext } = useOutletContext();
  const onSubmit =  (data) => {
    // const personalData = data;
    // console.log(data);
    const navigatingData = {
      ...data,
      ...applicationData,
    };
    // setNavigateData(navigatingData);
    // handleNext();
     navigate("/addCandidates/educationDetails", {
      state: { FormData: navigatingData },
    });
    // console.log(navigatingData);
  };
  // const onSubmit = async (data) => {
  //   try {

  //     console.log(data);

  //     // // Combine all form data
  //     // const result = await client.graphql({
  //     //   query: createPersona,
  //     //   variables: {
  //     //     input: data ,
  //     //   },

  //     // });
  //     // console.log(result);

  //     // console.log("Successfully submitted:", result);

  //   } catch (error) {
  //     console.log(error);

  //     // console.error(
  //     //   "Error submitting data to AWS:",
  //     //   JSON.stringify(error, null, 2)
  //     // );
  //   } navigate("/addCandidates/personalDetails", {
  //     state: { FormData: data },
  //   });
  // };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto py-6">
      {/* h-screen overflow-y-auto scrollbar-hide */}
      {/* Passport No and Contact No */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Alternate Number</label>
          <input
            type="text"
            {...register("alternateNo")}
            className="input-field"
          />
          {errors.alternateNo && (
            <p className="text-[red] text-[12px]">
              {errors.alternateNo.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Contact Number</label>
          <input
            type="text"
            {...register("contactNo")}
            className="input-field"
          />
          {errors.contactNo && (
            <p className="text-[red] text-[12px]">{errors.contactNo.message}</p>
          )}
        </div>
      </div>

      {/* Present Address and Permanent Address */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Present Address</label>
          <input
            type="text"
            {...register("presentAddress")}
            className="input-field"
          />
          {errors.presentAddress && (
            <p className="text-[red] text-[12px]">
              {errors.presentAddress.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Permanent Address</label>
          <input
            type="text"
            {...register("permanentAddress")}
            className="input-field"
          />
          <p className="text-[red] text-[12px]">
            {errors.permanentAddress?.message}
          </p>
        </div>
      </div>

      {/* Driving License Class and Language Proficiency */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Driving License Class</label>
          <input
            type="text"
            {...register("drivingLicense")}
            className="input-field"
          />
        </div>
        <div>
          <label className="block mb-1">Language Proficiency</label>
          <select
            {...register("language")}
            className="input-field"
          >
            <option value=""></option>
            <option value="English">English</option>
            <option value="Mandarin">Mandarin</option>
            <option value="Malay">Malay</option>
            <option value="Tamil">Tamil</option>
            <option value="Other">Other</option>
          </select>
          {errors.language && (
            <p className="text-[red] text-[12px]">{errors.language.message}</p>
          )}
        </div>
      </div>

      {/* I/C No and I/C Colour */}
      <div className="grid sm:grid-cols-3 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Brunei I/C No</label>
          <input
            type="text"
            {...register("icNo")}
            className="input-field"
          />
          {errors.icNo && (
            <p className="text-[red] text-[12px] ">{errors.icNo.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Brunei I/C Colour</label>
          <select
            {...register("icColour")}
            className="input-field"
          >
            <option value=""></option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="pink">Red</option>
          </select>
          {errors.icColour && (
            <p className="text-[red] text-[12px]">{errors.icColour.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Brunei I/C Expiry</label>
          <input
            type="text"
            {...register("icExpiry")}
            className="input-field"
          />
          {errors.icExpiry && (
            <p className="text-[red] text-[12px]">{errors.icExpiry.message}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Passport Number</label>
          <input
            type="text"
            {...register("passportNo")}
            className="input-field"
          />
          {errors.passportNo && (
            <p className="text-[red] text-[12px] ">
              {errors.passportNo.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport issued date</label>
          <input
            type="text"
            {...register("passportIssued")}
            className="input-field"
          />
          {errors.passportIssued && (
            <p className="text-[red] text-[12px]">
              {errors.passportIssued.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport Expiry</label>
          <input
            type="text"
            {...register("passportExpiry")}
            className="input-field"
          />
          {errors.passportExpiry && (
            <p className="text-[red] text-[12px]">
              {errors.passportExpiry.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport issued destination</label>
          <input
            type="text"
            {...register("passportDestination")}
            className="input-field"
          />
          {errors.passportDestination && (
            <p className="text-[red] text-[12px]">
              {errors.passportDestination.message}
            </p>
          )}
        </div>
      </div>
      {/* Family Details */}
      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">
          Particulars of Immediate Family (Spouse, Children, Parents, Brothers &
          Sisters)
        </label>
        {familyFields.map((family, index) => (
          <div key={family.id} className="grid sm:grid-cols-3 md:grid-cols-5 gap-4 mb-2">
            <input
              type="text"
              {...register(`familyDetails.${index}.name`)}
              placeholder="Name"
              className="input-field"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.relationship`)}
              placeholder="Relationship"
              className="input-field"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.age`)}
              placeholder="Age"
              className="input-field"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.occupation`)}
              placeholder="Occupation"
              className="input-field"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.placeOfOccupation`)}
              placeholder="Place of Occupation"
              className="input-field"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendFamily({})}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <LuPlusSquare />
        </button>
      </div>

      {/* Education Details */}
      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">Education Details</label>
        {educationFields.map((education, index) => (
          <div key={education.id} className="grid sm:grid-cols-2 md:grid-cols-4  gap-4 mb-2">
            <Controller
              name={`educationDetails.${index}.university`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    placeholder="School / University / Professional Institute"
                    className="resize-none input-field"
                  />

                  {errors.educationDetails?.[index]?.university && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.educationDetails[index].university.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`educationDetails.${index}.fromDate`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    type="date"
                    placeholder="From Date"
                    className="resize-none input-field"
                  ></textarea>
                  {errors.educationDetails?.[index]?.fromDate && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.educationDetails[index].fromDate.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`educationDetails.${index}.toDate`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    type="date"
                    placeholder="To Date"
                    className="resize-none input-field"
                  ></textarea>
                  {errors.educationDetails?.[index]?.toDate && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.educationDetails[index].toDate.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`educationDetails.${index}.degree`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    placeholder="Highest Standard / Passed / Certificate / Degree / Professional Qualification"
                    className="resize-none input-field"
                  />
                  {errors.educationDetails?.[index]?.degree && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.educationDetails[index].degree.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendEducation({})}
          className="absolute top-12 -right-7 text-medium_grey text-[18px]"
        >
          <LuPlusSquare />
        </button>
      </div>

      {/* Employment Details */}
      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">
          Previous Employment Including Temporary Work
        </label>
        {employmentFields.map((employment, index) => (
          <div key={employment.id} className="grid sm:grid-cols-3 md:grid-cols-6 gap-4 mb-2">
            <input
              type="text"
              {...register(`workExperience.${index}.name`)}
              placeholder="Name and Address"
              className="input-field"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.position`)}
              placeholder="Position Held"
              className="input-field"
            />
            <input
              type="date"
              {...register(`workExperience.${index}.from`)}
              placeholder="From"
              className="input-field"
            />
            <input
              type="date"
              {...register(`workExperience.${index}.to`)}
              placeholder="To"
              className="input-field"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.salary`)}
              placeholder="Salary"
              className="input-field"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.reasonForLeaving`)}
              placeholder="Reason for Leaving"
              className="input-field"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendEmployment({})}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <LuPlusSquare />
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-12 gap-10">
        <button type="submit" className="primary_btn">
          Next
        </button>
      </div>
    </form>
  );
};
