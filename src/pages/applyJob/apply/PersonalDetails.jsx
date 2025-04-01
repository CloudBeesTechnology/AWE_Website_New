import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalSchema } from "../../services/Validation";
import { FiPlusSquare } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { ChevronDown } from "lucide-react";
import { FaRegWindowClose } from "react-icons/fa";
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
      familyDetails: [{}],
      eduDetails: [{ university: "", fromDate: "", toDate: "", degree: "" }],
      workExperience: [{}], 
      lang:[],
      ...JSON.parse(localStorage.getItem("personalFormData")) || {},
    },

  });

  useEffect(() => {
    const savedData = () => {
      localStorage.removeItem("personalFormData"); // Clear data on refresh or tab close
      localStorage.removeItem("position");
      localStorage.clear();
    };
    // Add event listener for unload
    window.addEventListener("beforeunload", savedData);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", savedData);
    };
  }, []);

  const {
    fields: familyFields,
    append: appendFamily,
    remove: removeFamily,
  } = useFieldArray({
    control,
    name: "familyDetails",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "eduDetails",
  });

  const {
    fields: employmentFields,
    append: appendEmployment,
    remove: removeEmployment,
  } = useFieldArray({
    control,
    name: "workExperience",
  });

  const handleAddFamily = () => {
    // Append a new empty field set with isNew flag to identify it as newly added
    appendFamily({ isNew: true });
  };
  const handleAddEducation = () => {
    // Append a new empty field set with isNew flag to identify it as newly added
    appendEducation({ isNew: true });
  };
  const handleAddEmployment = () => {
    // Append a new empty field set with isNew flag to identify it as newly added
    appendEmployment({ isNew: true });
  };

  const navigate = useNavigate();
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Mandarin", label: "Mandarin" },
    { value: "Malay", label: "Malay" },
    // { value: "Other", label: "Other" },
  ];
  const [isOpen, setIsOpen] = useState(false); // For dropdown visibility
  const [showOtherLangInput, setShowOtherLangInput] = useState(false);
  const [otherLanguage, setOtherLanguage] = useState("");


  // const { handleNext } = useOutletContext();
  const onSubmit = (data) => {
    // const personalData = data;
    // console.log(data);
    try {

    const navigatingData = {
      ...data,
      eduDetails: JSON.stringify(data.eduDetails),
      familyDetails: JSON.stringify(data.familyDetails),
      workExperience: JSON.stringify(data.workExperience),
      ...applicationData,
    };
    localStorage.setItem("personalFormData", JSON.stringify(navigatingData));

    // setNavigateData(navigatingData);
    // handleNext();
    navigate("/addCandidates/educationDetails", {
      state: { FormData: navigatingData },
    })}catch (error) {
      console.log(error);
    }
    // console.log(navigatingData);
  };

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
            {...register("driveLic")}
            className="input-field"
          />
        </div>
        <div className="relative">
  <label className="block mb-1">Language Proficiency</label>

<Controller
  name="lang"
  control={control}
  render={({ field: { onChange, value } }) => {
    const normalizedValue = Array.isArray(value) ? value : [];

    // Check if "Other" is selected
    const isOtherSelected = normalizedValue.includes("Other");

    return (
      <>
        {/* Select Dropdown */}
        <div
          className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border bg-white border-[#dedddd] text-dark_grey outline-none rounded w-full flex items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            type="text"
            className="w-full outline-none cursor-pointer bg-transparent"
            value={normalizedValue.join(", ")}
            readOnly
            placeholder="Select options"
          />
          <ChevronDown className="w-5 h-5 text-grey" />
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute left-0 w-full mt-2 bg-white border-[#dedddd] border rounded-lg shadow-lg z-10">
            <div className=" absolute right-5 top-5 cursor-pointer" onClick={() => setIsOpen(false)}>
<FaRegWindowClose/>
            </div>
            <ul className="p-2">
              {languageOptions.map((option) => (
                <li key={option.value} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                  <input
                    type="checkbox"
                    id={`lang-${option.value}`}
                    checked={normalizedValue.includes(option.value)}
                    onChange={() => {
                      let newValue = normalizedValue.includes(option.value)
                        ? normalizedValue.filter(item => item !== option.value)
                        : [...normalizedValue, option.value];

                      onChange(newValue); // Update form field
                    }}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`lang-${option.value}`} className="cursor-pointer">
                    {option.label}
                  </label>
                </li>
              ))}
              {/* Other Language Option */}
              <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                <input
                  type="checkbox"
                  id="lang-other"
                  checked={isOtherSelected}
                  onChange={() => {
                    if (isOtherSelected) {
                      onChange(normalizedValue.filter(item => item !== "Other"));
                      setOtherLanguage(""); // Reset input field
                    } else {
                      onChange([...normalizedValue, "Other"]);
                    }
                  }}
                  className="w-4 h-4"
                />
                <label htmlFor="lang-other" className="cursor-pointer">
                  Other
                </label>
              </li>
            </ul>
          </div>
        )}

        {/* Show Input Field for Other Language */}
        {isOtherSelected && (
          <input
            {...register("otherLang")}
            type="text"
            className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
            placeholder="Specify other language"
            value={otherLanguage}
            onChange={(e) => setOtherLanguage(e.target.value)}
          />
        )}
      </>
    );
  }}
/>

