import request from '@/axios/index.js'

// 耗材入库登记列表
export const getConsumeList = (params) => {
	return request({
		url: `/appPlatform/device/consume/page`,
		method: 'get',
		params,
	})
}

//添加耗材
export const addConsume = (params) => {
	return request({
		url: `/appPlatform/device/consume/add`,
		method: 'post',
		data: params,
	})
}

// 编辑耗材
export const editConsume = (params) => {
	return request({
		url: `/appPlatform/device/consume/modify`,
		method: 'post',
		data: params,
	})
}


//删除耗材
export const delConsume = (params) => {
	return request({
		url: `/appPlatform/device/consume/remove`,
		method: 'post',
		params,
	})
}

// 下载耗材模板
export const downloadTemplate = (params) => {
	return request({
		url: `/appPlatform/device/consume/downloadTemplate`,
		method: 'get',
		params,
        responseType: 'arraybuffer',
	})
}