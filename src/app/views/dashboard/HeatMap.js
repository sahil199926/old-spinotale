import React, { useEffect, useState } from "react";
import { fullCorr } from "../../api/revenue";
import Chart from 'react-apexcharts'
import {Col, Row, DatePicker, Segmented } from 'antd';
import '../dashboard/dashboard.css'
import moment from 'moment';
const { RangePicker } = DatePicker;

function HeatMap() {
  const [sourceName, setSourceName] = useState('google');
  const [error, setError] = useState(false);
  const [date, setDate] = useState({endDate: new Date(), startDate: new Date(new Date().setDate(new Date().getDate() - 60))});
  const [mapData, setMapData] = useState([]);
  const [keyData, setKeyData] = useState([]);

  useEffect(() => {
    getData();      
  }, [sourceName]);

  const dateFormat = 'YYYY/MM/DD';
  const getData = async(e) => {
    const queryObj = {
      current_end: e?.startDate ? e?.startDate : date.startDate,
      current_start: e?.endDate ? e?.endDate : date.endDate,
      source: sourceName,
    }
    const res = await fullCorr(queryObj);
    let tmoArr = [];
    for (let i in res.data.Response) {
      tmoArr.push({data: res.data.Response[i], name: i})
    }
    setKeyData(res.data.Response.Xaxis);
    tmoArr = tmoArr.slice(0, -1)
    setMapData(tmoArr.reverse())
  }

  const changeDate = (dateMoment, dateString, info) => {
    if (info.range == 'end') {
      let dataStart = new Date(dateString[0]);
      let dataEnd = new Date(dateString[1]);
      let date = {
        startDate:  new Date(dataStart.setDate(dataStart.getDate() + 1)),
        endDate: new Date( dataEnd.setDate(dataEnd.getDate() + 1)),
      }
      getData(date);
      setDate(date);
    }
  }

  const sourceArray = [
    {
      label: 'Google Analytics',
      value: 'ga',
    },{
    label: 'Google Ads',
    value: 'google',
  },{
    label: 'Facebook Ads',
    value: 'facebook',
  }]

 const plotData = {
    series: mapData,
    options: {
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.7,
          radius: 0,
          useFillColorAsStroke: true,
          colorScale: {
            ranges: [{
              from: 0.25,
              to: 1,
              name: 'High',
              color: '#055A05'
            },{
                from: -1,
                to: -0.25,
                name: 'Low',
                color: '#f5424b'
              },{
                from: -0.25,
                to: 0.25,
                name: 'Medium',
                color: '#EEEB1E'
              },
            ]
          }
        }
      },
      chart: {
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#000000']
        }
      },
      xaxis: {
        type: 'category',
        categories: ['cost', 'impressions', 'clicks', 'allconv', 'allconvvalue', 'ROAS', 'CPA', 'AOV', 'conversion']
      },
      title: {
        // text: 'HeatMap Chart (Single color)'
      },
    }
  };

  return (
    <>
    <Row>
    <Col span={24} style={{ paddingTop: '30px' }}>
      <h4 className="center">Correlation Heatmap</h4>  
      </Col>

      <Col span={10} style={{ paddingTop: '30px' }}>
        <Segmented
          options={sourceArray}
          value={sourceName}
          onChange={setSourceName}
        />
      </Col>
      <Col span={8} style={{ paddingTop: '30px' }}>
        <RangePicker
          defaultValue={[moment(date.startDate, dateFormat), moment(date.endDate, dateFormat)]}
          format={dateFormat}
          onCalendarChange	={changeDate}
        />
      </Col>
      <Col span={24} style={{ paddingTop: '30px' }}>
      <>
       {keyData.length ? 
      <Chart options={plotData.options} series={plotData.series} height="500" width="1000" type="heatmap" />
      : '' }
      </>
      </Col>
      </Row>
    </>
  );
}

export default HeatMap;
