import request from '@/axios/index.js'

// 查询维保列表
export const getMaintenancerData = (params) => {
	return request({
		url: `/appPlatform/device/maintenancer/list`,
		method: 'get',
		params,
	})
}