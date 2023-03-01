import { Schema, model, models } from "mongoose";

const ministryPublicCategorySchema = new Schema(
  {
    ministry: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      unique: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.MinistryPublicCategory ||
  model("MinistryPublicCategory", ministryPublicCategorySchema);
