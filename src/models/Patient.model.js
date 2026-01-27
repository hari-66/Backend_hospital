// import mongoose from "mongoose";

// const patientSchema = new mongoose.Schema(
//   {
//     /* STEP 1 */
//     hospitalName: String,
//     infantFirstName: String,
//     dateOfBirth: Date,
//     sex: String,
//     birthWeight: Number,
//     motherName: String,
//     contactNumber: String,
//     address: String,

//     /* STEP 2 */
//     pregnancyInfo: {
//       complications: String,
//       durationWeeks: Number,
//       ageInMonths: Number,
//       consanguinity: String,
//       previousPregnancies: Number,
//       gestationalAge: Number,
//       modeOfDelivery: String,
//       maternalInfections: String,
//       birthDefects: String,
//       twinStatus: String
//     },

//     /* STEP 3 */
//     cleftTypes: [
//       {
//         type: String
//       }
//     ],

//     /* STEP 4 */
//     cleftImage: String,
//     patientImage: String,

//     /* SYSTEM */
//     status: {
//       type: String,
//       enum: ["DRAFT", "SUBMITTED"],
//       default: "DRAFT"
//     },
//     isActive: {
//       type: Boolean,
//       default: true
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Patient", patientSchema);


import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    /* STEP 1 */
    hospitalName: String,
    infantFirstName: String,
    dateOfBirth: Date,
    sex: String,
    birthWeight: Number,
    motherName: String,
    contactNumber: String,
    address: String,
    
    /* ADDITIONAL FIELDS */
    reportingTime: String,
    fatherName: String,
    reportingDate: Date,
    motherAge: Number,
    fatherAge: Number,
    initialReferralMode: String,
    maternalIllnessDuringPregnancy: String,
    problemsAtBirth: String,
    consentForRegistry: String,

    /* STEP 2 */
    pregnancyInfo: {
      complications: String,
      durationWeeks: Number,
      ageInMonths: Number,
      consanguinity: String,
      previousPregnancies: Number,
      gestationalAge: Number,
      modeOfDelivery: String,
      maternalInfections: String,
      birthDefects: String,
      twinStatus: String
    },

    /* STEP 3 */
    cleftTypes: [{ type: String }],

    /* STEP 4 */
    cleftImage: String,
    patientImage: String
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
