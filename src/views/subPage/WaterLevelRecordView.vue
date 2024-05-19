<template>
  <div class="card_list">
    <div
      class="card_item"
      v-for="item in fakeData"
      :key="item.pondId"
      :class="{ abnormal: item.abnormalStatus }"
    >
      <div>
        <p>{{ item.pondId }}</p>
        <p>{{ item.pondName }}</p>
        <p>{{ item.waterDepthLocation }}%</p>
        <p>目前{{ item.waterCapacity }}立方公尺</p>
      </div>

      <svg
        :id="'fillgauge' + item.pondId"
        width="120px"
        height="120px"
        :data="item.waterDepthLocation"
      ></svg>
    </div>
  </div>
</template>

<script setup>
import { FluidGauge } from '@/utils/liquidFillGauge.js'
import { onMounted } from 'vue'

const fakeData = [
  {
    pondId: '01',
    pondName: '白蝦池',
    waterDepthLocation: '70',
    waterCapacity: '348',
    abnormalStatus: false
  },
  {
    pondId: '02',
    pondName: '養水池',
    waterDepthLocation: '50',
    waterCapacity: '298',
    abnormalStatus: false
  },
  {
    pondId: '03',
    pondName: '龍膽石斑魚池',
    waterDepthLocation: '95',
    waterCapacity: '592',
    abnormalStatus: true
  },
  {
    pondId: '04',
    pondName: '白蝦池',
    waterDepthLocation: '25',
    waterCapacity: '104',
    abnormalStatus: true
  }
]

onMounted(() => {
  const createGauge = (elementId, value, customConfig) => {
    const config = { ...FluidGauge.liquidFillGaugeDefaultSettings(), ...customConfig }
    new FluidGauge(elementId, value, config)
  }

  fakeData.forEach((item) => {
    createGauge('fillgauge' + item.pondId, parseInt(item.waterDepthLocation), {
      circleColor: '#4aadde',
      textSize: 0,
      waveCount: 0.5,
      waveAnimateTime: 5000,
      waveColor: '#4aadde'
    })
  })
})
</script>

<style lang="scss" scoped>
.card_list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.card_item {
  display: flex;
  padding: 5px 0;
  background: $white;
  border-radius: 5px;
  box-shadow: 2px 3px 5px $gray-100;
  color: $gray-100;
  & > div {
    padding: 7px 12px;
    width: 42%;
    font-size: 12px;
  }
  p {
    margin: 0;
  }
  p:nth-child(2) {
    width: 60%;
  }
  p:nth-child(3) {
    font-size: 24px;
  }
}
.abnormal {
  background: $danger;
  color: $white;
}
svg {
  align-self: center;
}
</style>
