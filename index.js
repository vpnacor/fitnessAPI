const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');
const mongoose  = require('mongoose');



const app = express();
let db = mongoose.connection;
dotenv.config();


mongoose.connect(process.env.MONGODB_STRING);
db.once('open', ()=> console.log('Connected to DB'))
db.on('error', console.error.bind(console, 'error connection'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);








if(require.main === module){
    app.listen(process.env.PORT || 3000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 3000 }`)
    });
}

module.exports = {app, mongoose}