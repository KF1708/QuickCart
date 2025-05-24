import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // <-- fixed
  fullName: { type: String, required: true }, // <-- fixed
  phoneNumber: { type: String, required: true }, // <-- fixed
  pincode: { type: Number, required: true }, // <-- fixed
  area: { type: String, required: true }, // <-- fixed
  city: { type: String, required: true }, // <-- fixed
  state: { type: String, required: true }, // <-- fixed
  default: {
    type: Boolean,
    default: false,
  },
});

const Address =
  mongoose.models.address || mongoose.model("address", addressSchema);

export default Address;
