const GLMApi = require('../glm-api');
const multer = require('multer');

// 配置multer用于处理文件上传
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制文件大小为5MB
  }
});

const glmApi = new GLMApi();

/**
 * 文本生成图片
 */
async function generateImage(req, res) {
  try {
    const { prompt, n = 1, size = '1024x1024' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: '缺少必要的参数: prompt' });
    }

    // 验证size参数格式
    const validSizes = ['512x512', '768x768', '1024x1024', '2048x2048'];
    if (size && !validSizes.includes(size)) {
      return res.status(400).json({ error: `无效的size参数: ${size}. 支持的尺寸: ${validSizes.join(', ')}` });
    }

    const options = {
      n: parseInt(n),
      size: size
    };

    const result = await glmApi.generateImage(prompt, options);
    res.json(result);
  } catch (error) {
    console.error('生成图片时出错:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * 生成指定风格的图片
 */
async function generateStyledImage(req, res) {
  try {
    const { prompt, style, n = 1, size = '1024x1024' } = req.body;

    if (!prompt || !style) {
      return res.status(400).json({ error: '缺少必要的参数: prompt 和 style' });
    }

    // 验证size参数格式
    const validSizes = ['512x512', '768x768', '1024x1024', '2048x2048'];
    if (size && !validSizes.includes(size)) {
      return res.status(400).json({ error: `无效的size参数: ${size}. 支持的尺寸: ${validSizes.join(', ')}` });
    }

    const options = {
      n: parseInt(n),
      size: size
    };

    const result = await glmApi.generateStyledImage(prompt, style, options);
    res.json(result);
  } catch (error) {
    console.error('生成风格图片时出错:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * 编辑图片
 */
async function editImage(req, res) {
  try {
    const { prompt, n = 1, size = '1024x1024' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: '缺少必要的参数: prompt' });
    }

    // 验证size参数格式
    const validSizes = ['512x512', '768x768', '1024x1024', '2048x2048'];
    if (size && !validSizes.includes(size)) {
      return res.status(400).json({ error: `无效的size参数: ${size}. 支持的尺寸: ${validSizes.join(', ')}` });
    }

    let image;
    if (req.file) {
      // 如果上传了文件
      image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    } else if (req.body.image) {
      // 如果提供了图片URL或base64
      image = req.body.image;
    } else {
      return res.status(400).json({ error: '缺少必要的参数: image' });
    }

    const options = {
      n: parseInt(n),
      size: size
    };

    const result = await glmApi.editImage(image, prompt, options);
    res.json(result);
  } catch (error) {
    console.error('编辑图片时出错:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  generateImage,
  generateStyledImage,
  editImage,
  upload
};