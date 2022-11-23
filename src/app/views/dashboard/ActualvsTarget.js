import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts'
import {Col, Row, Select, DatePicker,Card } from 'antd';
import '../dashboard/dashboard.css'
import moment from 'moment';
import {moreFilter} from '../../commons/tableColumn'
import {  actualvstargated, notset, notargeted } from '../../api/revenue'
const { RangePicker } = DatePicker;
const { Option } = Select;

function ActualvsTarget() {
  const [error, setError] = useState(false);
  const [date, setDate] = useState({endDate: new Date(), startDate: new Date(new Date().setDate(new Date().getDate() - 60))});
  const [mapData, setMapData] = useState([]);
  const [mainFilter, setMainFilter] = useState('usergender')
  const [ notsetVal, setNotSetVal ] = useState({ statement: '', url: '' })
  const [ notTarget, setNotTarget ] = useState('')

  useEffect(() => {
    getData();  
    notTargetData()
    if (mainFilter === 'region') {
      getAdditionalData()
    }
  }, [mainFilter, date]);

  const dateFormat = 'YYYY/MM/DD';
  const notTargetData = async() => {
    const queryObj = {
      current_start: date.startDate,
      current_end: date.endDate,
      col: mainFilter
    }
    const res1 = await notargeted(queryObj)
    setNotTarget(res1.data.Response)
  }

  const getAdditionalData = async() => {
    const queryObj = {
      current_start: date.startDate,
      current_end: date.endDate,
      col: mainFilter
    }
    const res = await notset(queryObj)
    setNotSetVal({ statement: res.data.Response.statement, url: res.data.Response.url})
  } 
  const getData = async(e) => {
    const tmpArr = [];
    const queryObj = {
      current_start: date.startDate,
      current_end: date.endDate,
      col: mainFilter
    }
    setError(true);
    const res  = await actualvstargated(queryObj);
    const x = res.data.Response
    for(let i of x) {
      let tmpObj =  {
        x: i[mainFilter],
        y: i.Actual,
        goals: [{
            name: 'Target',
            value: i.Targeted,
            strokeHeight: 5,
            strokeColor: '#775DD0'
          }
        ]
      }
    tmpArr.push(tmpObj)
  }
  setError(false);
  setMapData(tmpArr)
  }

  const changeDate = (dateMoment, dateString, info) => {
    if (info.range == 'end') {
      let dataStart = new Date(dateString[0]);
      let dataEnd = new Date(dateString[1]);
      let date = {
        startDate:  new Date(dataStart.setDate(dataStart.getDate() + 1)),
        endDate: new Date( dataEnd.setDate(dataEnd.getDate() + 1)),
      }
      // getData(date);
      setDate(date);
    }
  }


  const plotData =  {
    series: [{
      name: 'Actual',
      data: mapData
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          columnWidth: '60%'
        }
      },
      colors: ['#00E396'],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['Actual', 'Target'],
        markers: {
          fillColors: ['#00E396', '#775DD0']
        }
      }
    }
  }

  return (
    <>
    <Row>
      <Col span={24} style={{ paddingTop: '30px' }}>
        <h4 className="center">Actual vs Target</h4>  
      </Col>
      <Col span={6} offset={4} style={{ paddingTop: '30px' }}>
        <Select
            showSearch
            placeholder="Please Select"
            optionFilterProp="children"
            onChange={(e) => { setMainFilter(e) }}
            defaultValue={mainFilter}
            style={{
              width: '95%',
            }}
          >
          {moreFilter && moreFilter.map((e) => {
            return <Option value={e.value}>{e.key}</Option>
          })}
        </Select>
      </Col>
      <Col span={8} style={{ paddingTop: '30px' }}>
        <RangePicker
          defaultValue={[moment(date.startDate, dateFormat), moment(date.endDate, dateFormat)]}
          format={dateFormat}
          onCalendarChange	={changeDate}
        />
      </Col>
      
      <Col className="center" span={20}  offset={2}  style={{ paddingTop: '30px' }}>
        <Chart options={plotData.options} series={plotData.series} height="350" type="bar" />
      </Col>
      {
        mainFilter === 'region' ? 
        <Col className="center" span={20}  offset={2}  style={{ paddingTop: '30px', paddingBottom: '30px' }}>
          <Card>
            <b>Note:</b> {notsetVal.statement}
            <p><a href={notsetVal.url} target="_blank"> Click here </a> for more information</p>
          </Card>
        </Col>
        : ''}
        <Col className="center" span={20}  offset={2}  style={{ paddingTop: '30px', paddingBottom: '30px' }}>
          <Card>
            <b>{notTarget}</b>
          </Card>
        </Col>

      </Row>
    </>
  );
}

export default ActualvsTarget;
