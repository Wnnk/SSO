import instance from "@/api/instance";


const upload = async(formData) => {
  await instance({
    url: '/uploadFile',
    method: 'post',
    data: formData,
    /* axios不能设置Content-Type */
  })
}

const isHavingFile = async(fileHash, size, name) => {
  const res = await instance({
    url: '/isHavingFile',
    method: 'post',
    data: {
      fileHash,
      size,
      name
    }
  })
  return res.data;
}

export { upload, isHavingFile };