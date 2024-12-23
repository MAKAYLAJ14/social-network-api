import mongoose from 'mongoose';

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://localhost:27017/userThoughtDB', {
    // useFindAndModify: false,  
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err: Error) => {
        console.error('MongoDB connection error:', err);
    });

// Export connection 
export default mongoose.connection;