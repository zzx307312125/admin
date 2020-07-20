import { reqGetCourseLimitList } from '@api/edu/course'
import { GET_COURSE_LIMIT_LIST } from './constants'
// 同步获取分页课程数据
function getCourseListSync (data) {
  return { type: GET_COURSE_LIMIT_LIST, data }
}
// 异步获取分页课程数据
export function getCourseList (data) {
  return dispatch => {
    return reqGetCourseLimitList(data).then(res => {
      dispatch(getCourseListSync(res))
      return res
    })
  }
}