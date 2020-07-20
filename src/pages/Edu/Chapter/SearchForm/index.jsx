import React, { useEffect, useState } from "react";
import { Form, Select, Button, message } from "antd";
import { reqGetCourset } from '@api/edu/course'
import { connect } from 'react-redux'
import { getChapterList } from '../redux'
import "./index.less";

const { Option } = Select;

function SearchForm (props) {
  const [courseList, setCourseList] = useState([])
  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
  };
  useEffect(() => {
    async function fetchData () {
      const res = await reqGetCourset()
      setCourseList(res)
    }
    fetchData()
  }, [])
  const handleGetChapterList = async value => {
    // console.log(value)
    const data = {
      page: 1,
      limit: 10,
      courseId: value.teacherId
    }
    await props.getChapterList(data)
    message.success('课程章节列表数据获取成功')
  }
  return (
    <Form layout="inline" form={form} onFinish={handleGetChapterList}>
      <Form.Item name="teacherId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {courseList.map(course =>
            (<Option value={course._id} key={course._id}>{course.title}</Option>)
          )}
          {/* <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option> */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}

        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, { getChapterList })(SearchForm);
