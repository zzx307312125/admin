import {
  reqGetSubject,
  reqGetSecSubject,
  reqUpdateSubjectList
} from "@api/edu/subject";

import {
  GET_SUBJECT_LIST,
  GET_SECSUBJECT_LIST,
  UPDATE_SUBJECT
} from "./constants";
// 获取课程分类
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

export const getSubjectList = ({ page, limit }) => {
  return (dispatch) => {
    return reqGetSubject({ page, limit }).then((response) => {
      dispatch(getSubjectListSync(response));
      return response;
    });
  };
};

// 获取课程分类二级菜单
const getSecSubjectListSync = (list) => ({
  type: GET_SECSUBJECT_LIST,
  data: list,
});

export const getSecSubjectList = parentId => {
  return (dispatch) => {
    return reqGetSecSubject(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response));
      return response;
    });
  };
};
// 更新课程
const updateSubjectSync = data => ({
  type: UPDATE_SUBJECT,
  data
})
export const updateSubject = (title, id) => {
  return dispatch => {
    return reqUpdateSubjectList(title, id).then(res => {
      dispatch(updateSubjectSync({ title, id }))
      return res
    })
  }
}
