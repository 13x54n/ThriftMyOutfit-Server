const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(morgan('combined')); // 'combined' is one of the predefined formats, logging more detailed info

app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
