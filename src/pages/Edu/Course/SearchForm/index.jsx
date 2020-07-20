import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button, message } from "antd";
import { reqGetAllTeacherList } from '@api/edu/teacher'
import { reqALLSubjectList, reqGetSecSubject } from '@api/edu/subject'
import { connect } from 'react-redux'
import { getCourseList } from '../redux'
import { FormattedMessage, useIntl } from 'react-intl'
import "./index.less";

const { Option } = Select;

function SearchForm (props) {
  const intl = useIntl()
  const [form] = Form.useForm();
  const [teacherList, setTeacherList] = useState([])
  const [subjectList, setSubjectList] = useState([])
  useEffect(() => {
    async function fetchData () {
      const [teacherList, subjectList] = await Promise.all([
        reqGetAllTeacherList(),
        reqALLSubjectList()
      ])
      const options = subjectList.map(subject => {
        return {
          value: subject._id,
          label: subject.title,
          isLeaf: false // false表示有子数据, true表示没有子数据
        }
      })

      // console.log(res)
      setTeacherList(teacherList)
      setSubjectList(options)
    }
    fetchData()
  }, [])



  const onChange = (value, selectedOptions) => {
    // console.log(value, selectedOptions);
  };

  const loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    let secSubject = await reqGetSecSubject(targetOption.value)
    secSubject = secSubject.items.map(item => {
      return {
        value: item._id,
        label: item.title
      }
    })
    targetOption.loading = false
    if (secSubject.length > 0) {
      targetOption.children = secSubject
    } else {
      targetOption.isLeaf = true
    }

    setSubjectList([...subjectList])
  };

  const resetForm = () => {
    form.resetFields();
  };
  const finish = async value => {
    // console.log(value)
    let subjectId
    let subjectParentId
    if (value.subject && value.subject.length > 1) {
      subjectId = value.subject[1]
      subjectParentId = value.subject[0]
    }
    if (value.subject && value.subject.length === 1) {
      subjectId = value.subject[0]
      subjectParentId = 0
    }
    const data = {
      page: 1,
      limit: 5,
      title: value.title,
      teacherId: value.teacherId,
      subjectId,
      subjectParentId
    }
    const res = await props.getCourseList(data)
    // console.log(res)
    message.success('课程数据获取成功')
  }
  return (
    <Form layout="inline" form={form} onFinish={finish}>
      <Form.Item name="title" label={<FormattedMessage id='title' />}>
        <Input placeholder={intl.formatMessage({
          id: 'title'
        })} style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id='teacher' />}>
        <Select
          allowClear
          placeholder={intl.formatMessage({
            id: 'teacher'
          })}
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map(teacher => {
            return (<Option key={teacher._id} value={teacher._id}>{teacher.name}</Option>)
          })}

        </Select>
      </Form.Item>
      <Form.Item name="subject" label={<FormattedMessage id='subject' />}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjectList}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder={intl.formatMessage({
            id: 'subject'
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, { getCourseList })(SearchForm);
