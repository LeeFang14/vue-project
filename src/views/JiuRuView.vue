<script setup>
import Calendar from '@/components/Calendar.vue'

const fackTodayData = {
  year: '2022',
  month: '01',
  day: '01',
  week: '星期一',
  lunarCalendar: '十一月廿九',
  schedule: [
    {
      id: '1',
      scheduleTime: '',
      scheduleText: '今日目前無排程...'
    }
  ]
}
</script>
<template>
  <Calendar :data="fackTodayData" />
</template>

<style lang="scss" scoped></style>
