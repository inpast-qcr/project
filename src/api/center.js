import request from "@/axios";

//应用列表
export const queryAppInCenterList = (params) => {
	return request({
		url: `/appPlatform/datashow/app/queryAppInCenterList`,
		method: 'get',
		params
	})
}

//应用分类列表
export const queryAppCategoryInCenterList = (params) => {
	return request({
		url: `/appPlatform/datashow/app/queryAppCategoryInCenterList`,
		method: 'get',
		params
	})
}