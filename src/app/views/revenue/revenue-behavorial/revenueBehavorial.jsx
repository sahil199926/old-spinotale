import React, { useEffect, useState } from 'react'
import {
  revenueBreakdownUserWise,
  revenueBreakdownDeviceWise,
  revenueBreakdownRegionWise,
  ageBreakDown,
  genderBreakDown,
  searchData,
  bestcohort
} from '../../../api/revenue'
import Chart from 'react-apexcharts'
import {
  Row,
  Col,
  Card,
  Segmented,
  Skeleton,
  Select,
  Button,
  Table,
  Result
} from 'antd'
import '../revenue-behavorial/revenueBehavorial.css'

import { ConsoleSqlOutlined, SearchOutlined } from '@ant-design/icons'
import { 
  bestCohortColumn
} from '../../../commons/tableColumn'

import { useSelector } from 'react-redux'
import axios from 'axios'

function RevenueBehavorial() {
  const [userWiseBreakDown, setUserWiseBreakDown] = useState({
    name: [],
    loading: true,
    value: [],
    noData: 'false',
  })
  const [deviceWiseBreakDown, setDeviceWiseBreakDown] = useState({
    name: [],
    loading: true,
    value: [],
    value2: [],
    noData: 'false',
  })
  const [regionWiseBreakDown, setRegionWiseBreakDown] = useState({
    name: [],
    loading: true,
    value: [],
    value2: [],
    noData: 'false',
  })
  const [genderWiseBreakDown, setGenderWiseBreakDown] = useState({
    name: [],
    loading: true,
    value: [],
    value2: [],
    noData: 'false',
  })
  const [ageWiseBreakDown, setAgeWiseBreakDown] = useState({
    name: [],
    loading: true,
    value: [],
    value2: [],
    noData: 'false',
  })
  const [userStatement, setUserStatement] = useState('')
  const [regionStatement, setregionStatement] = useState('')
  const [deviceStatement, setdeviceStatement] = useState('')
  const [regionLoader, setRegionLoader] = useState(true)
  const [tableLoader, setTableLoader] = useState(false)
  const [dateForArea, setDateForArea] = useState('region')
  const [ageStatement, setAgeStatement] = useState('')
  const [genderStatement, setGenderStatement] = useState('')
  const [bestcohortData, setBestcohortData] = useState([])
  const [bestcohortLoader, setBestcohort] = useState(true)
  const [deviceWiseBreakDownData, setDeviceWiseBreakDownData] = useState({
    name: [],
    loading: true,
    value: [],
    noData: 'false',
  })

  const [deviceName, setDeviceName] = useState([])
  const [cityName, setCityName] = useState([])
  const [regionName, setRegionName] = useState([])
  const [genderName, setGenderName] = useState([])
  const [resData, SetResData] = useState([])
  const [tblCol, setTblCol] = useState([])
  const [tblColData, setTblColData] = useState([])
  const [usertype, setUserName] = useState([])
  const [useragebracket, setUseragebracket] = useState([])
  const [dataExist, setDataExist] = useState(true);

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

  const { Option } = Select

  useEffect(() => {
    getRevenueBreakdownUserWise(queryObj)
    getDeviceWiseBreakdown(queryObj)
    getGenderBreakdown(queryObj)
    getAgeBreakdown(queryObj)
    getBestcohort(queryObj)
    // getRegionwiseBreakdownForComp(queryObj);
  }, [myState])


  useEffect(() => {
    getRegionwiseBreakdown(queryObj)
  }, [dateForArea, myState])

  const getGenderBreakdown = async (queryObj) => {
    queryObj.source = 'ga'
    queryObj.groupby = 'usergender'
    const res = await genderBreakDown(queryObj)
    if (!res.data.Status) {
      setDataExist(false);
      return
    }
    let newObj = { name: [], value: [], loading: false, noData: 'false' }
    if (
      res?.data?.Response?.transactionrevenue?.length ||
      res?.data?.Response?.currentusergender?.length
    ) {
      if (!myState.comparision || myState.comparision == 'False') {
        newObj.name.push(...res.data.Response.usergender)
        newObj.value.push({
          name: 'Revenue',
          data: [...res.data.Response.transactionrevenue],
        })
        setGenderStatement(res.data.Response.statements)
        newObj.noData = 'false'
        setGenderWiseBreakDown(newObj)
      } else {
        newObj.name.push(...res.data.Response.currentusergender)
        newObj.value.push(
          { name: 'Current Date', data: res.data.Response.currentRev },
          { name: 'Previous Date', data: res.data.Response.previousRev }
        )
        setGenderStatement([...res?.data?.Response?.currentstatements, ...res?.data?.Response?.previousstatements])
        newObj.noData = 'false'
        setGenderWiseBreakDown(newObj)
      }
    } else {
      newObj.noData = 'true'
      setGenderWiseBreakDown(newObj)
    }
  }

  const getAgeBreakdown = async (queryObj) => {
    queryObj.source = 'ga'
    queryObj.groupby = 'useragebracket'
    const res = await ageBreakDown(queryObj)
    if (!res.data.Status) {
      setDataExist(false);
      return
    }
    let newObj = { name: [], value: [], loading: false, noData: 'false' }
    if (
      res?.data?.Response?.transactionrevenue?.length ||
      res?.data?.Response?.currentuseragebracket?.length
    ) {
      if (!myState.comparision || myState.comparision == 'False') {
        setAgeStatement(res.data.Response.statements)
        newObj.value.push({
          name: 'Revenue',
          data: [...res.data.Response.transactionrevenue],
        })
        newObj.name = res.data.Response.useragebracket
        newObj.noData = 'false'
        setAgeWiseBreakDown(newObj)
      } else {
        setAgeStatement([...res?.data?.Response?.currentstatements, ...res?.data?.Response?.previousstatements])
        newObj.value.push(
          { name: 'Current Date', data: res.data.Response.currentRev },
          { name: 'Previous Date', data: res.data.Response.previousRev }
        )
        newObj.name = res.data.Response.currentuseragebracket
        newObj.noData = 'false'
        setAgeWiseBreakDown(newObj)
      }
    } else {
      newObj.noData = 'true'
      setAgeWiseBreakDown(newObj)
    }
  }

  const getRevenueBreakdownUserWise = async (query) => {
    query.source = 'ga'
    const res = await revenueBreakdownUserWise(query)
    if (!res.data.Status) {
      setDataExist(false);
      return
    }
    let newObj = { name: [], value: [], loading: false, noData: 'false' }
    if (res?.data?.Response?.usertype?.length || res?.data?.Response?.currentRev?.length) {
      if (!myState.comparision || myState.comparision == 'False') {
        setUserStatement(res.data.Response.statement)
        newObj.value.push(
          {
            name: res.data.Response.usertype[0],
            data: [res.data.Response.transactionrevenue[0]],
          },
          {
            name: res.data.Response.usertype[1],
            data: [res.data.Response.transactionrevenue[1]],
          }
        )
        newObj.name.push(...res.data.Response.usertype)
        newObj.noData = 'false'

        setUserWiseBreakDown(newObj)
      } else {
        newObj.value.push(
          {
            name: ['Current Date'],
            data: res.data.Response.currentRev,
          },
          {
            name: ['Previous Date'],
            data: res.data.Response.previousRev,
          }
        )
        console.log(res.data.Response, 'res.data.Response')
        // setUserStatement([...res?.data?.currentstatements, ...res?.data?.previousstatements])
        newObj.name.push(...res.data.Response.currentusertype)
        newObj.noData = 'false'

        setUserWiseBreakDown(newObj)
      }
    } else {
      newObj.noData = 'true'
      setUserWiseBreakDown(newObj)
    }
  }

  const getSearchData = async () => {
    setTableLoader(true)
    const queryObj = {abc: {
      region: regionName,
      city: cityName,
      devicecategory: deviceName,
      useragebracket: useragebracket,
      usergender: genderName,
      usertype: usertype,
    },
    current_end: currStartDate,
    current_start: currEndDate,
  }

    const LabelNp = []
    const res = await searchData(queryObj)
    let x = res.data.Response
    let labels = res.data.Response
    for (let k in labels) {
      LabelNp.push({
        title: k.charAt(0).toUpperCase() + k.slice(1),
        dataIndex: k,
      })
    }
    // x.length = x.length - 1

    LabelNp.length = LabelNp.length - 1
    console.log("🚀 ~ file: revenueBehavorial.jsx ~ line 281 ~ getSearchData ~ LabelNp", LabelNp)
    setTblCol(LabelNp)
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

    setTblColData(tmpArr)
    console.log("🚀 ~ file: revenueBehavorial.jsx ~ line 295 ~ getSearchData ~ tmpArr", tmpArr)
    setTableLoader(false)
  }

  // const getRegionwiseBreakdownForComp = async (queryObj) => {
  //   queryObj.source = 'ga'
  //   queryObj.groupby = 'region'
  //   const res = await revenueBreakdownRegionWise(queryObj)
  //   let newObj = { name: [], value: [], loading: false, noData: 'false' }
  //   console.log("🚀 ~ file: revenueBehavorial.jsx ~ line 266 ~ getRegionwiseBreakdownForComp ~ res", res.data)
  //   newObj.name = res.data.region
  //   setdeviceStatement(res.data.statements);
  //   newObj.value.push({name: 'Revenue', data: [...res.data.transactionrevenue]})
  //   setdeviceStatement(res.data.data.statement)
  //   newObj.name.push(i.object)
  //   setDeviceWiseBreakDownData(newObj)
  // }

  const getBestcohort = async (obj) => {
    setBestcohort(true)
    const res = await bestcohort(obj);
    setBestcohortData(res.data.Response)
    setBestcohort(false)
  }

  const getRegionwiseBreakdown = async (queryObj) => {
    queryObj.source = 'ga';
    queryObj.groupby =  dateForArea;
    const res = await revenueBreakdownRegionWise(queryObj)
    let newObj = { name: [], value: [], loading: false, noData: 'false' }
    // if ( res?.data?.RevenueContribution?.length || res?.data?.previousRev?.length) {
      if (myState.comparision == 'True') {
        newObj.name = res.data.Response.currentregion ? res.data.Response.currentregion : res.data.Response.currentcity
        setdeviceStatement([...res?.data?.Response.currentstatements, ...res?.data?.Response.previousstatements]);
        newObj.value.push(
          { name: 'Current Date', data: res.data.Response.currentRev },
          { name: 'Previous Date', data: res.data.Response.previousRev }
        )
        newObj.noData = 'false'
        setDeviceWiseBreakDown(newObj)
        } else {
        newObj.name = res.data.Response.region ? res.data.Response.region : res.data.Response.city
        setdeviceStatement(res.data.Response.statements);
        newObj.value.push({name: 'Revenue', data: res.data.Response.transactionrevenue})
        newObj.name = res.data.Response.region ? res.data.Response.region : res.data.Response.city
        newObj.noData = 'false'
        setDeviceWiseBreakDown(newObj)
        console.log("🚀 ~ file: revenueBehavorial.jsx ~ line 321 ~ getRegionwiseBreakdown ~ newObj.value", newObj.value)
        }
    // } else {
    //   newObj.noData = 'true'
    //   setDeviceWiseBreakDown(newObj)
    // }
 

  }
  const getDeviceWiseBreakdown = async (queryObj) => {
    queryObj.source = 'ga'
    queryObj.groupby = 'devicecategory'
    const res = await revenueBreakdownDeviceWise(queryObj)
    if (!res.data.Status) {
      setDataExist(false);
      return
    }
    let newObj = { name: [], value: [], loading: false, noData: 'false' }
    if (res?.data?.Response?.transactionrevenue?.length || res?.data?.Response?.previousRev?.length) {
      if (myState.comparision == 'True') {
        newObj.value.push(
          { name: 'Current Date', data: res.data.Response.currentRev },
          { name: 'Previous Date', data: res.data.Response.previousRev }
        )
        setregionStatement([...res?.data.Response?.currentstatements, ...res?.data.Response?.previousstatements])
        newObj.name.push(...res.data.Response.currentdevicecategory)
        newObj.noData = 'false'
        setRegionWiseBreakDown(newObj)
      } else {
        newObj.value.push({
          name: 'Revenue',
          data: [...res.data.Response.transactionrevenue],
        })
        setregionStatement(res.data.Response.statements)
        newObj.name.push(...res.data.Response.devicecategory)
        setRegionWiseBreakDown(newObj)
      }
    } else {
      newObj.noData = 'true'
      setRegionWiseBreakDown(newObj)
    }
  }

  const deviceData = {
    series: deviceWiseBreakDown.value,
    options: {
      chart: {
        type: 'bar',
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: deviceWiseBreakDown.name,
      },
    },
  }

  const regionData = {
    series: regionWiseBreakDown.value,
    options: {
      chart: {
        type: 'bar',
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: regionWiseBreakDown.name,
      },
    },
  }

  const userData = {
    series: userWiseBreakDown.value,
    options: {
      chart: {
        type: 'bar',
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: userWiseBreakDown.name,
      },
    },
  }

  const genderData = {
    series: genderWiseBreakDown.value,
    options: {
      chart: {
        type: 'bar',
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: genderWiseBreakDown.name,
      },
    },
  }

  const ageData = {
    series: ageWiseBreakDown.value,
    options: {
      chart: {
        type: 'bar',
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: ageWiseBreakDown.name,
      },
    },
  }

  const areaCity = [
    {
      label: 'City',
      value: 'city',
    },
    {
      label: 'Region',
      value: 'region',
    },
  ]

  const cityList = deviceWiseBreakDown.name
  const deviceList = regionWiseBreakDown.name
  const regionList = deviceWiseBreakDownData.name

  return (
    <>
    { dataExist ?
      <Row style={{ margin: '15px', rowGap: '40px' }}>
        <Col span={24}>
          <Card title="" bordered={true}>
            {userWiseBreakDown.noData == 'true' ? (
              'No Data Avaliable'
            ) : (
              <Skeleton
                loading={userWiseBreakDown.loading}
                active
              >
                <p>User Wise Revenue Comparison</p>
                <Chart
                  options={userData.options}
                  series={userData.series}
                  type="bar"
                  height={170}
                />
                <p>{userStatement}</p>
              </Skeleton>
            )}
          </Card>
          </Col>
          <Col span={11}>
          <Card title="" bordered={true}>
            {regionWiseBreakDown.noData == 'false' ? (
              <Skeleton
                loading={regionWiseBreakDown.loading}
                active
              >
                <p>Device Wise Revenue Comparison</p>
                <Chart
                  options={regionData.options}
                  series={regionData.series}
                  type="bar"
                  height={230}
                />
                {regionStatement &&
                  regionStatement.map((e, i) => {
                    return (
                      <p key={i}>
                        {' '}
                        {i + 1} {e}{' '}
                      </p>
                    )
                  })}
              </Skeleton>
            ) : (
              'No Data Avaliable'
            )}
          </Card>
          <Card title="" bordered={true}>
            {genderWiseBreakDown.noData == 'true' ? (
              
              <>
              <h3>Gender Wise Revenue Comparison</h3>
               <p> No Data Avaliable</p>
              </>
              
            ) : (
              <Skeleton
                loading={genderWiseBreakDown.loading}
                active
              >
                <p>Gender Wise Revenue Comparison</p>
                <Chart
                  options={genderData.options}
                  series={genderData.series}
                  type="bar"
                  height={130}
                />
                {genderStatement &&
                  genderStatement.map((e, i) => {
                    return (
                      <p key={i}>
                        {' '}
                        {i + 1} {e}{' '}
                      </p>
                    )
                  })}
              </Skeleton>
            )}
          </Card>
        </Col>

         <Col span={13} className="pl-15">
          <Card title="" bordered={true}>
            { deviceWiseBreakDown.noData === 'false' ? 
            <Skeleton loading={deviceWiseBreakDown.loading} active>
            
            <Segmented
              options={areaCity}
              value={dateForArea}
              onChange={setDateForArea}
            />
            <Chart
              options={deviceData.options}
              series={deviceData.series}
              type="bar"
              height={430}
            />
            {
              deviceStatement && deviceStatement.map((e, i) => {
                return <p key={i}> {i + 1} {e} </p>
              })
            }
          </Skeleton>
          
          : <>
          <h4>Region Wise Revenue Comparison</h4>
          <p>No Data Avaliable</p>
          </>
          
          }
          </Card>
        </Col> 

        <Col span={22} className="pl-15">
          <Card title="" bordered={true}>
            {ageWiseBreakDown.noData == 'false' ? (
              <Skeleton loading={ageWiseBreakDown.loading} active>
                <p>Age Wise Revenue Comparison</p>
                <Chart
                  options={ageData.options}
                  series={ageData.series}
                  type="bar"
                  height={430}
                />
                {ageStatement &&
                  ageStatement.map((e, i) => {
                    return (
                      <p key={i}>
                        {' '}
                        {i + 1} {e}{' '}
                      </p>
                    )
                  })}
              </Skeleton>
            ) : (
              'No Data Avaliable'
            )}
          </Card>
        </Col>
        <Col span={24} className="pl-15">
            <h3 className='center'> Best Cohort</h3>
            <Card>
              <Skeleton loading={bestcohortLoader} active>
                <Table 
                scroll={{
                  x: 1400,
                  y: 800,
                }}
                dataSource={bestcohortData} bordered columns={bestCohortColumn} />
              </Skeleton>
            </Card>
          </Col>
           <Col span={24} className=" center pl-15">
        <h5> Dynamic cohort analysis </h5>
        </Col>

        <Col span={6} className="pl-15">
          <Select mode="multiple" placeholder="Select Device" style={{ width: '100%' }} onChange={(e) => { setDeviceName(e) }} allowClear>
            {deviceList.map((name) => (
              <Option key={name}>{name}</Option>
            ))}
          </Select>
        </Col>

        <Col span={6} className="pl-15">
          <Select mode="multiple" placeholder="Select Region" style={{ width: '100%' }} onChange={(e) => { setRegionName(e) }} disabled={cityName.length > 0} allowClear>
            {regionList.map((name) => (
              <Option key={name}>{name}</Option>
            ))}
          </Select>
        </Col>

        <Col span={6} className="pl-15">
          <Select mode="multiple" placeholder="Select City" style={{ width: '100%' }} onChange={(e) => { setCityName(e) }} disabled={regionName.length > 0} allowClear>
            {cityList && cityList.map((name) => (
              <Option key={name}>{name}</Option>
            ))}
          </Select>
        </Col>

        <Col span={6} className="pl-15">
          <Select mode="multiple" placeholder="Select Gender" style={{ width: '100%' }} onChange={(e) => { setGenderName(e) }} allowClear>
            {genderWiseBreakDown && genderWiseBreakDown.name.map((name) => (
              <Option key={name}>{name}</Option>
            ))}
          </Select>
        </Col>

        <Col span={10} className="pl-15">
          <Select mode="multiple" placeholder="Select User Type" style={{ width: '100%' }} onChange={(e) => { setUserName(e) }} allowClear>
            {userWiseBreakDown && userWiseBreakDown.name.map((name) => (
              <Option key={name}>{name}</Option>
            ))}
          </Select>
        </Col>

        <Col span={10} className="pl-15">
          <Select mode="multiple" placeholder="Select User Bracket" style={{ width: '100%' }} onChange={(e) => { setUseragebracket(e) }} allowClear>
            {ageWiseBreakDown && ageWiseBreakDown.name.map((name) => (
              <Option key={name}>{name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={4} className="pl-15">
          <Button type="primary" shape="circle" disabled={regionName.length == 0 && deviceName.length == 0 && genderName.length == 0 && usertype.length == 0 && cityName.length == 0 && useragebracket.length == 0} onClick={getSearchData} icon={<SearchOutlined />} />
        </Col>
{/* <br></br>
 { JSON.stringify(tblColData) }
<br></br>

<br></br>
{ JSON.stringify(tblColData) }
<br></br> */}
        <Col span={24} className="pl-15">
            <Card>
              <Skeleton loading={tableLoader} >
              <Table columns={tblColData} dataSource={tblCol} />
              </Skeleton>
            </Card>
          </Col>
      </Row>
      : 
      
      <Result
      status="403"
      title="403"
      subTitle="No data present between the given date ranges."
    />
      }
    </>
  )
}

export default RevenueBehavorial
