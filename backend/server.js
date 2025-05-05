const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;  // Cổng backend

// Cấu hình CORS và body-parser
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB (thay đổi URL nếu cần)
mongoose.connect('mongodb://localhost:27017/products_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// Tạo schema và model cho sản phẩm
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

// API GET để lấy danh sách sản phẩm
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy sản phẩm' });
  }
});

// API POST để thêm sản phẩm
app.post('/api/products', async (req, res) => {
  const { name, description, price, image } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
    image,
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: 'Sản phẩm đã được thêm' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm sản phẩm' });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
