import React, { Component } from "react";
import { Button, message, Tooltip, Modal, Alert, Table } from "antd";
import Player from 'griffith'
import screenfull from 'screenfull'
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import SearchForm from "./SearchForm";
import { getLessonList, batchDelChapter, batchDelLesson } from './redux'
import "./index.less";

dayjs.extend(relativeTime);

@connect(
  (state) => ({
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
    chapterList: state.chapterList
  }),
  { getLessonList, batchDelChapter, batchDelLesson }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    selectedRowKeys: [],
    video: ''
  };

  showModal = video => () => {

    this.setState({
      previewVisible: true,
      video
    });

  };

  handleImgModal = () => {
    this.setState({
      previewVisible: false,

    });
  };

  componentDidMount () {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };
  handleClickExpand = (expanded, record) => {
    if (expanded) {
      this.props.getLessonList(record._id)
    }
    // console.log(expanded, record)

  }
  handleAdd = data => () => {
    this.props.history.push('/edu/chapter/addlesson', data)
  }
  // 批量删除
  handleBatchDel = () => {
    Modal.confirm({
      title: '确定删除吗？',
      onOk: async () => {
        let chapterIds = [] //选中章节ID
        let lessonIds = [] // 选中课时ID
        let selectedRowKeys = this.state.selectedRowKeys // 所有选中ID
        let chapterList = this.props.chapterList.items // 所有章节数据
        chapterList.forEach(chapter => {
          let chapterId = chapter._id // 每一条章节ID
          let index = selectedRowKeys.indexOf(chapterId)
          if (index > -1) {
            let newArr = selectedRowKeys.splice(index, 1)
            chapterIds.push(newArr[0])
          }
        })
        lessonIds = [...selectedRowKeys]
        await this.props.batchDelChapter(chapterIds)
        await this.props.batchDelLesson(lessonIds)
        message.success('批量删除成功')
      }
    })
  }
  handleQP = () => {
    screenfull.request()
  }
  render () {
    const { previewVisible, previewImage, selectedRowKeys } = this.state;
    // console.log(this.state)
    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        render: (isFree) => {
          return isFree === true ? "是" : isFree === false ? "否" : "";
        },
      },
      {
        title: "视频",
        // dataIndex: "free",
        render: value => {
          // console.log(value)
          return value.free === true ? <Button onClick={this.showModal(value.video)}>预览</Button> : ''
        },
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: data => {
          return (

            <div>
              {data.free === undefined && (
                <Tooltip title="新增课时">
                  <Button type='primary' style={{ marginRight: 10 }} onClick={this.handleAdd(data)}>
                    <PlusOutlined />
                  </Button>
                </Tooltip>
              )}
              <Tooltip title={data.free === undefined ? "更新章节" : "更新课时"}>
                <Button type="primary" style={{ marginRight: 10 }}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title={data.free === undefined ? "删除章节" : "删除课时"}>
                <Button type="danger">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          );
        }
      },
      // },
    ];
    const sources = {
      hd: {
        play_url: this.state.video, //真正需要的属性 , 预览视频的路径
        // 下面这些属性,其实不写也可以,但是会提示这个必须属性,所以为了不展示错误提示,加了这些属性,值随便写就可以
        bitrate: 1,
        duration: 1000,
        format: '',
        height: 500,
        size: 160000,
        width: 500
      }
    }
    const data = [
      {
        id: "111",
        title: "第一章节",
        children: [
          {
            id: "1",
            title: "第一课时",
            free: false,
            videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
          },
          {
            id: "2",
            title: "第二课时",
            free: true,
            videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
          },
          {
            id: "3",
            title: "第三课时",
            free: true,
            videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
          },
        ],
      },
      {
        id: "222",
        title: "第二章节",
        children: [
          {
            id: "4",
            title: "第一课时",
            free: false,
            videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
          },
          {
            id: "5",
            title: "第二课时",
            free: true,
            videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
          },
          {
            id: "6",
            title: "第三课时",
            free: true,
            videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
          },
        ],
      },
      {
        id: "333",
        title: "第三章节",
        children: [
          {
            id: "1192252824606289921",
            title: "第一课时",
            free: false,
            videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
          },
          {
            id: "1192628092797730818",
            title: "第二课时",
            free: true,
            videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
          },
          {
            id: "1192632495013380097",
            title: "第三课时",
            free: true,
            videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
          },
        ],
      },
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      // hideDefaultSelections: true,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   }
      // ]
    };

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button type="danger" style={{ marginRight: 10 }} onClick={this.handleBatchDel}>
                <span >批量删除</span>
              </Button>
              <Tooltip title="全屏" onClick={this.handleQP} className="course-table-btn">
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList.items}
            rowKey="_id"
            expandable={{
              onExpand: this.handleClickExpand
            }}
          />
        </div>

        <Modal
          title='视频'
          visible={previewVisible}
          footer={null}
          // 点击modal的关闭按钮,触发这个函数
          onCancel={this.handleImgModal}
          destroyOnClose={true}
        >
          <Player
            sources={sources} // 必须有,定义预览视频的路径, 多个视频源
            id={'1'}
            cover={'http://localhost:3000/logo512.png'} //视频封面
            duration={1000}
          ></Player>
        </Modal>
      </div>
    );
  }
}

export default Chapter;
