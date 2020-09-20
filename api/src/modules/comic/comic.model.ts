import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ComicSchema = new Schema(
  {
    name: String,
    summary: String,
    staff: [
      {
        name: String,
        originalName: String,
      },
    ],
    language: String,
    cover: String,
    uniqid: String
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
);

export default mongoose.model('Comic', ComicSchema);
