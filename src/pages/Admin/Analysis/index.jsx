import React, { Component } from 'react'
import { Row, Col, Statistic, Progress } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { AreaChart, ColumnChart } from 'bizcharts'
import Card from '@comps/Card'
const firstRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}
export default class Analysis extends Component {
  state = {
    loading: false
  }
  componentDidMount () {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 2000)
  }
  data = [
    { year: '1991', value: 15468 },
    { year: '1992', value: 16100 },
    { year: '1993', value: 20000 },
    { year: '1994', value: 17409 },
    { year: '1995', value: 25000 },
    { year: '1996', value: 31056 },
    { year: '1997', value: 31982 },
    { year: '1998', value: 32040 },
    { year: '1999', value: 33233 },
  ];
  columnData = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 45 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 },
  ];
  render () {
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title='总销售额' prefix='￥' value={112893} />}
              footer={<span>日销售额 ￥12,423</span>}
            >
              <span>周同比 12% <CaretUpOutlined style={{ color: '#cf1322', marginRight: 20 }} /></span>
              <span>日同比 10% <CaretDownOutlined /></span>
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title='访问量' value={222222} />}
              footer={<span>日销售额 ￥12,423</span>}
            >
              <AreaChart
                data={this.data}
                xAxis={{
                  visible: false
                }}
                yAxis={{
                  visible: false
                }}
                xField='year'
                yField='value'
                padding='0'
                color='hotpink'
                smooth={true}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title='支付笔数' value={333333} />}
              footer={<span>转化率60%</span>}
              loading={this.state.loading}
            >
              <ColumnChart
                data={this.columnData}
                xField='year'
                yField='sales'
                xAxis={{
                  visible: false
                }}
                yAxis={{
                  visible: false
                }}
                padding='0'
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title='运营结果' prefix='￥' value={112893} />}
              footer={<span>转化率 80.9%</span>}
            >
              <Progress percent={80.9}
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068',
                }}
                status="active"
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
