import request from "@/axios";



export const getMsgPage = (params) => {
	return request({
		url: `/appPlatform/msg/config/page`,
		method: 'get',
		params,
	})
}


export const addMsg = (params) => {
	return request({
		url: `/appPlatform/msg/msg/add`,
		method: 'post',
		data: params,
	})
}


export const modifyMsg = (params) => {
	return request({
		url: `/appPlatform/msg/msg/modify`,
		method: 'post',
		data: params,
	})
}


export const removeMsg = (params) => {
	return request({
		url: `/appPlatform/msg/msg/remove/${params}`,
		method: 'post',
	})
}

export const openTask = (params) => {
	return request({
		url: `/appPlatform/msg/task/open`,
		method: 'post',
		data: params,
	})
}


export const stopTask = (params) => {
	return request({
		url: `/appPlatform/msg/task/stop/${params}`,
		method: 'post',
	})
}


export const getMsg = (params) => {
	return request({
		url: `/appPlatform/msg/msg/get/${params}`,
		method: 'get',
	})
}