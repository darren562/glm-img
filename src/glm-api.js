const axios = require("axios");
require("dotenv").config();

class GLMApi {
  constructor() {
    this.apiKey = process.env.GLM_API_KEY;
    this.apiUrl =
      process.env.GLM_API_URL ||
      "https://open.bigmodel.cn/api/paas/v4/images/generations";

    if (!this.apiKey) {
      throw new Error("缺少GLM_API_KEY环境变量");
    }

    console.log("[GLMApi] GLM-image API 初始化成功");
  }

  /**
   * 根据文本生成图片
   * @param {string} prompt - 描述图片内容的文本提示
   * @param {Object} options - 可选参数
   * @returns {Promise<Object>} 生成的图片数据
   */
  async generateImage(prompt, options = {}) {
    try {
      const payload = {
        model: "glm-image", // GLM-image模型标识符
        prompt: prompt,
        ...options,
      };

      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("图片生成失败:", error.response?.data || error.message);
      throw new Error(
        `图片生成失败: ${error.response?.data?.message || error.message}`,
      );
    }
  }

  /**
   * 根据文本生成指定风格的图片
   * @param {string} prompt - 描述图片内容的文本提示
   * @param {string} style - 图片风格 (如: anime, oil-painting, sketch, etc.)
   * @param {Object} options - 可选参数
   * @returns {Promise<Object>} 生成的图片数据
   */
  async generateStyledImage(prompt, style, options = {}) {
    // 使用更明确的风格化提示词格式
    const styledPrompt = `请生成一张图片，内容是：${prompt}，风格是：${style}`;
    return await this.generateImage(styledPrompt, options);
  }

  /**
   * 编辑现有图片
   * @param {string} image - 原始图片的base64编码或URL
   * @param {string} prompt - 编辑指令
   * @param {Object} options - 可选参数
   * @returns {Promise<Object>} 编辑后的图片数据
   */
  async editImage(image, prompt, options = {}) {
    try {
      // 构造用于图像编辑的完整API端点
      const editApiUrl = this.apiUrl.replace("generations", "edits");

      const payload = {
        model: "glm-image", // GLM-image模型标识符
        image: image,
        prompt: prompt,
        ...options,
      };

      const response = await axios.post(editApiUrl, payload, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      // 如果编辑API不可用，则退回到生成API
      console.warn("图片编辑API不可用，退回到生成API:", error.message);
      try {
        const editPrompt = `请根据以下指令编辑图片：${prompt}`;
        return await this.generateImage(editPrompt, options);
      } catch (fallbackError) {
        console.error(
          "图片编辑失败:",
          fallbackError.response?.data || fallbackError.message,
        );
        throw new Error(
          `图片编辑失败: ${fallbackError.response?.data?.message || fallbackError.message}`,
        );
      }
    }
  }
}

module.exports = GLMApi;
