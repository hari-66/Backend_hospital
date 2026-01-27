import PatientModel from "../models/Patient.model.js";

/* CREATE (POST) */
export const createPatient = async (req, res) => {
  try {
    const patient = await PatientModel.create(req.body);
    res.status(201).json({ message: "Patient registered successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* GET ALL (TABLE) */
export const getPatients = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    
    // Build search query
    const query = {};
    if (name) {
      query.$or = [
        { infantFirstName: { $regex: name, $options: 'i' } },
        { motherName: { $regex: name, $options: 'i' } },
        { hospitalName: { $regex: name, $options: 'i' } }
      ];
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get patients with pagination
    const patients = await PatientModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Add missing fields to each patient
    const patientsWithAllFields = patients.map(patient => {
      const patientObj = patient.toObject();
      if (!patientObj.reportingTime) patientObj.reportingTime = "";
      if (!patientObj.fatherName) patientObj.fatherName = "";
      if (!patientObj.reportingDate) patientObj.reportingDate = null;
      if (!patientObj.motherAge) patientObj.motherAge = null;
      if (!patientObj.fatherAge) patientObj.fatherAge = null;
      if (!patientObj.initialReferralMode) patientObj.initialReferralMode = "";
      if (!patientObj.maternalIllnessDuringPregnancy) patientObj.maternalIllnessDuringPregnancy = "";
      if (!patientObj.problemsAtBirth) patientObj.problemsAtBirth = "";
      if (!patientObj.consentForRegistry) patientObj.consentForRegistry = "";
      return patientObj;
    });
    
    // Get total count for pagination info
    const total = await PatientModel.countDocuments(query);
    
    res.json({
      patients: patientsWithAllFields,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalPatients: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ONE (EDIT PAGE LOAD) */
export const getPatientById = async (req, res) => {
  try {
    let patient = await PatientModel.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    
    // Add missing fields if they don't exist
    const patientObj = patient.toObject();
    if (!patientObj.reportingTime) patientObj.reportingTime = "";
    if (!patientObj.fatherName) patientObj.fatherName = "";
    if (!patientObj.reportingDate) patientObj.reportingDate = null;
    if (!patientObj.motherAge) patientObj.motherAge = null;
    if (!patientObj.fatherAge) patientObj.fatherAge = null;
    if (!patientObj.initialReferralMode) patientObj.initialReferralMode = "";
    if (!patientObj.maternalIllnessDuringPregnancy) patientObj.maternalIllnessDuringPregnancy = "";
    if (!patientObj.problemsAtBirth) patientObj.problemsAtBirth = "";
    if (!patientObj.consentForRegistry) patientObj.consentForRegistry = "";
    
    res.json(patientObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE (PUT – EDIT) */
export const updatePatient = async (req, res) => {
  try {
    const patient = await PatientModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
export const deletePatient = async (req, res) => {
  try {
    const patient = await PatientModel.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};