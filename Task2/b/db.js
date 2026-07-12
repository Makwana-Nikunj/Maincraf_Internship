import mongoose from "mongoose";

const DB_NAME = process.env.DB_NAME || "Maincraf_Internship";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Todo title is required"],
            trim: true,
            maxlength: 100,
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        completed: {
            type: Boolean,
            default: false,
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },

        dueDate: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
);
export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);


const connectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`

        );

        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};


mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});



process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
});

export default connectDB;