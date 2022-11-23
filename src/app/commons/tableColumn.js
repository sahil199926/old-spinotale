
import { Button, Popover, Tag, Table } from 'antd';
import { EyeTwoTone } from '@ant-design/icons';

export const revenueRelatedMetricsCampAdexpColmun = [
  {
    title: 'Ad Group Name',
    dataIndex: 'adgroupname',
  },
  {
    title: 'Ad Type',
    dataIndex: 'adtype',
  },
  {
    title: 'Audience',
    dataIndex: 'audience',
  },
  {
    title: 'Campaign Name',
    dataIndex: 'campaignname',
  },
  {
    title: 'Landing Page',
    dataIndex: 'landingpage',
    render: (text, record) => (
      <p onClick={() =>{ window.open(text, '_blank', 'noopener,noreferrer')} } style={{target:"_blank", cursor: 'pointer', color: 'blue'}}> {text} </p>
    )
  } 
]

export const metricsArray =[
{
    key: 'Cost',
    value: 'cost',
  },
  {
    key: 'Impressions',
    value: 'impressions',
  },{
    key: 'Clicks',
    value: 'clicks',
  },{
    key: 'CTR',
    value: 'CTR',
  },{
    key: 'AOV',
    value: 'AOV',
  },
  {
    key: 'CPA',
    value: 'CPA',
  },
  {
    key: 'ROAS',
    value: 'ROAS',
  },
  {
    key: 'CPM',
    value: 'CPM',
  },
  {
    key: 'Revenue',
    value: 'revenue',
  },
  {
    key: 'Conversion Rate',
    value: 'conversionRate',
  }
];

