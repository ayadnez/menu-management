require('dotenv').config() 

const express = require('express')
const userRoutes = require('./routes/user.route')
const Database = require('./config/database')


const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

const db = new Database(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
    
    db.connect().catch((err) =>
      console.error("Error connecting to database:", err)
    );

app.use('/users',userRoutes)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

module.exports = app;
