import { createRouter, createWebHistory } from "vue-router";
// import {isLogin,isExpired,logout} from '../utils/auth'
import {useRouter} from 'vue-router'

import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Framework from "../views/Framework.vue";
import Categories from "../views/Category/Categories.vue"
import FeaturedCategories from "../views/Category/FeaturedCategories.vue"
import Posts from "../views/Blog/Posts.vue"
import EditPost from '../views/Blog/EditPost.vue'
import FeaturedPosts from '../views/Blog/FeaturedPosts.vue'
import TopPost from '../views/Blog/TopPost.vue'
import UploadPost from '../views/Blog/UploadPost.vue'
import Photos from '../views/Photography/Photos.vue'
import FeaturedPhotos from '../views/Photography/FeaturedPhotos.vue'
import VisitRecordList from '../views/VisitRecord/List.vue'
import ConfigList from '../views/Config/List.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Framework,
            children: [
                {
                    path: '',
                    name: '系统主页',
                    component: Home,
                    meta: {
                        icon: 'fa fa-home fa-lg',
                        index: 0
                    }
                },
                {path: '/category/list', name: '分类列表', component: Categories},
                {path: 'category/featured', name: '推荐分类', component: FeaturedCategories},
                {path: 'post/list', name: '文章列表', component: Posts},
                {path: 'post/edit/:id', name: '编辑文章', component: EditPost},
                {path: 'post/new', name: '新增文章', component: EditPost},
                {path: 'post/featured', name: '推荐文章', component: FeaturedPosts},
                {path: 'post/top', name: '置顶文章', component: TopPost},
                {path: 'post/upload', name: '上传文章', component: UploadPost},
                {path: 'photo/list', name: '图片列表', component: Photos},
                {path: 'photo/featured', name: '推荐图片', component: FeaturedPhotos},
                {path: 'visit_record/list', name: '访问记录', component: VisitRecordList},
                {path: 'config/list', name: '配置中心', component: ConfigList},
            ]
        },
        { path: '/login', name: 'Login', component: Login },
    ]
})

// // 路由守卫
// router.beforeEach((to, from, next) => {
//     if (isExpired()) {
//         logout()
//         router.push('/login')
//     }

//     if (to.path === '/login') {
//         // 访问登录界面，如果已登录，跳转到主页
//         if (isLogin()) next({ path: '/' })
//         else next()
//     } else {
//         if (isLogin()) {
//             // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
//             next({ path: '/login' })
//         }
//         next()
//     }
// })

export default router