export const columnRevenueRelatedMetricsAdsetAdFunnelcal = [
  {
      title: 'Ad Group Name',
      dataIndex: 'adgroupname',
      with: 200
  },
  {
      title: 'Ad Type',
      dataIndex: 'adtype',
  },
  {
      title: 'Landing Page',
      dataIndex: 'landingpage',
      render: (text, record) => (
        <p onClick={() =>{ window.open(text, '_blank', 'noopener,noreferrer')} } style={{target:"_blank", cursor: 'pointer', color: 'blue'}}> {text} </p>
      )  
  },
  {
      title: 'Audience',
      dataIndex: 'audience',
  },
  {
      title: 'Cost',
      dataIndex: 'cost',
  },
  {
      title: 'Impressions',
      dataIndex: 'impressions',
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

export const revenueRelatedMetricssplitColumn =[
  {
      title: 'Ad Group Contribution',
      dataIndex: 'adgroup_contribution',
    },
    {
      title: 'Ad Group Revenue',
      dataIndex: 'adgroup_revenue',
    },{
      title: 'Ad Group Name',
      dataIndex: 'adgroupname',
    },{
      title: 'Ad Group Status',
      dataIndex: 'adgroupstatus',
    },{
      title: 'Campaign Name',
      dataIndex: 'campaignname',
    },
    {
      title: 'Campaign Name Contribution',
      dataIndex: 'campaignname_contribution',
    },
    {
      title: 'Campaign Name Revenue',
      dataIndex: 'campaignname_revenue',
    },
    {
      title: 'Total Revenue',
      dataIndex: 'total_revenue',
    },
    {
      title: 'Statement',
      dataIndex: 'statement',
      render: (text, record) => (
      <>
        <Popover content={text} title="Statement">
          <p style={{target:"_blank", cursor: 'pointer', color: 'blue'}}> <EyeTwoTone /> </p>
        </Popover>
      </>
      )  
    },

];

export const columnRevenueRelatedMetricsAdsetColumn = [
  {
    title: 'Campaign Name',
    dataIndex: 'campaignname',
    with: 200
  },
  {
    title: 'Ad Type',
    dataIndex: 'adtype',
  },
  {
    title: 'Landing Page',
    dataIndex: 'landingpage',
    render: (text, record) => (
      <p onClick={() =>{ window.open(text, '_blank', 'noopener,noreferrer')} } style={{target:"_blank", cursor: 'pointer', color: 'blue'}}> {text} </p>
    )
  },
  {
    title: 'Audience',
    dataIndex: 'audience',
  },
  {
    title: 'ROAS',
    children: [
      {
        title: 'Prev',
        dataIndex: 'PreviousROAS',
        key: 'PreviousROAS',
        width: 150,
      }, {
        title: 'Curr',
        dataIndex: 'CurrentROAS',
        key: 'CurrentROAS',
        width: 150,
      }
    ]
  },
  {
    title: 'Impressions',
    children: [
      {
        title: 'Prev',
        dataIndex: 'PreviousImpressions',
        key: 'PreviousImpressions',
        width: 150,
      }, {
        title: 'Curr',
        dataIndex: 'CurrentImpressions',
        key: 'CurrentImpressions',
        width: 150,
      }
    ]
  },
  {
    title: 'COST',
    children: [
      {
        title: 'Prev',
        dataIndex: 'PreviousCost',
        key: 'PreviousCost',
        width: 150,
      }, {
        title: 'Curr',
        dataIndex: 'CurrentCost',
        key: 'CurrentCost',
        width: 150,
      }
    ]
  },
  {
    title: 'Conversion',
    children: [
      {
        title: 'Prev',
        dataIndex: 'PreviousConversion',
        key: 'PreviousConversion',
        width: 150,
      }, {
        title: 'Curr',
        dataIndex: 'CurrentConversion',
        key: 'CurrentConversion',
        width: 150,
      }
    ]
  },
  {
    title: 'ROAS',
    children: [
      {
        title: 'Prev',
        dataIndex: 'PreviousClicks',
        key: 'PreviousClicks',
        width: 150,
      }, {
        title: 'Curr',
        dataIndex: 'CurrentClicks',
        key: 'CurrentClicks',
        width: 150,
      }
    ]
  },
  {
    title: 'CPA',
    children: [
      {
        title: 'Prev',
        dataIndex: 'PreviousCPA',
        key: 'PreviousCPA',
        width: 150,
      }, {
        title: 'Curr',
        dataIndex: 'CurrentCPA',
        key: 'CurrentCPA',
        width: 150,
      }
    ]
  },
  {
    title: 'AOV',
    children: [
      {
        title: 'Prev',
        dataIndex: 'PreviousAOV',
        key: 'PreviousAOV',
        width: 150,
      }, {
        title: 'Curr',
        dataIndex: 'CurrentAOV',
        key: 'Curr',
        width: 150,
      }
    ]
  }
]

export const setHighestMonthTransactionsColmun = [
  {
    title: 'Date',
    children: [
      {
        title: 'Current',
        dataIndex: 'CurrentMonths',
        key: 'CurrentMonths',
        width: 5,
        fixed: 'left',
      }, 
      {
        title: 'Previous',
        dataIndex: 'PreviousMonths',
        key: 'PreviousMonths',
        width: 5,
        fixed: 'left',

      }
    ]
  },

  {
    title: 'Revenue',
    children: [
      {
        title: 'Current',
        dataIndex: 'Current_period_Rev',
        key: 'Current_period_Rev',
        width: 5,
      }, {
        title: 'Previous',
        dataIndex: 'Previous_period_Rev',
        key: 'Previous_period_Rev',
        width: 5,
      }
    ]
  },
  {
    title: 'Transaction',
    children: [
      {
        title: 'Current',
        dataIndex: 'Current_period_Tran',
        key: 'Current_period_Tran',
        width: 5,
      }, {
        title: 'Previous',
        dataIndex: 'Previous_period_Tran',
        key: 'Previous_period_Tran',
        width: 5,
      }
    ]
  }
]

export const bestCohortColumn = [
  {
    title: 'User Type',
    dataIndex: 'usertype',
    width: 160,
    render: (_, record, dataIndex) => (
      <p style={{color: `hsl(105, 100%, ${17-dataIndex}%)`}}> <b> {_} </b></p>
    ),
  },

  {
    title: 'Gender',
    dataIndex: 'usergender',
      render: (_, record, dataIndex) => (
        <p style={{color: `hsl(105, 100%, ${17-dataIndex}%)`}}> <b> {_} </b></p>
    ),
  },
  {
    title: 'Device Category',
    dataIndex: 'devicecategory',
      render: (_, record, dataIndex) => (
        <p style={{color: `hsl(105, 100%, ${17-dataIndex}%)`}}> <b> {_} </b></p>
    ),
  },
  {
    title: 'Region',
    dataIndex: 'region',
      render: (_, record, dataIndex) => (
        <p style={{color: `hsl(105, 100%, ${17-dataIndex}%)`}}> <b> {_} </b></p>
    ),
  },
  {
    title: 'City',
    dataIndex: 'city',
      render: (_, record, dataIndex) => (
      <p style={{color: `hsl(105, 100%, ${17-dataIndex}%)`}}> <b> {_} </b></p>
    ),
  },
  {
    title: 'User Age Bracket',
    dataIndex: 'useragebracket',
      render: (_, record, dataIndex) => (
        <p style={{color: `hsl(105, 100%, ${17-dataIndex}%)`}}> <b> {_} </b></p>
    ),
  },
  {
    title: 'Revenue',
    dataIndex: 'transactionrevenue',
      render: (_, record, dataIndex) => (
        <p style={{color: `hsl(105, 100%, ${17-dataIndex}%)`}}> <b> {_} </b></p>
    ),
  },
  {
    title: 'Transactions',
    dataIndex: 'transactions',
      render: (_, record, dataIndex) => (
        <p style={{color: `hsl(105, 100%, ${17-dataIndex}%)`}}> <b> {_} </b></p>
    ),
  },
  {
    title: 'Traffic',
    dataIndex: 'sessions',
      render: (_, record, dataIndex) => (
        <p style={{color: `hsl(105, 100%, ${17-dataIndex}%)`}}> <b> {_} </b></p>
    ),
  },

]

export const productMediumsplitCol = [
  {
    title: 'Product Name',
    dataIndex: 'product_name',
    with: 200,
    key: 'product_name'
  },
  {
    title: 'Product Contribution(%)',
    dataIndex: 'product_contribution',
    with: 200,
    key: 'product_contribution',
    render: (_, record, dataIndex) => (
      <p>{_}%</p>
    ),
  },
  {
    title: 'Product Revenue',
    dataIndex: 'product_revenue',
    with: 200,
    key: 'product_revenue'
  },
];

export const sourceandmediumsplitCol = [
  {
    title: 'Medium',
    dataIndex: 'medium',
    with: 200,
    key: 'medium'
  },
  {
    title: 'Medium Contribution(%)',
    dataIndex: 'medium_contribution',
    with: 200,
    key: 'medium_contribution',
    render: (_, record, dataIndex) => (
      <p> {_}% </p>
    ),
  },
  {
    title: 'Medium Revenue',
    dataIndex: 'medium_revenue',
    with: 200,
    key: 'medium_revenue'
  }
]

export const productMediumsplitColInner = [
  {
    title: 'Source',
    dataIndex: 'source',
    with: 200,
    key: 'source'
  },
  {
    title: 'Revenue',
    dataIndex: 'source_revenue',
    with: 200,
    key: 'source_revenue'
  },
  {
    title: 'Contribution(%)',
    dataIndex: 'source_contribution',
    with: 200,
    key: 'source_contribution',
    render: (_, record, dataIndex) => (
      <p> {_}% </p>
    ),
  },
  {
    title: 'Total Revenue',
    dataIndex: 'total_revenue',
    with: 200,
    key: 'total_revenue'
  }
]

export const SourceMediumsplitColInner = [
  {
    title: 'Product Category',
    dataIndex: 'product_category',
    with: 200,
    key: 'product_category'
  },
  {
    title: 'Revenue',
    dataIndex: 'product_category_revenue',
    with: 200,
    key:  'product_category_revenue',
  },
  {
    title: 'Contribution(%)',
    dataIndex: 'product_category_contribution',
    with: 200,
    key:  'product_category_contribution',
    render: (_, record, dataIndex) => (
      <p> {_}% </p>
    ),
  },
  {
    title: 'Total Revenue',
    dataIndex: 'total_revenue',
    with: 200,
    key: 'total_revenue'
  }
]


export const moreFilter =[
  {
      key: 'User Gender',
      value: 'usergender',
    },
    {
      key: 'Device Category',
      value: 'devicecategory',
    },
    {
      key: 'Region',
      value: 'region',
    },
    {
      key: 'User Age Bracket',
      value: 'useragebracket',
    },
  ];



  export const DataFilterArr =[
    {
        key: 'campaign_created_time',
        value: 'campaign_created_time',
      },
    
      {
        key: 'campaign_start_time',
        value: 'campaign_start_time',
      },
      {
        key: 'campaign_stop_time',
        value: 'campaign_stop_time',
      },
      {
        key: 'campaign_updated_time',
        value: 'campaign_updated_time',
      },
      {
        key: 'ad_set_created_time',
        value: 'ad_set_created_time',
      },
      {
        key: 'ad_set_start_time',
        value: 'ad_set_start_time',
      },
      {
        key: 'ad_set_end_time',
        value: 'ad_set_end_time',
      },
      {
        key: 'ad_set_updated_time',
        value: 'ad_set_updated_time',
      },

      {
        key: 'ad_created_time',
        value: 'ad_created_time',
      },
      {
        key: 'ad_updated_time',
        value: 'ad_updated_time',
      },
      
    ];