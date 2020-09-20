import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TranslationSchema = new Schema(
  {
    parentChapterId: mongoose.SchemaTypes.ObjectId,
    language: String,
    texts: [Schema.Types.Mixed],
    layers: [Schema.Types.Mixed],
    user: {
      id: mongoose.SchemaTypes.ObjectId,
      name: String
    }
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
);

export default mongoose.model('Translation', TranslationSchema);
