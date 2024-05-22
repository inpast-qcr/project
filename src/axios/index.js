import axios from 'axios';
import store from '../store'


const request = axios.create({
	baseURL: '/api/',
	timeout: 5000
})

//添加请求拦截器，若token存在则在请求头中加token，不存在也继续请求
request.interceptors.request.use(
    config => {
        if (store.state.User.token) {
            config.headers.Authentication = store.getters.token
        }
        return config
    },
    error => {
        console.log("在request拦截器显示错误：", error.response)
        return Promise.reject(error);
    }
);

//respone响应拦截器
request.interceptors.response.use(
    response => {
        return response
    },
    error => { 
        if (error.response) {
            console.log("在respone拦截器显示错误：", error.response)
            switch (error.response.status) {
                case 401:

                    router.replace({ //跳转到登录页面
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
            }
        }
        return Promise.reject(error.response.data);
    }
)

export default request