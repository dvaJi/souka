import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PageSchema = new Schema(
  {
    filename: String,
    uniqid: String,
    texts: [Schema.Types.Mixed],
    layers: [Schema.Types.Mixed],
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
);

const ChapterSchema = new Schema(
  {
    name: String,
    uniqid: String,
    chapter: String,
    language: String,
    pages: [PageSchema],
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
);

export default mongoose.model('Chapter', ChapterSchema);
