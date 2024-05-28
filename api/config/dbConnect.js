import mongoose from "mongoose";

export const connectDataBase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI)
    .then((con) => console.log(`connected to db ${con?.connection?.host}`))
    .catch((error) => console.log(error));
};
