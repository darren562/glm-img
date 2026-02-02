# GLM 图片生成项目

这是一个基于智谱AI的GLM-image模型(glm-image)构建的图片生成服务，支持通过文本描述生成图片、生成指定风格的图片以及编辑现有图片。

## 功能特性

1. **文本生成图片**: 根据自然语言描述生成对应图片
2. **风格化图片生成**: 支持多种艺术风格的图片生成
3. **图片编辑**: 对现有图片进行修改和再创作

## 技术栈

- Node.js
- Express.js
- Axios
- Multer (文件上传处理)
- dotenv (环境变量管理)

## 安装与运行

### 环境要求

- Node.js >= 14.x
- npm 或 yarn

### 安装步骤

1. 克隆项目或下载源码
2. 安装依赖：

   ```bash
   npm install
   ```

3. 配置环境变量：
   复制 `.env.example` 文件为 `.env` 并填入您的智谱AI API密钥：

   ```env
   PORT=3000
   GLM_API_KEY=your_api_key_here
   GLM_API_URL=https://open.bigmodel.cn/api/paas/v4/images/generations
   ```

4. 启动服务：

   ```bash
   # 开发模式
   npm run dev

   # 生产模式
   npm start
   ```

5. 访问应用：
   打开浏览器访问 `http://localhost:3000`

## API 接口

### 1. 生成图片

**Endpoint**: `POST /api/images/generate`

**请求参数**:

```json
{
  "prompt": "一只可爱的猫咪在草地上玩耍",
  "n": 1,
  "size": "1024*1024"
}
```

**响应示例**:

```json
{
  "data": [
    {
      "url": "https://example.com/generated-image.jpg"
    }
  ]
}
```

### 2. 生成风格化图片

**Endpoint**: `POST /api/images/generate-styled`

**请求参数**:

```json
{
  "prompt": "一只可爱的猫咪在草地上玩耍",
  "style": "anime",
  "n": 1,
  "size": "1024*1024"
}
```

**支持的风格**:

- anime (动漫)
- oil painting (油画)
- watercolor (水彩画)
- sketch (素描)
- pixel art (像素艺术)
- cyberpunk (赛博朋克)

### 3. 编辑图片

**Endpoint**: `POST /api/images/edit`

**请求参数** (multipart/form-data):

- image: 要编辑的图片文件
- prompt: 编辑指令，如"将猫变成狗"
- n: 生成数量
- size: 图片尺寸

## 项目结构

```
glm-img-project/
├── src/
│   ├── server.js         # 服务器入口文件
│   ├── glm-api.js        # GLM API 调用封装
│   └── controllers/
│       └── imageController.js  # 图片处理控制器
├── public/
│   └── index.html        # 前端界面
├── .env                  # 环境变量配置文件
├── package.json          # 项目配置文件
└── README.md             # 项目说明文档
```

## 注意事项

1. 请妥善保管您的API密钥，不要泄露给他人
2. 图片生成可能需要一定时间，请耐心等待
3. 生成的图片受版权保护，请合理使用
4. 本项目仅供学习交流使用，请遵守相关法律法规

## 许可证

MIT License
