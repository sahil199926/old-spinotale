export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
    },
    {
        name: 'Revenue',
        icon: 'account_balance_wallet',
        children: [
            {
                name: 'Revenue Trends',
                path: '/revenue/trends',
                iconText: 'R',
            },
            {
                name: 'Source/Product Revenue Trends',
                path: '/revenue/product-source',
                iconText: 'ETm',
            },
            {
                name: 'Revenue vs Related metrics',
                path: '/revenue/funnel',
                iconText: 'RB',
            },
            {
                name: 'Revenue Behavorial',
                path: '/revenue/behavorial',
                iconText: 'RB',
            },
            {
                name: 'Bucket',
                path: '/bucket/Bucketing',
                iconText: 'B',
            }
        ],
    },
]
