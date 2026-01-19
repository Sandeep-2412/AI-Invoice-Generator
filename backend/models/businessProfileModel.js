import mongoose from "mongoose";

const BusinessProfileSchema = new mongoose.Schema({
  owner: { type: String, required: true, index: true },
  businessName: { type: String, required: true },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
    default: "",
  },
  address: { type: String, required: false, default: "" },
  phone: { type: String, required: false, default: "" },
  gst: { type: String, required: false, default: "" },

  // For images
  logoURL: { type: String, required: false, default: null },
  stampURL: { type: String, required: false, default: null },
  signatureURL: { type: String, required: false, default: null },

  signatureOwnerName: { type: String, required: false, default: "" },
  signatureOwnerTitle: { type: String, required: false, default: "" },

  defaultTaxPercent: { type: Number, required: false, default: 18 },
}, {
    timestamps: {
        required: true,
    }
});

const BusinessProfile = mongoose.models.BusinessProfile || mongoose.model("BusinessProfile", BusinessProfileSchema)

export default BusinessProfile;
