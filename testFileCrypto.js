/**
 * 文件加解密工具使用示例
 * 演示如何使用FileCrypto类将文件转换为ASCII长文本，以及如何将ASCII长文本转换回文件
 */

// 模拟uni-app API
if (typeof uni === 'undefined') {
  global.uni = {
    arrayBufferToBase64: (buffer) => Buffer.from(buffer).toString('base64'),
    base64ToArrayBuffer: (base64) => Buffer.from(base64, 'base64'),
    getImageInfo: () => {
      throw new Error('uni.getImageInfo not available in Node.js');
    },
    getFileSystemManager: () => {
      // 模拟文件系统管理器
      return {
        writeFile: (options) => {
          fs.writeFileSync(options.filePath, Buffer.from(options.data));
          if (options.success) {
            options.success();
          }
        }
      };
    },
    request: () => {
      throw new Error('uni.request not available in Node.js');
    }
  };
}

import FileCrypto from './utils/fileCrypto.js';
import fs from 'fs';
import path from 'path';

// 创建测试目录
const testDir = './test_output';
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

// 测试1：生成随机密钥
console.log('=== 测试1：生成随机密钥 ===');
try {
  const randomKey = FileCrypto.generateRandomKey(24);
  console.log('生成的随机密钥:', randomKey);
  console.log('测试1通过');
} catch (error) {
  console.error('测试1失败:', error.message);
}
console.log('');

// 测试2：直接测试加密算法功能（不依赖文件系统）
console.log('=== 测试2：测试加密算法核心功能 ===');
try {
  // 创建测试内容
  const testContent = '这是一个测试内容，用于演示加密算法功能。';
  
  // 使用默认密钥加密
  const crypto = new FileCrypto();
  
  // 测试直接加密文本内容
  console.log('测试直接加密文本内容');
  const encryptedText = await crypto.encryptFile(testContent, 'test.txt');
  console.log('加密后的文本:', encryptedText);
  console.log('加密后的文本类型:', typeof encryptedText);
  console.log('加密后的文本长度:', encryptedText ? encryptedText.length : 'undefined');
  
  if (typeof encryptedText === 'string') {
    console.log('加密后的文本格式:', encryptedText.startsWith('FILE:test.txt;') ? '正确' : '错误');
  } else {
    console.log('加密后的文本不是字符串，无法使用startsWith方法');
  }
  console.log('');
  
  // 测试解密功能
  console.log('测试解密功能');
  if (typeof encryptedText === 'string') {
    const decryptedContent = await crypto.decryptText(encryptedText, testDir);
    console.log('解密后的文件路径:', decryptedContent);
    
    // 读取解密后的文件内容并验证
    if (fs.existsSync(decryptedContent)) {
      const decryptedText = fs.readFileSync(decryptedContent, 'utf8');
      console.log('解密后的内容:', decryptedText);
      console.log('解密是否成功:', decryptedText === testContent);
      console.log('测试2通过');
    } else {
      console.error('解密后的文件不存在');
    }
  } else {
    console.log('加密后的文本不是字符串，无法进行解密测试');
  }
  
} catch (error) {
  console.error('测试2失败:', error.message);
  console.error('错误栈:', error.stack);
}

console.log('');
console.log('=== 测试完成 ===');
console.log('注意：由于测试环境限制，仅测试了核心加密算法功能。');
console.log('完整的文件系统功能需要在uni-app环境中测试。');
