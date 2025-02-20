const express = require('express');
const clientRoutes = require('./routes/client.routes');
const productRoutes = require('./routes/product.routes');
const saleRoutes = require('./routes/sale.routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('API em execução');
    });

app.use('/clients', clientRoutes);
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

module.exports = app;