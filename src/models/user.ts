import { Schema, model, Document } from 'mongoose';

// Define the interface for User
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[];
    friends: Schema.Types.ObjectId[];
}

// Create the user schema
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Your email is invalid, please enter a valid email address."]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema.virtual("friendCount").get(function (this: IUser) {
    return this.friends.length;
});

// Create the model user using the userSchema
const User = model<IUser>("User", userSchema);

export default User;