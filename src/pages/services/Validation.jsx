import * as Yup from "yup";

export const ApplicantSchema = Yup.object({
  // profilePhoto: Yup.mixed()
  //   .required("Upload Photo is mandatory")
  //   .test("fileType", "Profile photo must be a JPG or PNG file", (value) =>
  //     value ? /\.(jpg|jpeg|png)$/.test(value.name) : false
  //   ),
  profilePhoto: Yup.string().required("Upload Photo is mandatory"),
  position: Yup.string().required("Position is mandatory"),
  // contractType: Yup.string().required("Contract Type mandatory"),
  // employeeType: Yup.string().required("Employee Type mandatory"),
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is mandatory"),
  chinese: Yup.string().notRequired(),
  gender: Yup.string().required("Gender is mandatory"),
  // age: Yup.string().required("age is mandatory"),
  dateOfBirth: Yup.string().required("Date of Birth is mandatory"),
  age: Yup.number()
    .min(20, "Age must be at least 20")
    .max(99, "Age cannot exceed 99")
    .required("Age is required"),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),  countryOfBirth: Yup.string().required("Country of Birth is mandatory"),
  nationality: Yup.string().required("Nationality is mandatory"),
  otherNationality: Yup.string().when("nationality", {
    is: (value) => value && value.trim().toLowerCase() === "other",
    then: () => Yup.string().required("Other Nationality is required"),
    otherwise: () => Yup.string(),
  }),
  marital: Yup.string().required("Marital status is mandatory"),
  race: Yup.string().required("Race is mandatory"),
  otherRace: Yup.string().when("race", {
    is: (value) => value && value.trim().toLowerCase() === "other",
    then: () => Yup.string().required("Other Race is required"),
    otherwise: () => Yup.string(),
  }),
  religion: Yup.string().required("Religion is mandatory"),
  otherReligion: Yup.string().when("religion", {
    is: (value) => value && value.trim().toLowerCase() === "other",
    then: () => Yup.string().required("Other religion is required"),
    otherwise: () => Yup.string(),
  }),
});

export const PersonalSchema = Yup.object({
  bwnIcNo: Yup.string()
  .notRequired(),
    // .matches(
    //   /^\d{2}-\d{6}$/,
    //   "I/C Number must be in the format XX-XXXXXX, where X is a digit"
    // ),
    bwnIcExpiry: Yup.string().notRequired(),
  bwnIcColour: Yup.string().notRequired(),
  ppNo: Yup.string().notRequired(),
  alternateNo: Yup.string().notRequired(),
  ppIssued: Yup.string().notRequired(),
  ppExpiry: Yup.string().notRequired(),
  ppDestinate: Yup.string().notRequired(),
  contactNo: Yup.string().required("Contact Number is mandatory"),
  presentAddress: Yup.string().required("Present Address is mandatory"),
  permanentAddress: Yup.string().required("Permanent Address is mandatory"),
  driveLic: Yup.string().notRequired(),
  lang: Yup.string().required("Language is mandatory"),
  familyDetails: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().notRequired(),
        relationship: Yup.string().notRequired(),
        age: Yup.string().notRequired(),
        occupation: Yup.string().notRequired(),
        place: Yup.string().notRequired(),
      })
    )
    .notRequired(),
    eduDetails: Yup.array()
    .of(
      Yup.object().shape({
        university: Yup.string().required("University Name is mandatory "),
        fromDate: Yup.string().required("From Date is mandatory"),
        toDate: Yup.string().required("To Date is mandatory"),
        degree: Yup.string().required("Degree is mandatory"),
      })
    )
    .required("At least one education detail is mandatory"),
  workExperience: Yup.array().of(
    Yup.object().shape({
      fromDate: Yup.string().notRequired(),
      toDate: Yup.string().notRequired(),
      companyAndAddress: Yup.string().notRequired(),
      position: Yup.string().notRequired(),
      salary: Yup.string().notRequired(),
      reasonLeaving: Yup.string().notRequired(),
    })
  ),
});
export const EducationSchema = Yup.object({
  referees: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().notRequired(),
        address: Yup.string().notRequired(),
        phoneNumber: Yup.string().notRequired(),
        profession: Yup.string().notRequired(),
      })
    )
    .notRequired(),
  relatives: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().notRequired(),
        position: Yup.string().notRequired(),
        relationship: Yup.string().notRequired(),
      })
    )
    .notRequired(),
    desc: Yup.string().notRequired(),
    emgDetails: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Name is mandatory"),
        relationship: Yup.string().required("Relationship is mandatory"),
        address: Yup.string().required("Address is mandatory"),
        phoneNumber: Yup.string().required("Phone Number is mandatory"),
        bloodGroup: Yup.string().required("Blood Group is mandatory"),
      })
    )
    .required("At least one emergency contact is mandatory"),
  disease: Yup.string().notRequired(),
  liquor: Yup.string().notRequired(),
  crime: Yup.string().notRequired(),
  diseaseDesc: Yup.string().when("disease", {
    is: (value) => value && value.trim().toLowerCase() === "yes",
    then: () =>
      Yup.string().notRequired(),
    otherwise: () => Yup.string(),
  }),
  liquorDesc: Yup.string().when("liquor", {
    is: (value) => value && value.trim().toLowerCase() === "yes",
    then: () => Yup.string().notRequired(),
    otherwise: () => Yup.string(),
  }),
  crimeDesc: Yup.string().when("crime", {
    is: (value) => value && value.trim().toLowerCase() === "yes",
    then: () => Yup.string().notRequired(),
    otherwise: () => Yup.string(),
  }),
});

export const CandidatesSchema = Yup.object().shape({
  salaryExpectation: Yup.string().notRequired(),
  noticePeriod: Yup.string().required("Notice period is required"),
  empStatement: Yup.string().required("Employee Statement is required"),
  perIS: Yup.string().required("Interview status is required"),
  perIDesc: Yup.string().when("perInterviewStatus", {
    is: (value) => value && value.trim().toLowerCase() === "yes",
    then: () =>
      Yup.string().notRequired(),
    otherwise: () => Yup.string(),
  }),
  supportInfo: Yup.string(),
  uploadResume: Yup.string().required("Resume is required"),
  uploadCertificate: Yup.string().required("Certificate is required"),
  uploadPp:Yup.string().required("Passport is required")
  // uploadResume: Yup.mixed()
  // .required("Resume is required")
  // .test("fileType", "Only PDF format is allowed for the resume", (value) => {
  //   return value && /\.(pdf)$/i.test(value.name);
  // }),


// uploadCertificate: Yup.mixed()
//  .required("Certificate is required")
//  .test("fileType", "Only JPG and PNG formats are allowed for certificates", (value) => {
//    return (
//      value && value.length > 0 &&
//      (value[0].type === "image/jpeg" || value[0].type === "image/png")
//    );
//  }),

// uploadPp: Yup.mixed()
//  .required("Passport is required")
//  .test("fileType", "Only JPG and PNG formats are allowed for passports", (value) => {
//    return (
//      value && value.length > 0 &&
//      (value[0].type === "image/jpeg" || value[0].type === "image/png")
//    );
//  }),

  });
 // Define the validation schema using Yup