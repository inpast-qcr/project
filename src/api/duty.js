import request from '@/axios'



/**
 * 
 * 学年学期
 * 
 */

// 新增学年学期
export const addSchoolYear = (params) => {
	return request({
		url: `/appPlatform/schoolYear/addSchoolYear`,
		method: 'post',
		data: params,
	})
}

// 修改学年学期
export const modifySchoolYear = (params) => {
	return request({
		url: `/appPlatform/schoolYear/modifySchoolYear`,
		method: 'post',
		data: params,
	})
}

// 删除学年学期
export const removeSchoolYear = (params) => {
	return request({
		url: `/appPlatform/schoolYear/removeSchoolYear`,
		method: 'get',
		params,
	})
}


// 获取学年学期列表
export const querySchoolYearList = (params) => {
	return request({
		url: `/appPlatform/schoolYear/querySchoolYearList`,
		method: 'get',
		params,
	})
}

//查询周次
export const queryWeekList = (params) => {
	return request({
		url: `/appPlatform/week/queryWeekList`,
		method: 'get',
		params,
	})
}

//保存周次
export const saveWeeks = (params) => {
	return request({
		url: `/appPlatform/week/saveWeeks`,
		method: 'post',
		data: params,
	})
}


// 生成星期数据
export const generateWeeks = (params) => {
	return request({
		url: `/appPlatform/week/generateWeeks`,
		method: 'post',
		data: params,
	})
}

// 下载值周模版
export const downloadTemplate = (params) => {
	return request({
		url: `/appPlatform/weekPlan/downloadTemplate`,
		method: 'get',
		params,
        responseType: 'arraybuffer',
	})
}
// 下载全学期模板
export const downloadTemplateForWholeTerm = (params) => {
	return request({
		url: `/appPlatform/weekPlan/downloadTemplateForWholeTerm`,
		method: 'get',
		params,
        responseType: 'arraybuffer',
	})
}

// 上传全学期值周计划
export const uploadWeekPlanForWholeTerm = (data,params) => {
	return request({
		url: `/appPlatform/weekPlan/uploadWeekPlanForWholeTerm`,
		method: 'post',
		data,
        
	})
}
// 上传值周计划
export const uploadWeekPlan = (data,params) => {
	return request({
		url: `/appPlatform/weekPlan/uploadWeekPlan`,
		method: 'post',
		data,
        
	})
}

//获取当前学年学期
export const queryCurSchoolYear = (params) => {
	return request({
		url: `/appPlatform/schoolYear/queryCurSchoolYear`,
		method: 'get',
		params,
	})
}

//获取值周计划列表
export const queryWeekPlanListWithinOneweek = (params) => {
	return request({
		url: `/appPlatform/weekPlan/queryWeekPlanListWithinOneweek`,
		method: 'get',
		params,
	})
}

//修改单日值周计划
export const updateWeekPlan = (data) => {
	return request({
		url: `/appPlatform/weekPlan/updateWeekPlan`,
		method: 'post',
		data,
        
	})
}

//获取评价项目列表
export const queryEvaluateItemList = (params) => {
	return request({
		url: `/appPlatform/evaluate/queryCurUserEvaluateItemList`,
		method: 'get',
		params,
	})
}

//提交评价
export const submitMyEvaluate = (params) => {
	return request({
		url: `/appPlatform/evaluate/submitMyEvaluate`,
		method: 'post',
		data:params,
	})
}

// 查询单人单日评价内容
export const querySinglePersonEvaluateWithinOneday = (params) => {
	return request({
		url: `/appPlatform/evaluate/querySinglePersonEvaluateWithinOneday`,
		method: 'get',
		params,
	})
}

//获取单日内所有评价
export const queryAllEvaluateWithinOneday = (params) => {
	return request({
		url: `/appPlatform/evaluate/queryAllEvaluateWithinOneday`,
		method: 'get',
		params,
	})
}

//查询教师信息列表
export const queryTeacherList = (params) => {
	return request({
		url: `/appPlatform/weekPlan/queryTeacherList`,
		method: 'get',
		params,
	})
}

// 获取年级
export const queryGradeList = (params) => {
	return request({
		url: `/appPlatform/grade/queryGradeList`,
		method: 'get',
		params,
	})
}

//获取是否生成值日小结
export const checkIfSummarized = (params) => {
	return request({
		url: `/appPlatform/evaluate/checkIfSummarized`,
		method: 'get',
		params,
	})
}

//生成值日小结
export const generateSummarize = (params) => {
	return request({
		url: `/appPlatform/evaluate/generateSummarize`,
		method: 'get',
		params,
	})
}

//获取用户负责的年级
export const queryUserGradeList = (params) => {
	return request({
		url: `/appPlatform/evaluate/queryUserGradeList`,
		method: 'get',
		params,
	})
}

//查询值日小结列表
export const querySummarizePagedList = (params) => {
	return request({
		url: `/appPlatform/evaluate/querySummarizePagedList`,
		method: 'get',
		params,
	})
}



//查询年级是否完成评价
export const queryWeekPlanListWithinOneday = (params) => {
	return request({
		url: `/appPlatform/weekPlan/queryWeekPlanListWithinOneday`,
		method: 'get',
		params,
	})
}

//发送钉钉消息
export const sendMsg = (params) => {
	return request({
		url: `/appPlatform/evaluate/sendMsg`,
		method: 'post',
		data:params,
	})
}

//上传图片
export const uploadImage = (data) => {
	return request({
		url: `/appPlatform/evaluate/uploadImage`,
		method: 'post',
		data
	})
}

//查询次级值日教师列表
export const queryWeekPlanSubTeacherList = (params) => {
	return request({
		url: `/appPlatform/weekPlan/queryWeekPlanSubTeacherList`,
		method: 'get',
		params,
	})
}

//删除评价
export const delEvaluate = (params) => {
	return request({
		url: `/appPlatform/evaluate/remove`,
		method: 'post',
		params
	})
}