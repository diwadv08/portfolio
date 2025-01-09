
require('dotenv').config();

const PORT=process.env.PORT;
const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use('/images',express.static('uploads'));
const skill_routes=require('./routes/skill_route');
const about_routes=require('./routes/about_route');
const education_routes=require('./routes/education_route');
const experience_routes=require('./routes/experience_route');
const project_routes=require('./routes/project_routes');

app.use(project_routes);
app.use(skill_routes);
app.use(about_routes);
app.use(education_routes);
app.use(experience_routes);
app.listen(PORT);