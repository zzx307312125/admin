import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// const SUB_URL = `http://localhost:8888${BASE_URL}`

// 获取课程分类
export function reqGetSubject (page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}
// 获取课程分类二级菜单
export function reqGetSecSubject (parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  });
}
// 添加课程
export function reqAddSubject (title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      title,
      parentId
    }
  });
}
// 更新数据
export function reqUpdateSubjectList (title, id) {
  // request返回一个promise
  return request({
    url: `${BASE_URL}/update`,
    method: 'PUT',
    data: {
      title,
      id
    }
  })
}
// 删除课程
export function reqDelSubject (id) {
  // request返回一个promise
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: 'DELETE'
  })
}
// 获取一级课程分类数据
export function reqALLSubjectList () {
  // request返回一个promise
  return request({
    url: `${BASE_URL}`,
    method: 'GET'
  })
}


