import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/team-react-40",{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then((db)=>{
        console.log('db connected');
    })
    .catch((err)=>{
        console.log(err);
    })
