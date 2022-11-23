import React, { useEffect, useState } from "react";
import { getdaynamicCharData } from "../../api/revenue";
import Chart from 'react-apexcharts'
import { Select, Col, Row, Button, DatePicker, Tooltip, Spin, Result, Segmented } from 'antd';
import '../dashboard/dashboard.css'
import {metricsArray} from '../../commons/tableColumn'
import HeatMap from '../dashboard/HeatMap'
import ActualvsTarget from '../dashboard/ActualvsTarget'
import moment from 'moment';
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;
const { RangePicker } = DatePicker;

function DaynamicGraph() {
  const [sourceName, setSourceName] = useState('google');
  const [xAxisData, setXAxisData] = useState('CTR');
  const [error, setError] = useState(false);
  const [yAxisData, setYAxisData] = useState('AOV');
  const [chartResult, setChartResult] = useState({x: [], y: [], name: [], loader: true});
  const [date, setDate] = useState({endDate: new Date(), startDate: new Date(new Date().setDate(new Date().getDate() - 60))});
  const [mainArr, setMainArr] = useState([{
    [xAxisData.toLowerCase()]: [],
    [yAxisData.toLowerCase()]: []
  }]);

  const [labelName, setLabelName] = useState({ x: '', y: '' })

  useEffect(() => {
    getData();
  }, [sourceName]);

  const dateFormat = 'YYYY/MM/DD';

  const getData = async(e) => {
    setChartResult({ loader: true })
    const queryObj = {
      current_end: date.startDate,
      current_start: date.endDate,
      source: sourceName,
      x: xAxisData.toLowerCase(),
      y: yAxisData.toLowerCase()
    }

    setLabelName({ x: xAxisData.toUpperCase(), y: yAxisData.toUpperCase() })

    const res = await getdaynamicCharData(queryObj);
    if (!res.data.Status) {
      setError(true);
      setChartResult({ loader: false })
    } else {
      setError(false);
      let tmpObj = {
        [xAxisData.toLowerCase()]: [],
        [yAxisData.toLowerCase()]: []
      }
      let name = [];
      for (let i of res.data.Response) {
        tmpObj[xAxisData.toLowerCase()].push(i[xAxisData.toLowerCase()])
        tmpObj[yAxisData.toLowerCase()].push(i[yAxisData.toLowerCase()])
        name.push(i.index)
      }
      setMainArr(tmpObj);
      setChartResult({ loader: false, name })
    }
  }

  const CallOnFilter = async(e) => {
    setChartResult({ loader: true })
    const queryObj = {
      current_end: e.sDate ? e.sDate : date.startDate,
      current_start:  e.eDate ? e.eDate : date.endDate,
      source: sourceName,
      x: e.key === 'x' ? e.val.toLowerCase() : xAxisData.toLowerCase(),
      y: e.key === 'y' ? e.val.toLowerCase() : yAxisData.toLowerCase()
    }

    setLabelName({ x: e.key === 'x' ? e.val.toUpperCase() : xAxisData.toUpperCase(), y:  e.key === 'y' ? e.val.toUpperCase() : yAxisData.toUpperCase() })

    const res = await getdaynamicCharData(queryObj);
    if (!res.data.Status) {
      setError(true);
      setChartResult({ loader: false })
    } else {
      setError(false);
      let tmpObj = {
        [e.key === 'x' ? e.val.toLowerCase() : xAxisData.toLowerCase()]: [],
        [e.key === 'y' ? e.val.toLowerCase() : yAxisData.toLowerCase()]: []
      }
      let name = [];
      for (let i of res.data.Response) {
        tmpObj[e.key === 'y' ? e.val.toLowerCase() : yAxisData.toLowerCase()].push(e.key === 'y' ? i[e.val.toLowerCase()] : i[yAxisData.toLowerCase()])
        tmpObj[e.key === 'x' ? e.val.toLowerCase() : xAxisData.toLowerCase()].push(e.key === 'x' ? i[e.val.toLowerCase()] : i[xAxisData.toLowerCase()])
        name.push(i.index)
      }
      setMainArr(tmpObj);
      setChartResult({ loader: false, name })
    }
  }

  const onChangeXaxis = (e) => {
    setXAxisData(e);
    CallOnFilter({ key: 'x', val: e })
    
  }

  const onChangeYaxis = (e) => {
    setYAxisData(e);
    CallOnFilter({ key: 'y', val: e })
  }

  const changeDate = (dateMoment, dateString, info) => {
    if (info.range == 'end') {
      let dataStart = new Date(dateString[0]);
      let dataEnd = new Date(dateString[1]);
      let date = {
        startDate:  new Date(dataStart.setDate(dataStart.getDate() + 1)),
        endDate: new Date( dataEnd.setDate(dataEnd.getDate() + 1)),
      }
      setDate(date);
      CallOnFilter({sDate: date.startDate, eDate: date.endDate })
    }
  }

  const sourceArray = [
  {
    label: 'Google Ads',
    value: 'google',
  },
  {
    label: 'Facebook Ads',
    value: 'facebook',
  }
  ]

  const chartData = {
    series: [{
      name:  labelName.x.toUpperCase(),
      data: mainArr[labelName.x.toLowerCase()]
    },
    {
      name:  labelName.y.toUpperCase(),
      data: mainArr[labelName.y.toLowerCase()]
    }
  ],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: chartResult.name
      },
      yaxis: [
        {
          axisTicks: {
              show: true,
          },
          axisBorder: {
              show: true,
              color: '#008FFB',
          },
          labels: {
              style: {
                  colors: '#008FFB',
              },
          },
          title: {
              text: labelName.x.toUpperCase(),
              style: {
                  color: '#008FFB',
              },
          },
          tooltip: {
              enabled: true,
          },
        },
        {
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396',
          },
          labels: {
            style: {
              colors: '#00E396',
            },
          },
          title: {
            text: labelName.y.toUpperCase(),
            style: {
              color: '#00E396',
            },
          },
        },
    ],
      tooltip: {
        x: {
          // format: 'dd/MM/yy HH:mm'
        },
      },
    }
  };

  return (
    <>
    <Row>
      <Col span={6} style={{ paddingTop: '30px' }}>
        <Segmented
          options={sourceArray}
          value={sourceName}
          onChange={setSourceName}
        />
      </Col>
      <Col span={4} style={{ paddingTop: '30px' }}>
        <Select
            showSearch
            placeholder="Select X-axis"
            optionFilterProp="children"
            onChange={onChangeXaxis}
            defaultValue={xAxisData}
            style={{
              width: '95%',
            }}
          >
          {metricsArray && metricsArray.map((e) => {
            return  <Option style={{display: e.value === yAxisData ? 'none' : 'block'}} value={e.value}>{e.key}</Option>
          })}
        </Select>
      </Col>
      <Col span={4} style={{ paddingTop: '30px' }}>
        <Select
            showSearch
            placeholder="Select Y-axis"
            optionFilterProp="children"
            defaultValue={yAxisData}
            onChange={onChangeYaxis}
            style={{
              width: '95%',
            }}
          >
          {metricsArray && metricsArray.map((e) => {
            return  <Option value={e.value} style={{display: e.value === xAxisData ? 'none' : 'block'}}>{e.key}</Option>
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
      {/* <Col span={1} style={{ paddingTop: '30px' }}>
        <Tooltip title="search">
          <Button type="primary" onClick={getData} shape="circle" icon={<SearchOutlined />} /> 
        </Tooltip>
      </Col> */}
      <Col span={24} style={{ paddingTop: '30px' }}>
        <Spin spinning={chartResult.loader}>
          {
            !error ? 
              <Chart options={chartData.options} series={chartData.series} type="area" height={350} />
            :
            <Result title="No data present between the given date ranges" />
          }
        </Spin>
      </Col>
      <HeatMap />
      <ActualvsTarget />
      </Row>
    </>
  );
}

export default DaynamicGraph;
