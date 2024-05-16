import insance from "@/api/instance";
import { rsaData } from "@/utils/rsaData";
import { ElMessage } from 'element-plus'
const register = async (data) => {
  const res = await insance({
    url:'/register',
    data:{
      rsaData:rsaData(data),
    }
  })
  if (res.data.code === "0") {
    ElMessage.success(res.data.msg)
  } else {
    ElMessage.error(res.data.msg)
  }
  
}

const login = async (data) => {
  const res = await insance({
    url:'/login',
    data:{
      rsaData:rsaData(data),
    }
  })
  if (res.data.code === "0") {
    ElMessage.success(res.data.msg);
  } else {
    ElMessage.error(res.data.msg);
  }
  
};

export { register , login };