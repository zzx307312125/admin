import request from "@utils/request";

const BASE_URL = "/admin/edu/chapter";


// 获取课程列表
export function reqGetChapterList ({ page, limit, courseId }) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: {
      courseId
    }
  });
}

// 批量删除章节数据
export function reqBatchDelChapter (chapterIds) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: 'DELETE',
    data: {
      idList: chapterIds
    }
  })
}