import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const RevenueTrends = Loadable(lazy(() => import('./revenue-trends/RevenueTrends')))
const ProductSourceRevenue = Loadable(lazy(() => import('./product-source-revenue/productRevenue')))
const ProductFunnel = Loadable(lazy(() => import('./revenue-vs-related-metrics/productFunnel')))
const RevenueBehavorial = Loadable(lazy(() => import('./revenue-behavorial/revenueBehavorial')))
const Bucket = Loadable(lazy(() => import('../bucketing/Bucket')))

const revenueRoutes = [
    {
        path: '/revenue/trends',
        element: <RevenueTrends />,
        auth: authRoles.admin,
    },
    {
        path: '/revenue/product-source',
        element: <ProductSourceRevenue />,
        auth: authRoles.admin,
    },  
     {
        path: '/revenue/funnel',
        element: <ProductFunnel />,
        auth: authRoles.admin,
    },   
    {
        path: '/revenue/behavorial',
        element: <RevenueBehavorial />,
        auth: authRoles.admin,
    },
    {
        path: '/bucket/Bucketing',
        element: <Bucket />,
        auth: authRoles.admin,
    }
]


export default revenueRoutes
