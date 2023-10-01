const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors()); 
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/api/v1/products', productRoutes);

app.use('*', (req, res) => {
    res.status(404).json({msg: "API endpoint not found!"})
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
