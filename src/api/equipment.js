import request from "@/axios";

//获取设备类型分页
export const getEquipmentList = (params) => {
	return request({
		url: `/appPlatform/device/type/page`,
		method: 'get',
		params,
	})
}

//获取设备列表
export const getEquipmentData = (params) => {
	return request({
		url: `/appPlatform/device/type/activeList`,
		method: 'get',
		params,
	})
}

// 设备状态
export const statisticByStatus = (params) => {
	return request({
		url: `/appPlatform/device/statistic/statisticByStatus`,
		method: 'get',
		params,
	})
}

//设备类型统计
export const statisticByDevicetype = (params) => {
	return request({
		url: `/appPlatform/device/statistic/statisticByDevicetype`,
		method: 'get',
		params,
	})
}

// 报修情况
export const statisticRepair = (params) => {
	return request({
		url: `/appPlatform/device/statistic/statisticRepair`,
		method: 'get',
		params,
	})
}