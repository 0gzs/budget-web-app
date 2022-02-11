import mongoose from 'mongoose';
const Scheme = mongoose.Schema;

const accountSchema = new Scheme({
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date, default: new Date },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    transactions: { type : Array , "default" : [] }
}, { timeseries: true });

const Account = mongoose.model("Account", accountSchema);

export default Account;