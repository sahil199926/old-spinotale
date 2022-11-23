import request from '../utils/request'

export function highestRevenueOfMonth(data) {
  return request({
    url: '/revenueHighestMonth',
    method: 'post',
    data
  })
}

export function revenueGrowthComparison(data) {
  return request({
    url: '/revenueComparison',
    method: 'post',
    data
  })
}

export function highestRevenueOfTheQuarter(data) {
  return request({
    url: '/revenueHighestQuarter',
    method: 'post',
    data
  })
}

export function highestRevenueOfTheWeek(data) {
  return request({
    url: '/revenueHighestWeekdays',
    method: 'post',
   data
  })
}

export function revenueForThirtySixtyNinty(query) {
  return request({
    url: '/revenue/revenueForThirtySixtyNinty',
    method: 'get',
    params: query
  })
}

export function revenueProductWise(data) {
  return request({
    url: '/revenueProductThirtySixtyNintyYearly',
    method: 'post',
    data
  })
}

export function revenueSourceWise(query) {
  return request({
    url: '/revenue/revenueSourceWise',
    method: 'get',
    params: query
  })
}

export function revenueForSourceThirtySixtyNinty(query) {
  return request({
    url: '/revenue/revenueForThirtySixtyNintySource',
    method: 'get',
    params: query
  })
}

export function revenueBreakdownUserWise(data) {
  return request({
    url: '/revenueUserBreakdown',
    method: 'post',
    data
  })
}

export function revenueBreakdownRegionWise(data) {
  return request({
    url: '/revenueObjectBreakdown',
    method: 'post',
    data
  })
}

export function revenueBreakdownDeviceWise(data) {
  return request({
    url: '/revenueObjectBreakdown',
    method: 'post',
    data
  })
}

export function genderBreakDown(data) {
  return request({
    url: '/revenueObjectBreakdown',
    method: 'post',
    data
  })
}


export function bestcohort(data) {
  return request({
    url: '/bestcohort',
    method: 'post',
    data
  })
}

export function fullCorr(data) {
  return request({
    url: '/fullcorr',
    method: 'post',
    data
  })
}

export function actualvstargated(data) {
  return request({
    url: '/actualvstargated',
    method: 'post',
    data
  })
}





export function ageBreakDown(data) {
  return request({
    url: '/revenueObjectBreakdown',
    method: 'post',
    data
  })
}

export function revenueVsRelatedMetrics(data) {
  return request({
    url: '/revenueVsRelatedMatrix',
    method: 'post',
    data
  })
}

export function revenueCorrVsRelatedMatrix(data) {
  return request({
    url: '/revenueCorrVsRelatedMatrix',
    method: 'post',
    data
  })
}

export function revenueBuyingFunnel(data) {
  return request({
    url: '/revenueBuyingFunnel',
    method: 'post',
    data
  })
}

export function revenueTopCampaigns(data) {
  return request({
    url: '/revenueTopCampaigns',
    method: 'post',
    data
  })
}

export function sourceandmediumsplit(data) {
  return request({
    url: '/sourceandmediumsplit',
    method: 'post',
    data
  })
}

export function revenueSourceWiseRev(data) {
  return request({
    url: '/revenueSourceWiseRev',
    method: 'post',
    data
  })
}

export function revenueTopProductName(data) {
  return request({
    url: '/revenueTopProductName',
    method: 'post',
    data
  })
}

export function revenueRelatedMetricsCampAdexp(data) {
  return request({
    url: '/revenueRelatedMetricsCampAdexp',
    method: 'post',
    data
  })
}

export function revenueRelatedMetricsAdsetAdFunnelcal(data) {
  return request({
    url: '/revenueRelatedMetricsAdsetAdFunnelcal',
    method: 'post',
    data
  })
}

export function revenueRelatedMetricsCampAdsplit(data) {
  return request({
    url: '/revenueRelatedMetricsCampAdsplit',
    method: 'post',
    data
  })
}


export function revenueRelatedMetricsAdsetPosNegMatrics(data) {
  return request({
    url: '/revenueRelatedMetricsAdsetPosNegMatrics',
    method: 'post',
    data
  })
}

