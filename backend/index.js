import app from './server.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";    
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const port = process.env.PORT || 5001;
const uri = "mongodb+srv://goat:thegrumpygoat@cluster0.dlyjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Mongodb"))
    .catch(err => console.log(err));

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
})

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));