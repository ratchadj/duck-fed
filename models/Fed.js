import mongoose from "mongoose";

const FedSchema = new mongoose.Schema({
  datetime: {
    type: Date,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  duck_number: {
    type: Number,
    required: true,
  },
  food_type: {
    type: String,
    required: true,
  },
  food_weight: {
    type: Number,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Fed || mongoose.model("Fed", FedSchema);