export function revenueMothWiseFunnelCalculationPaid(data) {
  return request({
    url: '/revenueMothWiseFunnelCalculationPaid',
    method: 'post',
    data
  })
}

export function revenuePositiveNegativeMatrix(query) {
  return request({
    url: '/revenue/revenuePositiveNegativeMatrix',
    method: 'get',
    params: query
  })
}

export function revenueMothWiseFunnelCalculationOrganic(query) {
  return request({
    url: '/revenue/revenueMothWiseFunnelCalculationOrganic',
    method: 'get',
    params: query
  })
}


export function revenueRelatedMetricsMontlyOutliers(data) {
  return request({
    url: '/revenueRelatedMetricsMontlyOutliers',
    method: 'post',
    data: data
  })
}

export function searchData(data) {
  return request({
    url: '/cohort',
    method: 'post',
    data
  })
}

export function getdaynamicCharData(data) {
  return request({
    url: '/dynamic',
    method: 'post',
    data
  })
}

export function revenueThirtySixtyNinty(data) {
  return request({
    url: '/revenueThirtySixtyNinty',
    method: 'post',
    data
  })
}

export function revenueAverageGrowth(data) {
  return request({
    url: '/revenueProductThirtySixtyNintyYearly',
    method: 'post',
    data
  })
}

export function notset(data) {
  return request({
    url: '/notset',
    method: 'post',
    data
  })
}

export function notargeted(data) {
  return request({
    url: '/notargeted',
    method: 'post',
    data
  })
}









































//  OLD
// export function getRevnueInWeekDays() {
//   return request({
//     url: '/highest_weekdays',
//     method: 'post',
//   })
// }


// export function getRevnueInMonths() {
//   return request({
//     url: '/highest_month',
//     method: 'post',
//   })
// }


// export function getQTRData(v) {
// //  let fd = new FormData(); // Currently empty
// //  fd.append('year', 2021);
//   return request({
//     url: '/highest_quarter',
//     method: 'post',
//     data: {'year': v}
//   })
// }


// export function getDataSourseVise() {
//   return request({
//     url: '/top_source_revenue',
//     method: 'post',
//   })
// }


// export function getProductData() {
//   return request({
//     url: '/top_product_name',
//     method: 'post',
//   })
// }

// // **************************************************************************

// export function getTopCampaigns(val) {
//   return request({
//     url: '/top_campaigns',
//     method: 'post',
//     data: {'source': val}
//   })
// }


// export function revenue_30_60_90() {
//   return request({
//     url: '/revenue_30_60_90',
//     method: 'post'
//   })
// }


// export function source_30_60_90_Yearly(val) {

//   // let fd = new FormData();
//   // fd.append('period', val);
 

//   return request({
//     url: '/source_30_60_90_Yearly',
//     method: 'post',
//     data: {'period': val}
//   })
// }


// export function productcategory_30_60_90_Yearly(val) {
//   // let fd = new FormData();
//   // fd.append('period', val); 
//   return request({
//     url: '/productcategory_30_60_90_Yearly',
//     method: 'post',
//     data: {'period': val}
//   })
// }




// export function getMatrix(val) {
//   // let fd = new FormData();
//   // fd.append('source', val); 
//   return request({
//     url: '/revenue_vs_related_matrix',
//     method: 'post',
//     data: {'source': val}
//   })
// }


// export function user_breakdown() {
//   return request({
//     url: '/user_breakdown',
//     method: 'post'
//   })
// }


// export function device_breakdown() {
//   return request({
//     url: '/device_breakdown',
//     method: 'post'
//   })
// }


// export function region_breakdowns() {
//   return request({
//     url: '/region_breakdown',
//     method: 'post'
//   })
// }

// export function positive_negative_matrix(val) {
//   // let fd = new FormData();
//   // fd.append('source', val); 
//   return request({
//     url: '/corr_vs_related_matrix',
//     method: 'post',
//     data: {'source': val}
//   })
// }


// export function finnel(val) {
//   // let fd = new FormData();
//   // fd.append('source', val); 
//   return request({
//     url: '/positive_negative_matrix',
//     method: 'post',
//     data: {'source': val}
//   })
// }


// export function selected_date() {
//   return request({
//     url: '/selected_date',
//     method: 'post'
//   })
// }