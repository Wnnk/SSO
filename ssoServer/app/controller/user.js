const { Controller } = require('egg');
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
const sendToWormhole = require('stream-wormhole');

class LoginController extends Controller {
  async passwordLogin() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.passwordLogin();
  }
  async register() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.register();
  }

  async isHavingFile() {
    const { ctx } = this;
    const { fileHash, size, name } = ctx.request.body;
    const target = path.join(__dirname, `../temp/${fileHash}`, name);
    const folder = path.join(__dirname, `../temp/${fileHash}`);
    const hasFile = fse.existsSync(target);
    if (hasFile) {
      /* 存在目标文件 */
      const fileSize = fse.statSync(target).size;
      if (fileSize === size) {
        ctx.body = {
          code: 0,
          message: true,
        };
      }
    } else if (fse.existsSync(folder)) {
      /* 不存在目标文件，但有文件夹 */
      /* 读取文件 */
      const files = fs.readdirSync(folder);
      let currentFileSize = 0;
      for (const file of files) {
        const filePath = path.join(folder, file);
        const fileSize = fse.statSync(filePath).size;
        currentFileSize += fileSize;
      }
      ctx.body = {
        code: 1,
        message: '存在部分片段',
        currentFileSize,
      };
    } else {
      /* 不存在目标文件，也不存在文件夹 */
      ctx.body = {
        code: -1,
        message: '文件不存在',
      };
    }
  }

  async uploadFile() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const { total, chunkName, fileHash, fileName, ext } = stream.fields;
    const target = path.join(__dirname, '../temp/', fileHash);
    try {
      if (!fs.existsSync(target)) {
        /* 没有对应hash的文件夹，则创建 */
        fs.mkdirSync(target);
      }
      /* 存在则直接写入 */
      const filePath = path.join(target, chunkName);
      const writeStream = fs.createWriteStream(filePath);
      await pump(stream, writeStream);
      const { uploaded, fileList } = await this.checkFile(fileHash, total);
      if (uploaded) {
        await this.mergeFile(fileList, fileHash, ext, fileName);
        writeStream.end();
        ctx.body = {
          code: 0,
          message: '上传成功',
        };
      } else {
        ctx.body = {
          code: 1,
          message: '上传未完成',
        };
      }
    } catch (error) {
      console.log(error);
      await sendToWormhole(stream);
    }
  }

  async checkFile(hash, total) {
    let uploaded = false;
    /* 获取hash文件夹下的文件列表 */
    const fileList = await this.getUploadedList(hash);
    /* 判断是否上传完成 */
    if (fileList.length === Number(total)) {
      uploaded = true;
    }
    return { uploaded, fileList };
  }

  async getUploadedList(hash) {
    const dirPath = path.join(__dirname, `../temp/${hash}`);
    if (fse.existsSync(dirPath)) {
      /* 存在hash文件夹 */
      const hasHashDirList = await fse.readdir(dirPath);
      /* 获取hash文件夹下的文件列表 */
      const fileList = hasHashDirList.map(file => {
        return file;
      });
      return fileList;
    }
    return [];
  }

  async mergeFile(fileList, hash, ext, fileName) {
    /* 输出文件 */
    const outputFile = path.join(__dirname, `../temp/${hash}/${fileName}.${ext}`);
    const writeStream = fs.createWriteStream(outputFile);
    writeStream.on('open', () => {
      this.streamMergeRecursive(fileList, writeStream, hash);
    });
  }

  async streamMergeRecursive(allFiles, writeStream, hash) {
    if (!allFiles.length) {
      /* 合并完成，关闭流 */
      return writeStream.end();
    }
    const currentFile = path.resolve(__dirname, `../temp/${hash}/${allFiles.shift()}`);
    console.log(`正在合并文件：${currentFile}`);
    const currentReadStream = fs.createReadStream(currentFile);
    currentReadStream.pipe(writeStream, { end: false });
    currentReadStream.on('end', () => {
      /* 删除当前的临时文件 */
      fs.unlinkSync(currentFile);
      /* 递归合并下一个文件 */
      this.streamMergeRecursive(allFiles, writeStream, hash);
    });
    currentReadStream.on('error', () => {
      /* 出错，关闭流 */
      console.log('关闭出错流');
      writeStream.end();
    });
  }

}

module.exports = LoginController;
