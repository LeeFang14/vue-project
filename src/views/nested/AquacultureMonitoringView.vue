<template>
  <div class="nested-nav">
    <router-link
      v-for="view in nestedViews"
      :key="view.path"
      :to="view.path"
      :class="{ nav_item: isOdd, status: view.status }"
    >
      <div>
        <img :src="view.imgURL" alt="nav-icon" />
      </div>
      <p>
        {{ view.name }}
      </p>
    </router-link>
  </div>
</template>

<script setup>
const nestedViews = [
  {
    name: '水溫紀錄',
    path: '/home/aquaculture-monitoring/water-temperature-record',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+1',
    status: false
  },
  {
    name: '水位紀錄',
    path: '/home/aquaculture-monitoring/water-level-record',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+2',
    status: true
  },
  {
    name: 'ORP 紀錄',
    path: '/home/aquaculture-monitoring/orp-record',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+3',
    status: false
  },
  {
    name: '溶氧紀錄',
    path: '/home/aquaculture-monitoring/dissolved-oxygen-record',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+4',
    status: true
  },
  {
    name: 'pH紀錄',
    path: '/home/aquaculture-monitoring/ph-record',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+5',
    status: true
  },
  {
    name: '鹽度紀錄',
    path: '/home/aquaculture-monitoring/salinity-record',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+6',
    status: false
  },
  {
    name: '氨紀錄',
    path: '/home/aquaculture-monitoring/ammonia-record',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+7',
    status: false
  },
  {
    name: '亞硝酸紀錄',
    path: '/home/aquaculture-monitoring/nitrite-record',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+8',
    status: false
  },
  {
    name: '生菌量紀錄',
    path: '/home/aquaculture-monitoring/bacterial-load-record',
    imgURL: 'https://via.placeholder.com/60x60?text=Image+9',
    status: false
  }
]

const isOdd = nestedViews.length % 2 !== 0
</script>

<style lang="scss" scoped>
.nested-nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  a {
    flex-grow: 1;
    width: calc((100% - (8px)) / 2);
    padding: 12px 16px;
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
    p {
      margin: 0;
    }
  }
  .nav_item:last-child {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .status {
    background: $danger;
    color: $white;
  }
}
</style>
