import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";


// 获取课程列表
export function reqGetLessonList (chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",

  });
}
// 获取七牛云token
export function reqGetQiniuToken () {
  return request({
    url: '/uploadtoken',
    method: 'GET'
  })
}
// 新增课时
export function reqAddLesson ({ chapterId, title, free, video }) {
  return request({
    url: `${BASE_URL}/save`,
    method: 'POST',
    data: {
      chapterId,
      title,
      free,
      video
    }
  })
}
// 批量删除课时
export function reqBatchDelLesson (lessonIds) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: 'DELETE',
    data: {
      idList: lessonIds
    }
  })
}