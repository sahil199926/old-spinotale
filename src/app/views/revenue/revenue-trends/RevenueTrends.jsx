import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Segmented, Skeleton, Table, Alert, Result } from 'antd'
import {
    highestRevenueOfMonth,
    revenueGrowthComparison,
    highestRevenueOfTheQuarter,
    highestRevenueOfTheWeek,
    revenueAverageGrowth,
    revenueThirtySixtyNinty
} from '../../../api/revenue'
import './revenuetrends.css'
import Chart from 'react-apexcharts'
import CountUp from 'react-countup'
import { useSelector } from 'react-redux'
import { 
    setHighestMonthTransactionsColmun
} from '../../../commons/tableColumn'

const RevenueTrends = () => {
    // Declear all useState
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

    const [compWeek, setCompWeek] = useState({ data1: [], data2: [], name: [], loader: true })
    const [highestMonthTransactions, setHighestMonthTransactions] = useState({value: {t: [], r: []}, name: [], statement: [], loader: true })
    const [growthComparison, setGrowthComparison] = useState( { data: [], statement: '', loader: true } )
    const [quarterData, setQuarterData] = useState({ name: [], value: [], statement: '', loader: true } )
    const [weekData, setWeekData] = useState({name: [], value: [], statement: [], loader: true})
    const [month, setMonth] = useState('ga')
    const [quarter, setQuarter] = useState('ga')
    const [totalRevenue, setTotalRevenue] = useState('ga')
    const [revenueForContribution, setTotalRevenueForContribution] = useState('ga')
    const [week, setWeek] = useState('ga')
    const [graphRecord,setGraphRecord] = useState({ data: [], name: [], loader: true, statement: [] })
    const [graphRecordForSource,setGraphRecordForSource] = useState({ data: [], name: [], loader: true, statement: [] })
    const [graphRecordForCategory, setGraphRecordForCategory] = useState({ data: [], name: [], loader: true, statement: [] })
    const [error, getError] = useState('true')
    const [errorProduct, getErrorForProduct] = useState('true')
    const [errorCategory, getErrorForCategory] = useState('true')
    const [qtrData, setQtrData] = useState({ name: [], value: [], loader: true, statement: [] })
    const [productCategoryAndNameData, setProductCategoryAndNameData] = useState({ name: [], value: [], statement: [], loading: true })

    // Declear all useEffect
    const Cdate1 = new Date(currStartDate);
    const Cdate2 = new Date(currEndDate);
    const CdiffTime = Math.abs(Cdate2 - Cdate1);
    const CdiffDays = Math.ceil(CdiffTime / (1000 * 60 * 60 * 24)); 
    const Pdate1 = new Date(preStartDate);
    const Pdate2 = new Date(preEndDate);
    const PdiffTime = Math.abs(Pdate2 - Pdate1);
    const PdiffDays = Math.ceil(PdiffTime / (1000 * 60 * 60 * 24)); 

    useEffect(() => {
        getRevenueAverageGrowth(queryObj)
        getRevenueAverageGrowthBySource(queryObj)
        getRevenueAverageGrowthByCategory(queryObj)
    }, [myState])

    useEffect(() => {
      getRevenueGrowthComparison(queryObj)
    }, [totalRevenue, myState])


    useEffect(() => {
      getRevenueThirtySixtyNinty(queryObj)
    }, [revenueForContribution, myState])

    useEffect(() => {
      getHighestRevenueOfMonth(queryObj)
    }, [month, myState])

    useEffect(() => {
        getHighestRevenueOfTheQuarter(queryObj)
    }, [quarter])

    useEffect(() => {
        getHighestRevenueOfTheWeek(queryObj)
    }, [week, myState])

    const getRevenueThirtySixtyNinty = async(q) => {
        q.col = 'source'
        q.source = revenueForContribution
        q.period = [30, 60, 90]
        const res = await revenueThirtySixtyNinty(q)
        if (!res?.data?.Status) {
          const obj = {
            value: [],
            name: [],
            loader: true,
            statement: [],
          }
          setQtrData(obj);
        } else {
          const obj = {
            value: res?.data?.Response?.rev_change_per,
            name: res?.data?.Response?.period,
            loader: false,
            statement: res?.data?.Response?.statement,
          }
          setQtrData(obj);
        }
      }

      const graphqData = {
        series: [{
          name: 'Revenue',
          data: qtrData.value
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: qtrData.name,
          },
          yaxis: {
            title: {
              text: 'Revenue'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              }
            }
          }
        }
    }

    const getRevenueAverageGrowthBySource = async (q) => {
        q.how = 'source'
        q.source = 'ga'
        getErrorForProduct('true')
        const res = await revenueAverageGrowth(q)
        if (!res.data.Status) {
            getError('true')
        } else {

            const x = { data: [{
                name: '30',
                data: res.data.Response.growth_30
              },
              {
                  name: '60',
                  data:  res.data.Response.growth_60
                }, 
              {
                name: '90',
                data:  res.data.Response.growth_90
              }, {
                name: 'Yearly',
                data:  res.data.Response.growth_365
              }],
              name: res.data.Response.index,
              loader: false,
              statement: res.data.Response.statement
            }
            getErrorForProduct('false')
            setGraphRecordForSource(x)
        }
    } 


    const getRevenueAverageGrowthByCategory = async (q) => {
      q.how = 'productcategory'
      q.source = 'ga'
      getErrorForCategory('true')
      const res = await revenueAverageGrowth(q)
      if (!res.data.Status) {
          getError('true')
      } else {

          const x = { data: [{
              name: '30',
              data: res.data.Response.growth_30
            },
            {
                name: '60',
                data:  res.data.Response.growth_60
              }, 
            {
              name: '90',
              data:  res.data.Response.growth_90
            }, {
              name: 'Yearly',
              data:  res.data.Response.growth_365
            }],
            name: res.data.Response.index,
            loader: false,
            statement: res.data.Response.statement
          }
          getErrorForCategory('false')
          setGraphRecordForCategory(x)
      }
  } 



    const getRevenueAverageGrowth = async (q) => {
        q.how = 'productname'
        q.source = 'ga'
        getError('true')
        const res = await revenueAverageGrowth(q)
        if (!res.data.Status) {
            getError('true')
        } else {

            const x = { data: [{
                name: '30',
                data: res.data.Response.growth_30
              },
              {
                  name: '60',
                  data:  res.data.Response.growth_60
                }, 
              {
                name: '90',
                data:  res.data.Response.growth_90
              }, {
                name: 'Yearly',
                data:  res.data.Response.growth_365
              }],
              name: res.data.Response.index,
              loader: false,
              statement: res.data.Response.statement
            }
            getError('false')
            setGraphRecord(x)
        }
    }

    // Declear all business logics
    const getHighestRevenueOfMonth = async (queryObj) => {
        setHighestMonthTransactions({
            value:{
                t: [],
                r: []
            },
            name: [],
            statement: [],
            loader: true
            }
        )

        queryObj.source = month
        const res = await highestRevenueOfMonth(queryObj)
      if (myState.comparision == 'True') {
        const LabelNp = []
        let x = res.data.Response
          for (let k in res.data.Response) {
            LabelNp.push({
              title: k.charAt(0).toUpperCase() + k.slice(1),
              dataIndex: k,
            })
          }
          let tmpArr = []
          let obj_length = x[Object.keys(x)[0]].length
          let obj_keys = Object.keys(x)
          for (let j = 0; j < obj_length; j++) {
            let tmpObj = {}
            for (let curr of obj_keys) {
              tmpObj[curr] = x[curr][j] ? x[curr][j] : ''
            }
            tmpArr.push(tmpObj)
        }
        setHighestMonthTransactions({
        value:{
            t: [],
            r: []
        },
        name: tmpArr,
        statement: res.data.Response.statement,
        loader: false
        })
    } else {
        const tmpObj = {
            value:{
                t: res.data.Response.transactions,
                r: res.data.Response.transactionrevenue
            },
            name: res.data.Response.date,
            statement: res.data.Response.statement,
            loader: false
        }
        setHighestMonthTransactions(tmpObj)
        }
    }   

    const getRevenueGrowthComparison = async (queryObj) => {
        queryObj.source =  totalRevenue
        const res = await revenueGrowthComparison(queryObj)
      if (myState.comparision == 'True') {
          const objTmp = {
              data: {
                Previous_rev:res.data.Response.Previous_rev,
                Previous_tran:res.data.Response.Previous_tran,
                revenue:res.data.Response.current_rev,
                transactions:res.data.Response.current_tran,
            },
              statement: res.data.Response.statement,
              loader: false
           }
          setGrowthComparison(objTmp);
      } else {
        const objTmp = {
            data: {revenue:res.data.Response.revenue, transactions: res.data.Response.transactions},
            statement: res.data.Response.statement,
            loader: false
         }
        setGrowthComparison(objTmp);
      }
    }

    const getHighestRevenueOfTheQuarter = async (queryObj) => {
        queryObj.source =  quarter
        setQuarterData({
            name: [],
            value: [],
            loader: true,
            statement: []
        })

        let res = await highestRevenueOfTheQuarter(queryObj)
        if (myState.comparision == 'True') {

         } else {
            const tmpObj = {
                name: res.data.Response.Quarter,
                value: res.data.Response.Revenue,
                loader: false,
                statement: res.data.Response.statement
            }
            setQuarterData(tmpObj)
        }
    }

    const getHighestRevenueOfTheWeek = async (data) => {
        queryObj.source = week 
        const res = await highestRevenueOfTheWeek(queryObj)
        let objectTmp = {
            value1: [],
            value2: [],
            name: [],
            statement: [],
            loader: true
        }
        // setCompWeek({ loader: true})
        if (myState.comparision === 'True') { 
            if (CdiffDays > 7 && PdiffDays > 7 ) {
                objectTmp.value1 = res?.data?.Response?.Current_period_Rev
                objectTmp.value2 = res?.data?.Response?.Previous_period_Rev
                objectTmp.name = res?.data?.Response?.PreviousDaysOfTheWeek
                objectTmp.loader = false
                objectTmp.statement = res?.data?.Response?.statement
                setCompWeek(objectTmp)
            }  else {
                setCompWeek(objectTmp)

            }   
        } else {
            setWeekData({
                name: res.data.Response.DaysOfTheWeek,
                value: res.data.Response.Revenue,
                statement: res.data.Response.statement,
                loader: false
            })
       }

    }

    const highestRevenueOfQuarterSeries = [{ name: 'Revenue', data: quarterData.value}]

    const revenueAverageGrowthData = {
        series: graphRecord.data,
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: graphRecord.name,
          },
          yaxis: {
            title: {
              text: 'Revenue'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return  val
              }
            }
          }
        }
      };


      const revenueAverageGrowthDataBySource = {
        series: graphRecordForSource.data,
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: graphRecordForSource.name,
          },
          yaxis: {
            title: {
              text: 'Revenue'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return  val
              }
            }
          }
        }
      };

      const revenueAverageGrowthDataByCategory = {
        series: graphRecordForCategory.data,
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: graphRecordForCategory.name,
          },
          yaxis: {
            title: {
              text: 'Revenue'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return  val
              }
            }
          }
        }
      };

    const highestRevenueOfweekSeries = [{ name: 'Revenue', data: weekData.value}]

    const highestRevenueOfWeekOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: weekData.name,
        },
    }

    const highestRevenueOfQuarterOpions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: quarterData.name,
        },
        yaxis: {
            title: {
                text: 'Revenue',
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return 'Revenue'
                },
            },
        },
    }

    const highestRevenueOfMonthOptions = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: [1, 1, 4],
        },
        title: {
            text: '',
            align: 'left',
            offsetX: 110,
        },
        xaxis: {
            categories: highestMonthTransactions.name,
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
                    text: 'Transaction',
                    style: {
                        color: '#008FFB',
                    },
                },
                tooltip: {
                    enabled: true,
                },
            },
            {
                seriesName: 'Revenue',
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
                    text: 'Revenue',
                    style: {
                        color: '#00E396',
                    },
                },
            },
        ],
        tooltip: {
            fixed: {
                enabled: true,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60,
            },
        },
        legend: {
            horizontalAlign: 'left',
            offsetX: 40,
        },
    }

    const highestRevenueOfMonthSeries = [
        {
            name: 'Transaction',
            type: 'line',
            data: highestMonthTransactions.value.t,
        },
        {
            name: 'Revenue',
            type: 'column',
            data: highestMonthTransactions.value.r,
        },
    ]

    const sourceArrayYear = [
      {
          label: 'Google Analytics',
          value: 'ga',
      },
      {
          label: 'Facebook',
          value: 'facebook',
      },
      {
          label: 'Google Ads',
          value: 'google',
      },
      {
          label: 'Shopify',
          value: 'shopify',
      },
  ]


    const sourceArrayMonth = [
        {
            label: 'Google Analytics',
            value: 'ga',
        },
        {
            label: 'Facebook',
            value: 'facebook',
        },
        {
            label: 'Google Ads',
            value: 'google',
        },
        {
            label: 'Shopify',
            value: 'shopify',
        },
    ]

    const sourceArrayMonthForProduct = [
        {
            label: 'Google Analytics',
            value: 'ga',
        },
        {
            label: 'Shopify',
            value: 'shopify',
        },
    ]

    const sourceArrayWeek = [
        {
            label: 'Google Analytics',
            value: 'ga',
        },
        {
            label: 'Facebook',
            value: 'facebook',
        },
        {
            label: 'Google Ads',
            value: 'google',
        },
        {
            label: 'Shopify',
            value: 'shopify',
        },
    ]

    const sourceArrayQuarter = [
        {
            label: 'Google Analytics',
            value: 'ga',
        },
        {
            label: 'Facebook',
            value: 'facebook',
        },
        {
            label: 'Google Ads',
            value: 'google',
        },
        {
            label: 'Shopify',
            value: 'shopify',
        },
    ]

    const compWeekData = {
        series:[{
            name: 'Current Year',
            data: compWeek.value1
        },{
            name: 'Previous Year',
            data: compWeek.value2
        }],
        options: {
          chart: {
            type: 'bar',
            height: 430
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                position: 'top',
              },
            }
          },
          dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
              fontSize: '12px',
              colors: ['#fff']
            }
          },
          stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
          },
          tooltip: {
            shared: true,
            intersect: false
          },
          xaxis: {
            categories: compWeek.name,
          },
        }
    }

    return (
        <>
            <Row style={{ margin: '15px', rowGap: '40px' }}>
                <Col span={ myState.comparision == 'True' ? 24 : 24}>
                <Segmented
                  options={sourceArrayYear}
                  value={month}
                  onChange={setMonth}
                />
                            <br />
                    <Skeleton active loading={highestMonthTransactions.loader}>
                        <Card
                            title="Highest Revenue Of The Month"
                            bordered={false}
                            style={{ width: '100%' }}
                        >
                          
                           { myState.comparision == 'True' ?
                                <Table
                                bordered
                                size="small"
                                columns={
                                    setHighestMonthTransactionsColmun
                                }
                                scroll={{
                                x: 1300,
                                }}
                            
                                dataSource={
                                    highestMonthTransactions.name
                                }
                            />
                                :
                                <Chart
                                options={highestRevenueOfMonthOptions}
                                series={highestRevenueOfMonthSeries}
                                height={400}
                                type="line"
                                />
                           }

                        </Card>
                    </Skeleton>
                </Col>

                <Col span={12} className="pl-15">
                <Segmented
                        options={sourceArrayQuarter}
                        value={totalRevenue}
                        onChange={setTotalRevenue}
                    />

                    <Skeleton active loading={growthComparison.loader}>
                            <Card
                                title="Revenue Comparison"
                                bordered={false}
                                style={{ width: '100%' }}
                            >
                               
                                <Card
                                    title="Current Year"
                                    bordered={false}
                                    style={{ width: '100%' }}
                                >
                                    <p>
                                        Transactions:
                                        <CountUp
                                            start={0}
                                            end={growthComparison.data.transactions}
                                            duration={1.5}
                                            decimal=","
                                        />
                                    </p>
                                    <p>
                                        Revenue:
                                        <CountUp
                                            start={0}
                                            end={growthComparison.data.revenue}

                                            duration={1.5}
                                            decimal=","
                                        />
                                    </p>
                                </Card>
                                { myState.comparision == 'True' ?
                                <Card
                                    title="Previous Year"
                                    bordered={false}
                                    style={{ width: '100%' }}
                                >
                                    <p>
                                        Transactions:
                                        <CountUp
                                            start={0}
                                            end={ growthComparison.data.Previous_tran}
                                            duration={1.5}
                                            decimal=","
                                        />
                                    </p>

                                    <p>
                                        Revenue:
                                        <CountUp
                                            start={0}
                                            end={growthComparison.data.Previous_rev                                            }
                                            duration={1.5}
                                            decimal=","
                                        />
                                    </p>
                                  
                                    
                                </Card>
                                : ''}
                                  <p className="fs-12">
                                        {growthComparison.statement}
                                    </p>
                            </Card>
                    </Skeleton>
                </Col>

                { myState.comparision !== 'True'
                ? 
                <Col span={12} className="pl-15">
                    <Skeleton loading={quarterData.loader} active>
                    <Segmented
                        options={sourceArrayQuarter}
                        value={quarter}
                        onChange={setQuarter}
                    />
                  
                        <Card
                        title="Quarterwise Revenue Contribution"
                        bordered={false}
                        style={{ width: '100%' }}
                        >
                        <Chart
                        options={highestRevenueOfQuarterOpions}
                        series={highestRevenueOfQuarterSeries}
                        type="bar"
                        height={350}
                        />
                            <p> {quarterData.statement} </p>
                        </Card>
                    </Skeleton>
                </Col>
                :
                ''
             }
            <Col span={12} className="pl-15">
                <Skeleton active loading={weekData.loader}>
                    <Card
                    title="Highest revenue contributing day of the week"
                    bordered={false}
                    style={{ width: '100%' }}
                    >
                    <Segmented
                        options={sourceArrayWeek}
                        value={week}
                        onChange={setWeek}
                    />
                    { myState.comparision === 'True' ?
                        (CdiffDays > 7 && PdiffDays > 7) ? 
                        <Chart options={compWeekData.options} series={compWeekData.series} type="bar" height={430} />
                        :   <div className='pt-20'> <Alert message="Please select At least 7 days" type="warning" /></div>
                        
                        :
                        <Chart
                        options={highestRevenueOfWeekOptions}
                        series={highestRevenueOfweekSeries}
                        type="bar"
                        height={350}
                        />
                    }
                    {/* <p> {weekData.statement} </p> */}
                    </Card>
                </Skeleton>
            </Col>

            <Col span={12} className="pl-15">

            <Segmented
                  options={[...sourceArrayYear]}
                  value={revenueForContribution}
                  onChange={setTotalRevenueForContribution}
                />


              <Card
              title="Highest revenue contributing 30-30 vs 60-60 vs 90-90"
              bordered={false}
              style={{ width: '100%' }}
              >
              {
                !qtrData.loader ? 
                <>
                  <Chart options={graphqData.options} series={graphqData.series} type="bar" height={350} />
                  <p> {qtrData.statement} </p>
                </>
                :  <Result title="No data present between the given date ranges" />
              }
              </Card>
            </Col>

            <Col span={24} className="pl-15">
                { error === 'false' ? 
                <>
                <h3 className='center'> Revenue Product Wise Growth Check 30-30 vs 60-60 vs 90-90 vs Yearly </h3>
                <Chart options={revenueAverageGrowthData.options} series={revenueAverageGrowthData.series} type="bar" height={350} />
                <p className='center'> <b>  {graphRecord.statement} </b> </p>
                </>
                  : ''}
            </Col>

            <Col span={24} className="pl-15">
                { errorProduct === 'false' ? 
                <>
                <h3 className='center'> Revenue Source Wise Growth Check 30-30 vs 60-60 vs 90-90 vs Yearly</h3>
                <Chart options={revenueAverageGrowthDataBySource.options} series={revenueAverageGrowthDataBySource.series} type="bar" height={350} />
                <p className='center'> <b> {graphRecordForSource.statement} </b> </p>
                </>
                : ''}
            </Col>
            <Col span={24} className="pl-15">
                { errorCategory === 'false' ? 
                <>
                <h3 className='center'> Product Category Wise Growth Check 30-30 vs 60-60 vs 90-90 vs Yearly</h3>
                <Chart options={revenueAverageGrowthDataByCategory.options} series={revenueAverageGrowthDataByCategory.series} type="bar" height={350} />
                <p className='center'> <b>{graphRecordForCategory.statement}</b>  </p>
                </>
                : ''}
            </Col>
            </Row>
        </>
    )
            }
export default RevenueTrends


