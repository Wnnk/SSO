<script setup lang='ts'>
import { ref } from 'vue';
import { upload, isHavingFile } from "../../api/upload"
import SparkMD5 from 'spark-md5';
import instance from '@/api/instance';
import { ElMessage } from 'element-plus'
import previewFile from "./previewFile.vue"
const inputEl = ref<HTMLInputElement | null>(null);
const upLoadFileUrl = ref<string>("");

/** 
 * @description: 触发单个文件上传按钮
  */
const handleClick = () => {
  if (inputEl.value){
    inputEl.value.click();
  }
};
/** 
 * @description: 拖拽上传文件
 * 
  */
 const handleDragover = (e: InputEvent) => {
  /* 阻止默认行为 */
   e.preventDefault();
  //  console.log(e.dataTransfer);
   selectFile(e);
 };


/** 
 * @description: 选择文件后触发事件
*/
const selectFile = async(e:InputEvent) => {
  const file  =  (e.target as HTMLInputElement).files?.[0] || (e.dataTransfer as DataTransfer).files[0];
  /* 整个文件添加哈希值 */
  const fileHash = await createFileHash(file);
  /* 校验是否上传过 */
  const {code, message, currentFileSize, url}  = await checkFileUploaded(fileHash, file.size, file.name);
  let chunkList = [];
  if (code === 0){
    /* 文件已上传过 code=0 */
    ElMessage({
      message: message,
      type: 'success',
    })
    upLoadFileUrl.value = url;
    console.log(upLoadFileUrl.value);
    return;
  }else if (code === 1){
    chunkList  = await createChunks(file,1024 * 1024 * 2, currentFileSize); //按照2M分片
  } else if (code === -1) {
    chunkList  = await createChunks(file,1024 * 1024 * 2, 0); //按照2M分片
  }
  /* 添加分片信息 */
  const uploadChunkList = chunkList.map((chunk,index) => {
  const dotIndex = file.name.lastIndexOf('.');
  const name  = file.name.substring(0, dotIndex);
  const ext = file.name.substring(dotIndex + 1);
  const fileDetail = {
    file: chunk,
    size: chunk.size,
    chunkName: `${name}${index}.${ext}`,
    fileName: name,
    index: index,
    total: chunkList.length,
    fileHash,
    ext,
  }
    return fileDetail;
  })
  const formData = uploadChunks(uploadChunkList);
};

/** 
 * @description: 文件Md5 
 * @param {File} file 文件对象
 * @returns {string}: 文件hash值
**/
const createFileHash = (file:File):Promise<string> => {
  const spark = new SparkMD5.ArrayBuffer();
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    fileReader.onload = (e) => {
      spark.append(e.target.result as ArrayBuffer);
      resolve(spark.end(false));
    }
    fileReader.onerror = (e) => {
      reject(e);
    }
  })
}


/** 
 * @description: 文件分片
 * @param {File} file 文件对象
 * @param {number} chunkSize 分片大小
 * @param {number} start 开始位置
 * @returns {Bolb[], string}: 分片Bolb对象数组
  */
const createChunks= (file:File ,chunkSize:number, start:number = 0):any=> {
  const chunkList:Blob[] = [];
  /* 总分片数 */
  const targetChunkCount = Math.ceil(file.size / chunkSize);
  /* 当前分片数 */
  let currentChunkCount = 0;
  /* 文件分片 */
  while(currentChunkCount < targetChunkCount) {
    // const start = currentChunkCount * chunkSize;
    const end = start + chunkSize;
    const chunk = file.slice(start, end);
    chunkList.push(chunk);
    currentChunkCount++;
  }
  return chunkList;
}



const uploadChunks = (uploadChunkList: any[]) => {
  const res = uploadChunkList.map(({file,chunkName,fileName,index, total, ext}) => {
    /* 将Bolb对象转换为FormData对象 */
    const formData = new FormData();
    /* 将分片文件添加到FormData对象 */
    formData.append('chunkName', chunkName);
    formData.append('fileName', fileName);
    formData.append('chunckIndex', index);
    formData.append('total', total);
    formData.append('fileHash', uploadChunkList[0].fileHash);
    formData.append('ext', ext);
    formData.append('file', file, chunkName);
    return {
      formData,
      index,
    };
  })
  
  /* 逐个上传分片 */
  res.map(({formData}) => {
    // return upload(formData);
    instance({
      url: '/uploadFile',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      if (res.data.code === 0) {
        upLoadFileUrl.value = res.data.url;
        ElMessage({
          message: '上传成功',
          type:'success',
        });
      }
    })
  })
  
}

/** 
 * @description 检查文件是否上传过
 * @param {Sting} fileHash 文件hash值
 * @param {number} fileSize 文件大小
 * @param {string} fileName 文件名
 * @returns {boolean} 是否上传过
  */
const checkFileUploaded = async (fileHash:string, fileSize:number, fileName:string):Promise<any> => {

  const {code, message, currentFileSize, url}  = await isHavingFile(fileHash, fileSize, fileName);
  return {code, message, currentFileSize, url}
};




</script>

<template>
  <div class="upload-file">
    <h1>Upload File</h1>
    <div class="upload-container" 
      @click="handleClick"
      @drop="handleDragover"
      @dragover.prevent
    ></div>

    <input type="file" class="upload-input" ref="inputEl" @change="selectFile" />
    <previewFile v-if="upLoadFileUrl" :url="upLoadFileUrl" />
  </div>
</template>

<style lang='scss' scoped>

.upload-container {
  border-radius: 50%;
  background-color: gray;
  width: 100px;
  height: 100px;
}
.uploadmore-container{
  border-radius: 50%;
  background-color: greenyellow;
  width: 100px;
  height: 100px;
}
.upload-input {
  display: none;
}

</style>