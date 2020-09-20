import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IUserModel extends mongoose.Document {
  username: string;
  displayName: string;
  email: string;
  password: string;
  createdAt: Date;
  modifiedAt: Date;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
);

export default mongoose.model<IUserModel>('User', UserSchema);
