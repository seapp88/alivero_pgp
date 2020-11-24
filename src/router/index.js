import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: require('../layout/Main').default,
        children: [
            {
                path: '',
                component: require('../pages/Home').default,
            },
            {
                path: '/settings',
                component: require('../pages/Settings').default,
            },
            {
                path: '/get-products',
                component: require('../pages/get_products/Index').default,
                children: [
                    {
                        path: '',
                        component: require('../pages/get_products/SelectCompany').default,
                    },
                    {
                        path: ':company_id',
                        component: require('../pages/get_products/RecentProductList').default,
                    },
                    {
                        path: ':company_id/category',
                        component: require('../pages/get_products/CategoryList').default,
                    },
                    {
                        path: ':company_id/category/:name',
                        component: require('../pages/get_products/ProductList').default,
                    },
                    // {
                    //     path: ':spec_id',
                    //     component: require('../pages/get_products/CategoryList').default,
                    // },
                    // {
                    //     path: ':spec_id/:category_id',
                    //     component: require('../pages/get_products/ProductList').default,
                    // },
                    // {
                    //     path: 'search',
                    //     component: require('../pages/get_products/SearchResult').default,
                    // }
                ]
            },
            {
                path: '/get-products-process/:product_id',
                component: require('../pages/get_products_process/Layout').default,
                children: [
                    {
                        path: '',
                        component: require('../pages/get_products_process/Index').default,
                    },
                    {
                        path: 'color',
                        component: require('../pages/get_products_process/Color').default,
                    },
                    {
                        path: 'size',
                        component: require('../pages/get_products_process/Size').default,
                    },
                    {
                        path: 'tag',
                        component: require('../pages/get_products_process/Tag').default,
                    }
                ]
            },
            {
                path: '/stock-print',
                component: require('../pages/stock_print').default,
            }
        ]
    },
    {
        path: '/auth',
        component: require('../layout/Auth').default,
        children: []
    },
];

const router = new VueRouter({
    routes
})

export default router
