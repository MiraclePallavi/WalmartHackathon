import mongoose , {model, Schema, models} from "mongoose";


const TwinSchema = new Schema({
  title:           { type: String, required: true },
  description:     { type: String, required: true },
  relationship:    { type: String, required: true },
  gender:          { type: String, required: true },
  dateOfBirth:     { type: Date },
  interestsHobbies: { type: [String], required: true },
  budgetRange:      { type: [Number], required: true }, 
  personalityVibe:  { type: [String], required: true },
  favoriteColors:   { type: [String], default: [] },
  isGiftingTwin:    { type: Boolean, default: false },
  userId: { type: String, required: true },
  createdAt:       { type: Date, default: () => new Date() },
});

export const Twin = models.Twin || model("Twin", TwinSchema);