{errors.lang && <p className="text-[red] text-[12px]">{errors.lang.message}</p>}
{errors.otherLang && <p className="text-[red] text-[12px]">{errors.otherLang.message}</p>}
</div>
      </div>

      {/* I/C No and I/C Colour */}
      <div className="grid sm:grid-cols-3 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Brunei I/C No</label>
          <input type="text" {...register("bwnIcNo")} className="input-field" />
          {errors.bwnIcNo && (
            <p className="text-[red] text-[12px] ">{errors.bwnIcNo.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Brunei I/C Colour</label>
          <select {...register("bwnIcColour")} className="input-field select-custom">
            <option value=""></option>
            <option value="Yellow">Yellow</option>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Purple">Purple</option>
          </select>
          {errors.bwnIcColour && (
            <p className="text-[red] text-[12px]">{errors.bwnIcColour.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Brunei I/C Expiry</label>
          <input
            type="date"
            {...register("bwnIcExpiry")}
            className="input-field"
          />
          {errors.bwnIcExpiry && (
            <p className="text-[red] text-[12px]">{errors.bwnIcExpiry.message}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4 text_size_6">
        <div>
          <label className="block mb-1">Passport Number</label>
          <input
            type="text"
            {...register("ppNo")}
            className="input-field"
          />
          {errors.ppNo && (
            <p className="text-[red] text-[12px] ">
              {errors.ppNo.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport issued date</label>
          <input
            type="date"
            {...register("ppIssued")}
            className="input-field"
          />
          {errors.ppIssued && (
            <p className="text-[red] text-[12px]">
              {errors.ppIssued.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport Expiry</label>
          <input
            type="date"
            {...register("ppExpiry")}
            className="input-field"
          />
          {errors.ppExpiry && (
            <p className="text-[red] text-[12px]">
              {errors.ppExpiry.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Passport issued destination</label>
          <input
            type="text"
            {...register("ppDestinate")}
            className="input-field"
          />
          {errors.ppDestinate && (
            <p className="text-[red] text-[12px]">
              {errors.ppDestinate.message}
            </p>
          )}
        </div>
      </div>
      {/* Family Details */}
      <div className=" mb-4 relative text_size_6">
        <label className="block mb-1">
          Particulars of Immediate Family (Spouse, Children, Parents, Brothers &
          Sisters)
        </label>
        {familyFields.map((family, index) => (
          <div key={family.id} className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-5 gap-4 mb-2">
            <input
              type="text"
              {...register(`familyDetails.${index}.name`)}
              placeholder="Name"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.relationship`)}
              placeholder="Relationship"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.age`)}
              placeholder="Age"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.occupation`)}
              placeholder="Occupation"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`familyDetails.${index}.placeOfOccupation`)}
              placeholder="Place of Occupation"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            {family.isNew && (
              <button
                type="button"
                onClick={() => removeFamily(index)} // Remove specific field set
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> {/* Minus icon */}
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddFamily}
          // onClick={() => appendFamily({})}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>

      {/* Education Details */}
      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">Education Details</label>
        {educationFields.map((education, index) => (
          <div key={education.id} className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            <Controller
              name={`eduDetails.${index}.university`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="School / University / Professional Institute"
                    className="resize-none text_size_9 mt-2 p-2.5 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />

                  {errors.eduDetails?.[index]?.university && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].university.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`eduDetails.${index}.fromDate`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    type="date"
                    placeholder="From Date"
                    className="resize-none mt-2 p-2.5 text_size_9  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
                  {errors.eduDetails?.[index]?.fromDate && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].fromDate.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`eduDetails.${index}.toDate`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    type="date"
                    placeholder="To Date"
                    className="resize-none mt-2 p-2.5 text_size_9  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
                  />
                  {errors.eduDetails?.[index]?.toDate && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].toDate.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name={`eduDetails.${index}.degree`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <input
                    {...field}
                    placeholder="Highest Standard / Passed / Certificate / Degree / Professional Qualification"
                    className="resize-none mt-2 p-2.5  bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded text_size_9"
                  />
                  {errors.eduDetails?.[index]?.degree && (
                    <p className="text-[red] text-xs mt-1">
                      {errors.eduDetails[index].degree.message}
                    </p>
                  )}
                </div>
              )}
            />
            {education.isNew && (
              <button
                type="button"
                onClick={() => removeEducation(index)} // Remove specific field set
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> {/* Minus icon */}
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEducation}
          // onClick={() => appendEducation({})}
          className="absolute top-12 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
        </button>
      </div>

      {/* Employment Details */}
      <div className="mb-4 relative text_size_6">
        <label className="block mb-1">
          Previous Employment Including Temporary Work
        </label>
        {employmentFields.map((employment, index) => (
          <div key={employment.id} className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-2">
            <input
              type="text"
              {...register(`workExperience.${index}.name`)}
              placeholder="Name and Address"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.position`)}
              placeholder="Position Held"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="date"
              {...register(`workExperience.${index}.from`)}
              placeholder="From"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="date"
              {...register(`workExperience.${index}.to`)}
              placeholder="To"
              className="mt-2 p-2.5 max-sm-w-full text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.salary`)}
              placeholder="Salary"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />
            <input
              type="text"
              {...register(`workExperience.${index}.reasonForLeaving`)}
              placeholder="Reason for Leaving"
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded"
            />

            {employment.isNew && (
              <button
                type="button"
                onClick={() => removeEmployment(index)} // Remove specific field set
                className="absolute top-15 -right-7 text-medium_grey text-[18px]"
              >
                <FaRegMinusSquare /> {/* Minus icon */}
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEmployment}
          // onClick={() => appendEmployment({})}
          className="absolute top-11 -right-7 text-medium_grey text-[18px]"
        >
          <CiSquarePlus />
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
