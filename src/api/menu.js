import request from '@/axios/index.js'

// 菜单列表
export const getMenuRouter = (params) => {
	return request({
		url: `/appPlatform/base/menu/queryUserMenuRouter`,
		method: 'get',
		params
	})
}