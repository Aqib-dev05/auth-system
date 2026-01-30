const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/authProject';
const authRoutes = require('./routes/authRoutes');
const descriptionafterauthRoutes = require('./routes/descriptionafterauthRoutes');
const PORT= 3000;

 const app= express();

  function checkrestrictedforAuth(req,res,next){
    const sessionId = req.cookies.uuid;
    if(!sessionId){
      return res.status(401).send("Unauthorized: Please log in to access this resource.");
    }
    next();
  }

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cookieParser());
 
  app.use(express.static(path.join(__dirname, "/")));
  app.use("/api/auth",authRoutes);
  app.use("/api/description",descriptionafterauthRoutes);

   app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
  });

  //this path will be available only for loggin users.
  app.get('/restrictedtoauth',checkrestrictedforAuth,(req,res)=>{
    res.sendFile(path.join(__dirname, 'restricted.html'));
  })


  //mongodb connection
  mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

