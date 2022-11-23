import React from 'react'
import { Redirect } from 'react-router-dom'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import revenueRoutes from './views/dashboard/revenueRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...revenueRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
