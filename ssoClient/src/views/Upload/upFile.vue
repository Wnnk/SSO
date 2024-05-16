<script setup lang='ts'>
const chunkSize = 0.5 * 1024 * 1024;

const uploadFile = async(e:any) => {
  const chunks = createFileChunk(e.target.files[0]);
  const fileHash: string = await calculationChunksMd5(chunks);
  console.log("是否已上传？ 是否已上传部分? 如果上传了部分，那么上传了那部分");
  const postFormData = createPostFormData(chunks, fileHash);
  await postToServer(postFormData);
  console.log("将hash和文件后缀发送给后端，让其合并文件");
}

const createFileChunk = (file: File) => {

}

const calculationChunksMd5 = async() => {

}

const postToServer = async(postFormData:any, limt:number = 3) => {
  return new Promise((resolve) => {
        let len = postFormData.length;
        let counter = 0;
        let isStop = false;
        const startPost: Function = async () => {
          // 注意这个方法会改变原数组
          const formDatas = postFormData.shift();
          if (!formDatas || isStop) return;
          try {
            await this.$http.post("/uploadfile", formDatas.formData, {
              onUploadProgress: (progress: any) => {
                // 这里可以获取进度： Number(((progress.loaded / progress.total) * 100).toFixed(2));
              },
            });

            // 所有请求都已结束，我们需要结束外面的Promise
            if (counter == len - 1) {
              resolve(true);
              return;
            }

            counter++;
            // 请求还未结束,继续启动任务
            startPost();
          } catch (error) {
            // 超过三次就放弃了
            if (formDatas.error > 3) {
              return (isStop = true);
            }
            // 将错误的内容放入数据列表中，然后立马进行重试
            formDatas.error++;
            postFormData.unshift(formDatas);
            // 继续启动任务
            startPost();
          }
        };

        // 初始启动limt个任务
        for (let index = 0; index < limt; index++) {
          startPost();
        }
      });
}
</script>

<template>
  <div class="upload-file-wrapper">
    <input type="file" @change="uploadFile" />
    <el-button>上传文件</el-button>
    <!-- <div class="box" :style="{ left: left + 'px' }"></div> -->
  </div>
</template>

<style lang='scss' scoped>
</style>