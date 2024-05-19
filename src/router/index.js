import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import UnderConstructionPage from '@/views/UnderConstructionPage.vue'

// 定義函數來處理路由前綴
const routesWithPrefix = (prefix, routes) => {
  return routes.map((route) => {
    route.path = `${prefix}${route.path}`
    return route
  })
}

// 設置路由
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home/aquaculture-monitoring',
    name: '養殖監控',
    component: () => import('@/views/nested/AquacultureMonitoringView.vue')
  },
  ...routesWithPrefix('/home/aquaculture-monitoring', [
    {
      path: '/water-temperature-record',
      name: '水溫紀錄',
      component: UnderConstructionPage
    },
    {
      path: '/water-level-record',
      name: '水位紀錄',
      component: () => import('@/views/subPage/WaterLevelRecordView.vue')
    },
    {
      path: '/orp-record',
      name: 'ORP 紀錄',
      component: UnderConstructionPage
    },
    {
      path: '/dissolved-oxygen-record',
      name: '溶氧紀錄',
      component: UnderConstructionPage
    },
    {
      path: '/ph-record',
      name: 'pH紀錄',
      component: UnderConstructionPage
    },
    {
      path: '/salinity-record',
      name: '鹽度紀錄',
      component: UnderConstructionPage
    },
    {
      path: '/ammonia-record',
      name: '氨紀錄',
      component: UnderConstructionPage
    },
    {
      path: '/nitrite-record',
      name: '亞硝酸紀錄',
      component: UnderConstructionPage
    },
    {
      path: '/bacterial-load-record',
      name: '生菌量紀錄',
      component: UnderConstructionPage
    }
  ]),
  {
    path: '/home/water-inflow-outflow',
    name: '進水排水',
    component: UnderConstructionPage
  },
  {
    path: '/home/water-treatment-disinfection',
    name: '養水消毒',
    component: UnderConstructionPage
  },
  {
    path: '/home/batch-records',
    name: '批次紀錄',
    component: UnderConstructionPage
  },
  {
    path: '/home/fingerling-release-records',
    name: '放苗紀錄',
    component: UnderConstructionPage
  },
  {
    path: '/home/feeding-records',
    name: '餵養紀錄',
    component: UnderConstructionPage
  },
  {
    path: '/home/measurement-records',
    name: '量測紀錄',
    component: UnderConstructionPage
  },
  {
    path: '/home/harvesting-records',
    name: '收成紀錄',
    component: UnderConstructionPage
  },
  {
    path: '/home/packaging-records',
    name: '包裝紀錄',
    component: UnderConstructionPage
  },
  {
    path: '/about',
    name: 'about',
    component: UnderConstructionPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
