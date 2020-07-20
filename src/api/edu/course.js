import request from "@utils/request";

const BASE_URL = "/admin/edu/course";


// 获取课程列表
export function reqGetCourset () {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}

// 获取分页课程数据
export function reqGetCourseLimitList ({
  page,
  limit,
  title,
  teacherId,
  subjectId,
  subjectParentId
}) {
  // request返回一个promise
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: 'GET',
    params: {
      title,
      teacherId,
      subjectId,
      subjectParentId
    }
  })
}