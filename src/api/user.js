import request from '@/axios/index.js'

// 用户列表
export const queryUserPagedList = (params) => {
	return request({
		url: `/appPlatform/base/user/queryUserPagedList`,
		method: 'get',
		params
	})
}