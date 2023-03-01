import mongoose, { Schema, model, models } from "mongoose";

const ministryCategoryItemSchema = new Schema(
  {
    ministryCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MinistryPublicCategory",
    },
    parentMinistry: {
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
    },
    downloadUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.MinistryCategoryItem ||
  model("MinistryCategoryItem", ministryCategoryItemSchema);
