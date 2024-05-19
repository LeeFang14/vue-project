<template>
  <div class="page_container">
    <Calendar :data="fakeTodayData" />
    <div class="nested-nav">
      <router-link
        v-for="view in nestedViews"
        :key="view.path"
        :to="`/home/${view.path}`"
        :class="{ status: view.status }"
      >
        <img :src="view.imgURL" alt="nav-icon" />
        <div>
          {{ view.name }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Calendar from '@/components/Calendar.vue'
const fakeTodayData = {
  year: '2022',
  month: '01',
  day: '01',
  week: '星期一',
  lunarCalendar: '十一月廿九',
  schedule: [
    {
      id: '1',
      scheduleTime: '11:00',
      scheduleText: '昨晚所放的飼料都有吃完，水色正常'
    },
    {
      id: '2',
      scheduleTime: '09:00',
      scheduleText: '需要預購聯豐蝦粉，特價只到01/10預定10包'
    }
  ]
}

const nestedViews = [
  {
    name: '養殖監控',
    path: 'aquaculture-monitoring',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+1',
    status: true
  },
  {
    name: '進水排水',
    path: 'water-inflow-outflow',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+2',
    status: false
  },
  {
    name: '養水消毒',
    path: 'water-treatment-disinfection',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+3',
    status: false
  },
  {
    name: '批次紀錄',
    path: 'batch-records',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+4',
    status: false
  },
  {
    name: '放苗紀錄',
    path: 'fingerling-release-records',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+5',
    status: false
  },
  {
    name: '餵養紀錄',
    path: 'feeding-records',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+6',
    status: false
  },
  {
    name: '量測紀錄',
    path: 'measurement-records',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+7',
    status: false
  },
  {
    name: '收成紀錄',
    path: 'harvesting-records',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+8',
    status: false
  },
  {
    name: '包裝紀錄',
    path: 'packaging-records',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+9',
    status: false
  }
]
</script>

<style lang="scss" scoped>
.page_container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.nested-nav {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  a {
    width: calc((100% - (5px * 2)) / 3);
    padding: 5px 16px;
    font-size: 14px;
    text-align: center;
    background: $white;
    border-radius: 5px;
    box-shadow: 2px 3px 5px $gray-100;
    color: $primary;
    img {
      width: 60px;
      height: 60px;
    }
  }
  .status {
    background: $danger;
    color: $white;
  }
}
</style>
