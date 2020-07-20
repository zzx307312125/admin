import {
  GET_SUBJECT_LIST,
  GET_SECSUBJECT_LIST,
  UPDATE_SUBJECT
} from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细user数据
};

export default function subjectList (prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach(item => (item.children = []))
      return action.data;
    case GET_SECSUBJECT_LIST:
      if (action.data.items.length > 0) {
        let parentId = action.data.items[0].parentId
        prevState.items.forEach(item => {
          if (item._id === parentId) {
            item.children = action.data.items
          }
        })
      }
      return {
        ...prevState
      }
    case UPDATE_SUBJECT:
      prevState.items.forEach(item => {
        if (item._id === action.data.id) {
          item.title = action.data.title
          return
        }
        item.children.forEach(secItem => {
          if (secItem._id === action.data.id) {
            secItem.title = action.data.title
          }
        })
      })
      return {
        ...prevState
      }
    default:
      return prevState;
  }
}
