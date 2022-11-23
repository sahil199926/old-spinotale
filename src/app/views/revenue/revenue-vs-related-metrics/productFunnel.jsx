import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import {
    revenueVsRelatedMetrics,
    revenueCorrVsRelatedMatrix,
    revenueBuyingFunnel,
    revenueTopCampaigns,
    revenueRelatedMetricsCampAdexp,
    revenueRelatedMetricsAdsetAdFunnelcal,
    revenueRelatedMetricsCampAdsplit,
    revenueRelatedMetricsAdsetPosNegMatrics,
    revenueMothWiseFunnelCalculationPaid,
    revenueRelatedMetricsMontlyOutliers,
} from '../../../api/revenue'
import { Row, Col, Card, Segmented, Skeleton, Table, Affix, Button, Spin, Result, Popover } from 'antd'

import { 
    revenueRelatedMetricsCampAdexpColmun,
    columnRevenueRelatedMetricsAdsetAdFunnelcal,
    columnRevenueRelatedMetricsAdsetColumn,
    revenueRelatedMetricssplitColumn
} from '../../../commons/tableColumn'

import '../revenue-vs-related-metrics/revenueVsRelatedMatrics.css'
import { useSelector } from 'react-redux'

function RevenueBehavorial() {
    const myState = useSelector((state) => state.filter)
    console.log("🚀 ~ file: productFunnel.jsx ~ line 29 ~ RevenueBehavorial ~ myState", myState)
    const currEndDate = myState.currStartEndDate.endDate
    const currStartDate = myState.currStartEndDate.startDate
    const preEndDate = myState.preStartEndDate.endDate
    const preStartDate = myState.preStartEndDate.startDate
    const comparisionFlag = myState.comparision

    const queryObj = {
        current_start: currEndDate,
        current_end: currStartDate,
        previous_end: preStartDate,
        previous_start: preEndDate,
        Comparision:comparisionFlag.toString().charAt(0).toUpperCase()+comparisionFlag.toString().slice(1),
    }

    const [revenueVsReletedMetricsData, setRevenueVsReletedMetricsData] = useState()
    const [ revenueVsReletedMetricsDataPrev, setRevenueVsReletedMetricsDataPrev] = useState()
    const [ getDataRevenueCorrVsRelatedMatrix, setGetRevenueCorrVsRelatedMatrix] = useState()
    const [corrRelatedLoader, setCorrRelatedLoader] = useState(true)
    const [revenueCorrVsRelatedMatrixData, setRevenueCorrVsRelatedMatrix] = useState({ name: [], value: [], statement: '' });

    const [funnelData, setFunnelData] = useState({
        CartAbandonment: [],
        quantityaddedtocart: [],
        sessions: [],
        transactions: [],
        yearMonth: [],
    })
    const [funnelLoading, setFunnelLoading] = useState(true);
    const [revenueTopCampaignsData, setRevenueTopCampaigns] = useState({
        name: '',
        value: '',
        statement: '',
        loader: true
    })

    const [loading, setLoading] = useState(true)

    const [
        revenueRelatedMetricsCampAdexpData,
        setRevenueRelatedMetricsCampAdexp,
    ] = useState()
    const [
        revenueRelatedMetricsAdsetAdFunnelcalData,
        setRevenueRelatedMetricsAdsetAdFunnelcal,
    ] = useState()
    const [addSetLoader, setaddSetLoader] = useState(true)
    const [
        revenueRelatedMetricsCampAdsplitData,
        setRevenueRelatedMetricsCampAdsplit,
    ] = useState([])
    const [
        revenueRelatedMetricsAdsetPosNegMatricsData,
        setRevenueRelatedMetricsAdsetPosNegMatrics,
    ] = useState()
    const [
        revenueRelatedMetricsAdsetPosNegMatricsStatement,
        setRevenueRelatedMetricsAdsetPosNegMatricsStatement,
    ] = useState()
    const [sourceName, setSourceName] = useState('google')

    const [
        dataRevenueMothWiseFunnelCalculationPaid,
        setRevenueMothWiseFunnelCalculationPaid,
    ] = useState()
    const [funnelPaidLoader, setFunnelPaidLoader] = useState(true)
    
    

    const [outliersData, setOutliers] = useState({ data: [], loader: true });
    const [outliersTable, setOutliersTable] = useState();
    const [dataExist, setDataExist] = useState(true);

    
    useEffect(() => {
        setLoading(true)
        getRevenueVsRelatedMetrics(queryObj);
        getRevenueCorrVsRelatedMatrix(queryObj);
        getRevenueRelatedMetricsMontlyOutliers(queryObj);
        getRevenueMothWiseFunnelCalculationPaid(queryObj)
        getRevenueBuyingFunnel(queryObj)
        getRevenueTopCampaigns(queryObj)
        getRevenueRelatedMetricsCampAdexp(queryObj)
        getRevenueRelatedMetricsAdsetAdFunnelcal(queryObj)
        getRevenueRelatedMetricsCampAdsplit(queryObj)
        if (myState.comparision === 'True') {
            getRevenueRelatedMetricsAdsetPosNegMatrics(queryObj)
        }
    }, [sourceName, myState])

    const getRevenueMothWiseFunnelCalculationPaid = async (queryObj) => {
        queryObj.source = sourceName
        const res = await revenueMothWiseFunnelCalculationPaid(queryObj);
        if (!res.data.Status) {
            setDataExist(false);
            return
        }
        setRevenueMothWiseFunnelCalculationPaid(res.data.Response)
        setFunnelPaidLoader(false)
    }

    const getRevenueRelatedMetricsMontlyOutliers = async (objQuery) => {
        objQuery.source = sourceName;
        const res = await revenueRelatedMetricsMontlyOutliers(objQuery)
        if (!res.data.Status) {
            setDataExist(false);
            return
        }
        setOutliers({data: res.data.Response.statement, loader: false})
        setOutliersTable(res.data.Response.Data.reverse())
    }

    const columnOutliers = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text, record) => (
                <div style={{ wordWrap: 'break-word', width: '110px', wordBreak: 'break-word' }}>
                  {text}
                </div>
              ),
        },
        {
            title: 'Spend',
            dataIndex: 'cost',
        },
        {
            title: 'Impressions',
            dataIndex: 'impressions',
        },
        {
            title: 'Traffic',
            dataIndex: 'clicks',
        },
        {
            title: 'Conversion Rate',
            dataIndex: 'conversion',
        },
        {
            title: 'Transaction',
            dataIndex: 'allconv',
        },
        {
            title: 'AOV',
            dataIndex: 'AOV',
        },
        {
            title: 'CPA',
            dataIndex: 'CPA',
        },
        {
            title: 'ROAS',
            dataIndex: 'ROAS',
        },
    ]

    
    const columnRevenueMothWiseFunnelCalculationPaid = [
        {
            title: 'Month',
            dataIndex: 'date',
        },
        {
            title: 'Conversion',
            dataIndex: 'conversion',
        },
        {
            title: 'ROAS',
            dataIndex: 'ROAS',
        },
        {
            title: 'CPA',
            dataIndex: 'CPA',
        },
        {
            title: 'AOV',
            dataIndex: 'AOV',
        },
    ]

    const getRevenueRelatedMetricsCampAdexp = async (obj) => {
        obj.source = sourceName
        const res = await revenueRelatedMetricsCampAdexp(obj);
        if (!res.data.Status) {
            setDataExist(false);
            return
        }
        setRevenueRelatedMetricsCampAdexp(res.data.Response)
    }
    const getRevenueRelatedMetricsAdsetAdFunnelcal = async (obj) => {
        obj.source = sourceName 
        const res = await revenueRelatedMetricsAdsetAdFunnelcal(obj)
        if (!res.data.Status) {
            setDataExist(false);
            return
        }
        if (myState.comparision == 'True') { 
            setaddSetLoader(false)
            setRevenueRelatedMetricsAdsetAdFunnelcal(res.data.Response)
        } else {
            setRevenueRelatedMetricsAdsetAdFunnelcal(res.data.Response)
            setaddSetLoader(false)
        }
    }
    const getRevenueRelatedMetricsCampAdsplit = async (obj) => {
        obj.source = sourceName
        const res = await revenueRelatedMetricsCampAdsplit(obj)
        if (myState.comparision == 'True') { 
            // 
        } else {
            setRevenueRelatedMetricsCampAdsplit(res.data.Response)
        }
    }
    const getRevenueRelatedMetricsAdsetPosNegMatrics = async (q) => {
        q.source = 'google'
        const res = await revenueRelatedMetricsAdsetPosNegMatrics(q)
        console.log("🚀 ~ file: productFunnel.jsx ~ line 360 ~ getRevenueRelatedMetricsAdsetPosNegMatrics ~ res", res)
        setRevenueRelatedMetricsAdsetPosNegMatrics(res.data.data.data)
        setRevenueRelatedMetricsAdsetPosNegMatricsStatement(
            res.data.data.statement
        )
    }
    

    const getRevenueVsRelatedMetrics = async (queryObj) => {
        queryObj.source = sourceName
        const res = await revenueVsRelatedMetrics(queryObj);
        if (!res.data.Status) {
            setDataExist(false);
            return
        }
        if (myState.comparision == 'True') {
            if (res?.data?.Status === "Can't be compared due to insufficient data") {
                setRevenueVsReletedMetricsDataPrev(res?.data?.Status);
            } else {
                const val = Object.values(res.data.Response);
                const key = Object.keys(res.data.Response);
                let tmpObj = [];
                for (let i = 0;  i < val.length; i++) {
                    tmpObj.push(Object.assign({indexName: key[i]}, val[i]))
                }
                setRevenueVsReletedMetricsDataPrev(tmpObj)
            }
        } else {
            setRevenueVsReletedMetricsData(Object.values(res.data.Response))
        }
        // setRevenueVsReletedMetricsDataForYEar(
        //   res.data.data.yearRelatedMetrics.data
        // )
    }

    const getRevenueCorrVsRelatedMatrix = async (queryObj) => {
        queryObj.source = sourceName 
        const res = await revenueCorrVsRelatedMatrix(queryObj);
        if (!res.data.Status) {
            setDataExist(false);
            return
        }
        if (myState.comparision == 'True') { 
            setGetRevenueCorrVsRelatedMatrix(res.data.Response)
        } else {
            let x = res.data.Response
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
            const newObj = {
                name: [],
                value: [],
            }
            newObj.name = res.data.Response.index
            newObj.value.push({name: 'Revenue', data: [...res.data.Response.allconvvalue]})
            setRevenueCorrVsRelatedMatrix(newObj)
            setGetRevenueCorrVsRelatedMatrix(tmpArr)
        }
        setCorrRelatedLoader(false)
    }
    
    const openCal = () => {
        document.getElementsByClassName('MuiButtonBase-root MuiFab-root MuiFab-circular MuiFab-sizeLarge MuiFab-primary css-18bde3d-MuiButtonBase-root-MuiFab-root')[0].click();
    }

    const getRevenueTopCampaigns = async (queryObj) => {
        queryObj.source = sourceName 
        const res = await revenueTopCampaigns(queryObj);
        if (!res.data.Status) {
            setDataExist(false);
            return
        }

        const newObj = {
            name: [],
            value: [],
            statement: res.data.Response.statement,
            loader: false
        }
        if (myState.comparision == 'True') { 
            newObj.value.push(
                { name: 'Current Revenue', data: res.data.Response.current_revenue},
                { name: 'Previous Revenue', data: res.data.Response.previous_revenue},
            )
        }else {
            newObj.value.push({ name: 'Revenue', data: res.data.Response.allconvvalue})
        }
        newObj.name = res.data.Response.campaignname
        setRevenueTopCampaigns(newObj);
    }

    const getRevenueBuyingFunnel = async (queryObj) => {
        let myObj = {
            CartAbandonment: [],
            quantityaddedtocart: [],
            sessions: [],
            transactions: [],
            yearMonth: [],
        }
        const res = await revenueBuyingFunnel(queryObj);
        console.log("🚀 ~ file: productFunnel.jsx ~ line 351 ~ getRevenueBuyingFunnel ~ res", res)
        if (!res.data.Status) {
            setDataExist(false);
            return
        }
        myObj.CartAbandonment = res.data.Response.CartAbandonment
        myObj.quantityaddedtocart = res.data.Response.quantityaddedtocart 
        myObj.sessions = res.data.Response.sessions
        myObj.transactions = res.data.Response.transactions
        myObj.yearMonth = res.data.Response.yearMonth
        setFunnelData(myObj)
        setFunnelLoading(false)
    }

    const columnsForMonth = [
        {
            title: 'Month',
            dataIndex: 'yearMonth',
        },
        {
            title: 'AOV',
            dataIndex: 'AOV',
        },
        {
            title: 'CPA',
            dataIndex: 'CPA',
        },
        {
            title: 'ROAS',
            dataIndex: 'ROAS',
        },
        {
            title: 'Conversions',
            dataIndex: 'allconv',
        },
        {
            title: 'Revenue',
            dataIndex: 'allconvvalue',
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
        },
        {
            title: 'Conversion Rate',
            dataIndex: 'conversion',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
        },

        {
            title: 'Impressions',
            dataIndex: 'impressions',
        },
    ]

    const columnsForMonthCompare = [
        {
            title: 'Index',
            dataIndex: 'indexName',
        },
        {
            title: 'AOV',
            dataIndex: 'AOV',
            render: (text) =>{
                return <div className={Math.sign(text) === -1 ? 'center red' : Math.sign(text) === 0 ? 'center' : 'center green'}> {text.toFixed(2)} </div>
            }
        },
        {
            title: 'CPA',
            dataIndex: 'CPA',
            render: (text) =>{
                return <div className={Math.sign(text) === -1 ? 'center red' : Math.sign(text) === 0 ? 'center' : 'center green' }> {text.toFixed(2)} </div>
            }
        },
        {
            title: 'ROAS',
            dataIndex: 'ROAS',
            render: (text) =>{
                return <div className={Math.sign(text) === -1 ? 'center red' : Math.sign(text) === 0 ? 'center' : 'center green' }> {text.toFixed(2)} </div>
            }
        },
        {
            title: 'Conversions',
            dataIndex: 'allconv',
            render: (text) =>{
                return <div className={Math.sign(text) === -1 ? 'center red' : Math.sign(text) === 0 ? 'center' : 'center green' }> {text.toFixed(2)} </div>
            }
        },
        {
            title: 'Revenue',
            dataIndex: 'allconvvalue',
            render: (text) =>{
                return <div className={Math.sign(text) === -1 ? 'center red' : Math.sign(text) === 0 ? 'center' : 'center green' }> {text.toFixed(2)} </div>
            }
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            render: (text) =>{
                return <div className={Math.sign(text) === -1 ? 'center red' : Math.sign(text) === 0 ? 'center' : 'center green' }> {text.toFixed(2)} </div>
            }
        },
        {
            title: 'Conversion Rate',
            dataIndex: 'conversion',
            render: (text) =>{
                return <div className={Math.sign(text) === -1 ? 'center red' : Math.sign(text) === 0 ? 'center' : 'center green' }> {text.toFixed(2)} </div>
            }
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            render: (text) =>{
              return <div className={Math.sign(text) === -1 ? 'center red' : Math.sign(text) === 0 ? 'center' : 'center green' }> {text.toFixed(2)} </div>
            }
        },

        {
            title: 'Impressions',
            dataIndex: 'impressions',
            render: (text) =>{
                return <div className={Math.sign(text) === -1 ? 'center red' : Math.sign(text) === 0 ? 'center' : 'center green' }> {text.toFixed(2)} </div>
            }
  

        },
    ]
    
    const cloumForCorr = [
        {
            title: 'Related Matrics',
            dataIndex: 'index',
        },
        {
            title: 'Revenue',
            dataIndex: 'allconvvalue',
        },
        {
            title: 'Correlated',
            dataIndex: 'Correlated',
        },
    ]

    const coorEnries = revenueCorrVsRelatedMatrixData.value

    const corrOptions = {
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
            categories: revenueCorrVsRelatedMatrixData.name,
          },
        fill: {
            opacity: 1,
        },

        tooltip: {
            y: {
              formatter: function (val) {
                return val 
              }
            }
          }

    }

    const series = revenueTopCampaignsData.value
    const options = {
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
            categories: revenueTopCampaignsData.name,
        },
    }

    const seriesFunnel = [
        {
            name: 'Cart Abandonment',
            type: 'column',
            data: funnelData.CartAbandonment,
        },
        {
            name: 'Transactions',
            type: 'column',
            data: funnelData.transactions,
        },
        {
            name: 'Sessions',
            type: 'column',
            data: funnelData.sessions,
        },
    ]

    const optionsfunnel = {
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
            text: 'Buying Funnel',
            align: 'left',
            offsetX: 110,
        },
        xaxis: {
            categories: funnelData.yearMonth,
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
                    text: 'Cart Abandonment',
                    style: {
                        color: '#008FFB',
                    },
                },
                tooltip: {
                    enabled: true,
                },
            },
            {
                seriesName: 'Income',
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
                    text: 'Transactions',
                    style: {
                        color: '#00E396',
                    },
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
                    color: '#FEB019',
                },
                labels: {
                    style: {
                        colors: '#FEB019',
                    },
                },
                title: {
                    text: 'Sessions',
                    style: {
                        color: '#FEB019',
                    },
                },
            },
        ],
        tooltip: {
            fixed: {
                enabled: true,
                position: 'topLeft',
                offsetY: 30,
                offsetX: 60,
            },
        },
        legend: {
            horizontalAlign: 'left',
            offsetX: 40,
        },
    }

    const sourceArray = [
        {
            label: 'Google Ad',
            value: 'google',
        },
        {
            label: 'Facebook',
            value: 'facebook',
        },
    ]

    const cloumForCorrComp = [
        {
            title: 'index',
            dataIndex: 'index',
        },
        {
            title: 'Current Correlation With Revenue',
            dataIndex: 'currentCorrRev',
            render: (val) =>{
                if (val > -0.3 && val < 0.3){
                    return <div className=""> <b>{val}</b> </div>
                }
                if (val < -0.3){
                    return <div className="red"> <b>{val}</b> </div>
                }
                if (val > -0.3){
                    return <div className="green"> <b>{val}</b> </div>
                }

            }
        },
        {
            title: 'Previous Correlation With Revenue',
            dataIndex: 'previousCorrRev',
            render: (val) =>{
                if (val > -0.3 && val < 0.3){
                    return <div className=""> <b>{val}</b> </div>
                }
                if (val < -0.3){
                    return <div className="red"> <b>{val}</b> </div>
                }
                if (val > -0.3){
                    return <div className="green"> <b>{val}</b> </div>
                }

            }
        },
        {
            title: 'Value Change',
            dataIndex: 'valChange',
           
        },
        {
            title: 'Percentage Change(%)',
            dataIndex: 'perChange',
        },
    ]

    const dataForMonth = revenueVsReletedMetricsData
    const dataForCorr = getDataRevenueCorrVsRelatedMatrix
    const dateRevenueRelatedMetricsCampAdexp = revenueRelatedMetricsCampAdexpData
    const dateRevenueRelatedMetricsAdsetAdFunnelcal = revenueRelatedMetricsAdsetAdFunnelcalData


    return (

        <>
        { dataExist ? 
            <>
            <Row style={{ margin: '15px', rowGap: '40px' }}>
            <Col className="right">
                <Affix
                    offsetTop={120}
                    onChange={(affixed) => console.log(affixed)}
                >
                    <Segmented
                        options={sourceArray}
                        value={sourceName}
                        onChange={setSourceName}
                    />
                </Affix>
            </Col>

            <Col span={24} className="center">
                {myState.comparision == 'True' ? (
                    revenueVsReletedMetricsDataPrev == "Can't be compared due to insufficient data" ?
                    <div>
                        <h5 className="center"> Month wise Revenue vs Related Metrics </h5>
                        <p className='warning'>Can't be compared due to insufficient data</p>
                    </div>
                :
                <div style={{ overflowX: 'auto' }}>
                <Table
                    size="small"
                    columns={columnsForMonthCompare}
                    dataSource={revenueVsReletedMetricsDataPrev}
                />
            </div>                        
            ) : (
                <div>
                    <h5 className="center">
                        Month wise Revenue vs Related Metrics
                    </h5>
                    
                    <Table
                        size="small"
                        columns={columnsForMonth}
                        dataSource={dataForMonth}
                    />
                </div>
            )}
            <Skeleton loading={outliersData.loading} active>
                <h5> Month wise outliers </h5>
                <Table
                size="small"
                columns={columnOutliers}
                dataSource={outliersTable}
                />
                { outliersData && outliersData.data.map((e, i) => {
                    return <p> <b>{i + 1}.</b> {e} </p>
                })}
            </Skeleton>
            </Col>
            <Col span={24}>
                <h5 className='center'>Revenue Correlation Vs Correlation Matrix</h5>
            </Col>

            { myState.comparision !== 'True' ?
            <>
                <Col span={12}>
                <Card>
                    <Skeleton loading={corrRelatedLoader} active>
                    <Chart
                        options={corrOptions}
                        series={coorEnries}
                        type="bar"
                        height={430}
                    />

                    </Skeleton>
                </Card>
                </Col>
                <Col className='pl-15' span={12}>
                <Skeleton loading={corrRelatedLoader} active>
                    <Card>
                    <Table
                        size="small"
                        columns={cloumForCorr}
                        dataSource={dataForCorr}
                        rowClassName={(record) => record.Correlated === 'Negative' ? 'red'  : record.Correlated === 'Positive' ? 'green' : ''  }
                    />
                    </Card>
                </Skeleton>
                </Col>
            </>
        : '' }

                
        { myState.comparision === 'True' ?
        <Col className='pl-15' span={24}>
        <Skeleton loading={corrRelatedLoader} active>
            <Card>
                <Table
                size="small"
                columns={cloumForCorrComp}
                dataSource={dataForCorr}
                rowClassName={(record) => record.Correlated === 'Negative' ? 'red'  : record.Correlated === 'Positive' ? 'green' : ''  }
                />
            </Card>
            </Skeleton>
        </Col>
        : ''}
     
        <Col span={24}>
          <Skeleton loading={funnelPaidLoader} active>
            <h5 className="center">
              Month wise funnel calculation for paid
            </h5>
            <Table
              size="small"
              columns={columnRevenueMothWiseFunnelCalculationPaid}
              dataSource={
                dataRevenueMothWiseFunnelCalculationPaid
              }
            />
        </Skeleton>
        </Col>

        <Col span={24}>
          <Skeleton loading={funnelLoading} active>
            <Chart
              options={optionsfunnel}
              series={seriesFunnel}
              type="line"
              height={430}
            />
          </Skeleton>
        </Col>

        <Col span={24}>
          <Skeleton loading={revenueTopCampaignsData.loader} active>
            <p className="center">Revenue Top Campaigns</p>
            <Chart
              options={options}
              series={series}
              type="bar"
              height={430}
            />
          </Skeleton>
        </Col>
        <Col span={24}>
            <h5 className="center">Campagin Ad Explanation</h5>
            <Table
              size="small"
              columns={revenueRelatedMetricsCampAdexpColmun}
              dataSource={dateRevenueRelatedMetricsCampAdexp}
            />
            {!myState.comparision ? 
              <>
               <h5 className="center">Adset AdFunnel calculation</h5>
               <Skeleton loading={addSetLoader} active>
               <Table
                 size="small"
                 columns={
                   columnRevenueRelatedMetricsAdsetAdFunnelcal
                 }
                 scroll={{
                   x: 1300,
                 }}
             
                 dataSource={
                   dateRevenueRelatedMetricsAdsetAdFunnelcal
                 }
               />
               </Skeleton>
            </>
            :
            <>
                <h5 className="center">Adset AdFunnel calculation </h5>
                <Skeleton loading={addSetLoader} active>
                <Table
                    bordered
                    size="small"
                    columns={
                        columnRevenueRelatedMetricsAdsetColumn
                    }
                    scroll={{
                    x: 1300,
                    }}
                
                    dataSource={
                    dateRevenueRelatedMetricsAdsetAdFunnelcal
                    }
                />
                </Skeleton>
            </>
            }

        {myState.comparision !== 'True' ? 
        <>
            <h5 className="center">Adset that contributed most to revenue (within the campaign)</h5>
            <Table
                 size="small"
                 columns={
                    revenueRelatedMetricssplitColumn
                 }
                 scroll={{
                   x: 1600,
                 }}
                 dataSource={
                    revenueRelatedMetricsCampAdsplitData
                 }
               />
            </> 
            : '' }
        </Col>
          
        </Row>
        </>
        : 
        <Result
            status="403"
            title="403"
            subTitle="No data present between the given date ranges."
            extra={<Button type="primary" onClick={openCal}>Back Home</Button>}
        />
        }
        </>

    )
}

export default RevenueBehavorial
