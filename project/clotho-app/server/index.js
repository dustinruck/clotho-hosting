const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
require("dotenv").config({ path: "../.env" });
require("dotenv").config();

// testing something //
// const db = require("./models");
// *** //

db.sequelize.sync().then(() => {

app.use(express.json());
app.use(

    cors({
  
      origin: ["https://clotho-frontend-e926130cfc7f.herokuapp.com","http://localhost:3000"],
      // TODO: //
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE","OPTION"],
  
      credentials: true,
  
    })
  
  );app.use(express.urlencoded({ extended: true }));

/* ADMIN ONLY */
const categoryRouter = require("./routes/category-routes");
app.use("/api/admin/categories", categoryRouter);

const genderRouter = require("./routes/gender-routes");
app.use("/api/admin/genders", genderRouter);

const sizeRouter = require("./routes/size-routes");
app.use("/api/admin/sizes", sizeRouter);

const adminUserRouter = require("./routes/admin-user-routes");
app.use("/api/admin/users", adminUserRouter);

const adminListingRouter = require("./routes/admin-listing-routes");
app.use("/api/admin/listings", adminListingRouter);

const adminOrderRouter = require("./routes/admin-order-routes");
app.use("/api/admin/orders", adminOrderRouter);

const imageRouter = require('./routes/image-routes');
app.use('/api/images', imageRouter);


/* ALL USERS */ 

//Login, logout
const authRouter = require("./routes/auth-routes");
app.use("/api/auth", authRouter);

//GET only for category, size, gender
const attrRouter = require("./routes/public-attribute-routes");
app.use("/api/attr", attrRouter);

//Register, update profile, close account
const userRouter = require("./routes/user-routes");
app.use("/api/users", userRouter);

//View, post, update listings
const listingRouter = require("./routes/listing-routes");
app.use("/api/listings", listingRouter);

const orderRouter = require("./routes/order-routes");
app.use("/api/orders", orderRouter);

// *LAST* Server Basic Route
app.get('/', (req, res) => {
    res.send('Greetings, user! Server is running on port 3001.');
});

// {alter: true} // {force: true} // <-- use as arg in .sync() below if needed

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("server running on port " + process.env.PORT);
  });
  })
  .catch((err) => {
      console.error("Unable to connect to database : ", err);
      process.exit(1);
  });
  

/*   
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
   */
  //   app.listen(process.env.PORT || 3000, () => {
  
  //     console.log("server running on port " + process.env.PORT);
  
  //   });
  
  });
