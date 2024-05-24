import request from "@/request";


// 值日发送消息

export const getMsgPage = (params) => {
	return request({
		url: `/appPlatform/msg/config/page`,
		method: 'get',
		params,
	})
}

// msg/msg/add
export const addMsg = (params) => {
	return request({
		url: `/appPlatform/msg/msg/add`,
		method: 'post',
		data: params,
	})
}

// msg/msg/modify
export const modifyMsg = (params) => {
	return request({
		url: `/appPlatform/msg/msg/modify`,
		method: 'post',
		data: params,
	})
}

// msg/msg/remove/{id}
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

// msg/msg/get/{id}
export const getMsg = (params) => {
	return request({
		url: `/appPlatform/msg/msg/get/${params}`,
		method: 'get',
	})
}