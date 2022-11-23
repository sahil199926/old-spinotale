import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import {
  Row,
  Col,
  Card,
  Segmented,
  Table,
  Skeleton,
  Collapse,
} from 'antd'
import './product-source-revenue.css'
import {
  revenueSourceWiseRev,
  sourceandmediumsplit,
  revenueTopProductName
} from '../../../api/revenue'
import { useSelector } from 'react-redux'
import { sourceandmediumsplitCol, productMediumsplitCol, productMediumsplitColInner, SourceMediumsplitColInner } from '../../../commons/tableColumn'
import { ConsoleSqlOutlined } from '@ant-design/icons'
const { Panel } = Collapse;

function ProductSourceRevenue() {

  const myState = useSelector((state) => state.filter)
  const currEndDate = myState.currStartEndDate.endDate
  const currStartDate = myState.currStartEndDate.startDate
  const preEndDate = myState.preStartEndDate.endDate
  const preStartDate = myState.preStartEndDate.startDate
  const comparisionFlag = myState.comparision

  const queryObj = {
    current_start: currEndDate,
    current_end:  currStartDate,
    previous_end: preStartDate,
    previous_start: preEndDate,
    Comparision:
    comparisionFlag.toString().charAt(0).toUpperCase() +
    comparisionFlag.toString().slice(1),
  }
  
  // Declear all state variables
  const [sourceNameAndRevenue, setSourceNameAndRevenue] = useState({name: [], value: [], loader: true, statement: []})
  const [mediumNameAndRevenue, setMediumNameAndRevenue] = useState({name: [], value: [], loader: true, statement: []})
  const [sourceMediumNameAndRevenue, setSourceMediumNameAndRevenue] = useState({name: [], value: [], loader: true, statement: []})
  const [channelGrouping, setChannelGrouping] = useState({name: [], value: [], loader: true, statement: []})
  const [commonCompain, setCommonCompain] = useState({name: [], value: [], loader: true, statement: []})
  const [productBrandData, setProductBrandData] = useState({name: [], value: [], loader: true, statement: []})
  const [sourceandmediumsplitData, setSourceandmediumsplitData] = useState({data: [], loader: true, statement: []})
  const [productData, setProductData] = useState({data: [], loader: true, statement: []})
  
  // all useEffect
  useEffect(() => {
    getRevenueSourceWiseRev(queryObj)
    revenueMediumWiseRev(queryObj)
    getSourceandmediumsplit(queryObj)
    revenueSourceMediumWiseRev(queryObj)
    getChannelGrouping(queryObj)
    compTypeCommon(queryObj)
    productBrandRevenue(queryObj)
    getProductMediumsplit(queryObj)
  }, [myState]);

  // declear all busincess logic
  const getRevenueSourceWiseRev = async (qieryObj) => {
    qieryObj.how = 'source'
    const res = await revenueSourceWiseRev(qieryObj)
    const obj = {name: res.data.Response.source, value: res.data.Response.transactionrevenue, loader: false, statement: res.data.Response.statement}
    setSourceNameAndRevenue(obj)
  }

  const revenueMediumWiseRev = async (qieryObj) => {
    qieryObj.how = 'medium'
    const res = await revenueSourceWiseRev(qieryObj)
    const obj = {name: res.data.Response.medium, value: res.data.Response.transactionrevenue, loader: false, statement: res.data.Response.statement}
    setMediumNameAndRevenue(obj)
  }

  const revenueSourceMediumWiseRev = async (qieryObj) => {
    qieryObj.how = 'sourcemedium'
    const res = await revenueSourceWiseRev(qieryObj)
    const obj = {name: res.data.Response.medium, value: res.data.Response.transactionrevenue, loader: false, statement: res.data.Response.statement}
    setSourceMediumNameAndRevenue(obj)
  }

  const getChannelGrouping = async (qieryObj) => {
    qieryObj.how = 'channelgrouping'
    const res = await revenueSourceWiseRev(qieryObj)
    const obj = {name: res.data.Response.channelgrouping, value: res.data.Response.transactionrevenue, loader: false, statement: res.data.Response.statement}
    setChannelGrouping(obj)
  }

  const getSourceandmediumsplit = async (qieryObj) => {
    qieryObj.how = 'source'
    const res = await sourceandmediumsplit(qieryObj)
    let newArr = res?.data?.Response.map((e,i) => ({...e, key: i}))
    const tmpData = {data: newArr, loader: false, statement: []}
    setSourceandmediumsplitData(tmpData)
  }

  const getProductMediumsplit = async (qieryObj) => {
    qieryObj.how = 'product'
    const res = await sourceandmediumsplit(qieryObj)
    let newArr = res?.data?.Response.map((e,i) => ({...e, key: i}))
    const tmpData = {data: newArr, loader: false, statement: []}
    setProductData(tmpData)
  }

  const compTypeCommon = async (qieryObj) => {
    qieryObj.comp_type = 'common'
    qieryObj.source = 'ga'
    const res = await revenueTopProductName(qieryObj)
    const obj = {name: res?.data?.Response?.productname, value: res?.data?.Response?.itemrevenue, loader: false, statement: res?.data?.Response?.statement}
    setCommonCompain(obj)
  }

  const productBrandRevenue = async (qieryObj) => {
    qieryObj.how = 'productbrand'
    const res = await revenueSourceWiseRev(qieryObj)
    const obj = {name: res.data.Response.productbrand, value: res.data.Response.itemrevenue, loader: false, statement: res.data.Response.statement}
    setProductBrandData(obj)
  }

  const revenueSourceWiseRevData = {
    series: [{
      name: 'Revenue',
      data: sourceNameAndRevenue.value,
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: sourceNameAndRevenue.name,
      }
    },
  };
  
  const revenueMediumWiseRevData = {
    series: [{
      name: 'Revenue',
      data: mediumNameAndRevenue.value
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: mediumNameAndRevenue.name,
      }
    },
  };
  
  const revenueSourceMediumWiseRevData = {
    series: [{
      name: 'Revenue',
      data: sourceMediumNameAndRevenue.value
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: sourceMediumNameAndRevenue.name,
      }
    },
  };

  const channelGroupingData = {
    series: [{
      name: 'Revenue',
      data: channelGrouping.value
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: channelGrouping.name,
      }
    },
  };

  const commonCompainData = {
    series: [{
      name: 'Revenue',
      data: commonCompain.value
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: commonCompain.name,
      }
    },
  };

  const productBrandDataGraph = {
    series: [{
      name: 'Revenue',
      data: productBrandData.value
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: productBrandData.name,
      }
    },
  };

  const callMe = (x, role) => {
    let tmpArr = []
    let obj_length = x[Object.keys(x)[0]].length
    let obj_keys = Object.keys(x)
    for (let j = 0; j < obj_length; j++) {
      let tmpObj = {}
      for (let curr of obj_keys) {
          tmpObj[curr] = x[curr][j]
      }
      tmpArr.push(tmpObj)
    }
    if (role === 'product') {
      return (
        <Table 
          dataSource={tmpArr}
          bordered
          pagination={false} 
          columns={productMediumsplitCol}
          size="small"
        />
      );

    } else {
      return (
        <Table 
          dataSource={tmpArr}
          bordered
          pagination={false}
          size="small"
          columns={sourceandmediumsplitCol}
        />
      );
    }
  }


  const genExtra = (e, val) => {
    console.log(e)
    if (val === 'source') {
      return ( 
        <>
        <p>
          <b> Contribution</b>  {e.product_category_contribution} 
          <b> Revenue</b>  {e.product_category_revenue} 
          <b>Total Revenue</b>  &nbsp;&nbsp;&nbsp; {e.total_revenue} </p>
        </>
      )
  
    } else {
      return ( 
        <>
        <p>
          <b> Contribution</b>  {e.product_category_contribution} 
          <b> Revenue</b>  {e.product_category_revenue} 
          <b>Total Revenue</b>  &nbsp;&nbsp;&nbsp; {e.total_revenue} </p>
        </>
      )
    }
  }
  return (
    <>
      <Row style={{ margin: '15px', rowGap: '40px' }}>
        <Col span={12} className='pl-15'>
          <Card title="" bordered={true}>
            <Skeleton loading={sourceNameAndRevenue.loader} active>
              <p> Source  wise Revenue </p>
                <Chart options={revenueSourceWiseRevData.options} series={revenueSourceWiseRevData.series} type="bar" height={350} />
                <p> {sourceNameAndRevenue.statement} </p>
            </Skeleton>
          </Card>
        </Col>
        <Col span={12} className='pl-15'>
          <Card title="" bordered={true}>
            <Skeleton loading={mediumNameAndRevenue.loader} active>
              <p> Medium wise Revenue </p>
                <Chart options={revenueMediumWiseRevData.options} series={revenueMediumWiseRevData.series} type="bar" height={900} height={350} />
                <p> {sourceNameAndRevenue.statement} </p>
            </Skeleton>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="" bordered={true}>
            <Skeleton loading={sourceMediumNameAndRevenue.loader} active>
              <p> Source Medium Wise Revenue </p>
                <Chart options={revenueSourceMediumWiseRevData.options} series={revenueSourceMediumWiseRevData.series} type="bar" height={900} height={350} />
                <p> {sourceMediumNameAndRevenue.statement} </p>
            </Skeleton>
          </Card>
        </Col>
        <Col span={12} className='pl-15'>
          <Card title="" bordered={true}>
            <Skeleton loading={channelGrouping.loader} active>
              <p> Channel Grouping</p>
                <Chart options={channelGroupingData.options} series={channelGroupingData.series} type="bar" height={900} height={350} />
                <p> {channelGrouping.statement} </p>
            </Skeleton>
          </Card>
        </Col>
        <Col span={12} className='pl-15'>
          <Card title="" bordered={true}>
            <Skeleton loading={commonCompain.loader} active>
              <p> Top Product Name </p>
                <Chart options={commonCompainData.options} series={commonCompainData.series} type="bar" height={900} height={350} />
                <p> {commonCompain.statement} </p>
            </Skeleton>
          </Card>
        </Col>
        <Col span={12} className='pl-15'>
          <Card title="" bordered={true}>
            <Skeleton loading={productBrandData.loader} active>
              <p> Product Brand </p>
                <Chart options={productBrandDataGraph.options} series={productBrandDataGraph.series} type="bar" height={900} height={350} />
                <p> {productBrandData.statement} </p>
            </Skeleton>
          </Card>
        </Col>
        <Col span={24} className='pl-15'>
          <Card title="" bordered={true}>
              <Skeleton loading={sourceandmediumsplitData?.loader} active>
                <h3> Source and Medium Split Revenue </h3>
                  {/* <Collapse defaultActiveKey={['1']}>
                    { sourceandmediumsplitData?.data.map((e,i) => {
                      return <Panel header={e.source} key={i} extra={genExtra(e, 'source')}>
                        <p> {callMe({medium: e.medium, medium_contribution: e.medium_contribution,medium_revenue: e.medium_revenue}) }</p>
                      </Panel>
                    })
                  }
                </Collapse> */}
                <Table 
                  dataSource={sourceandmediumsplitData?.data}
                  bordered
                  pagination={false} 
                  columns={productMediumsplitColInner}
                  size="small"
                  expandable={{
                    defaultExpandedRowKeys: ['0'],
                    expandedRowRender: (record) => (
                  <>
                    { callMe({medium: record.medium, medium_contribution: record.medium_contribution,medium_revenue: record.medium_revenue})}
                   
                  </> 
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                  }}
                />
            </Skeleton>
          </Card>
        </Col>

        <Col span={24} className='pl-15'>
          <Card title="" bordered={true}>
            <Skeleton loading={productData.loader} active>
              <h3> Product Revenue </h3>
                <Table 
                  dataSource={productData?.data}
                  bordered
                  pagination={false} 
                  size="small"
                  columns={SourceMediumsplitColInner}
                  expandable={{
                    defaultExpandedRowKeys: ['0'],
                    expandedRowRender: (record) => (
                  <>
                    { callMe({product_name: record.product_name, product_revenue: record.product_revenue,product_contribution: record.product_contribution}, 'product') }
                  </> 
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                  }}
                />
            </Skeleton>
          </Card>
        </Col>

      </Row>
    </>
  )
}

export default ProductSourceRevenue
