import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/Login/userLogin.vue')
    },
    {
      path:'/upload',
      name: 'Upload',
      component: () => import('@/views/Upload/uploadFile.vue')
    },
    {
      path: '/formTable',
      name: 'FormTable',
      component: () => import('@/views/FormTable/formTable.vue')
    },
  ]
})

export default router
