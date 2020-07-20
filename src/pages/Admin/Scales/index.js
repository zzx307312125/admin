import React, { Component } from 'react'
import { Card, DatePicker, Button } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker;
const tabList = [
  {
    key: 'scales',
    tab: '销售量',
  },
  {
    key: 'visits',
    tab: '访问量',
  },
];
const contentList = {
  scales: <p>销售量...</p>,
  visits: <p>访问量...</p>,
};
export default class index extends Component {
  state = {
    titleKey: 'scales',
    activeBtn: 'day',
    rangeDate: [moment(), moment()]
  }
  handleBtnClick = activeBtn => () => {
    let rangeDate
    switch (activeBtn) {
      case 'day':
        rangeDate = [moment(), moment()]
        break
      case 'week':
        rangeDate = [moment(), moment().add(1, 'w')]
        break
      case 'month':
        rangeDate = [moment(), moment().add(1, 'M')]
        break
      case 'year':
        rangeDate = [moment(), moment().add(1, 'y')]
        break
    }
    this.setState({
      activeBtn,
      rangeDate
    })
  }
  handleDate = (dates, dateStrings) => {
    this.setState({
      rangeDate: dates
    })
  }
  render () {
    let { activeBtn, rangeDate } = this.state
    const extra = (
      <>
        <Button
          type={activeBtn === 'day' ? 'link' : 'text'}
          onClick={this.handleBtnClick('day')}
        >
          今日
        </Button>
        <Button
          type={activeBtn === 'week' ? 'link' : 'text'}
          onClick={this.handleBtnClick('week')}
        >
          本周
        </Button>
        <Button
          type={activeBtn === 'month' ? 'link' : 'text'}
          onClick={this.handleBtnClick('month')}
        >
          本月
        </Button>
        <Button
          type={activeBtn === 'year' ? 'link' : 'text'}
          onClick={this.handleBtnClick('year')}
        >
          本年
        </Button>
        <RangePicker value={rangeDate} onChange={this.handleDate} />
      </>
    )
    return (
      <div>
        <Card
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={this.state.titleKey}
          tabBarExtraContent={extra}
          onTabChange={key => {
            this.setState({
              titleKey: key
            })
          }}
        >{contentList[this.state.titleKey]}</Card>
      </div>
    )
  }
}
