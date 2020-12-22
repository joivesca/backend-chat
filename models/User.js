const { Schema, model } = require('mongoose');
//import uniqueValidator from 'mongoose-unique-validator';

/*export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}*/

const UserSchema = Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        avatar: {
            type: String
        },
        onlime: {
            type: Boolean,
            default: false
        }
    }
);

UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid= _id;
    return object;
});

module.exports = model('User', UserSchema);