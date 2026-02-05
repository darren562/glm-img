const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 导入控制器
const { generateImage, generateStyledImage, editImage, upload } = require('./controllers/imageController');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 提供静态文件服务
app.use(express.static(path.join(__dirname, '../public')));

// 路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 图片生成路由
app.post('/api/images/generate', generateImage);
app.post('/api/images/generate-styled', generateStyledImage);
app.post('/api/images/edit', upload.single('image'), editImage);

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`访问 http://localhost:${PORT} 查看服务状态`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
});