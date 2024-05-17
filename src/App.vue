<script setup>
import { useRouter, RouterView } from 'vue-router'
import { computed } from 'vue'
const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value)

const navList = [
  {
    path: '/home',
    name: '屏東歸來廠'
  },
  {
    path: '/jiuru',
    name: '屏東九如場'
  }
]

function navigate(e) {
  const selectedValue = e.target.value
  router.push(selectedValue)
}

const isSecondLevelRoute = computed(() => {
  const regex = /\/[^/]+\/[^/]+/g
  return regex.test(currentRoute.value.path)
})

function goBack() {
  router.go(-1)
}

function goToHomePage() {
  router.push('/')
}
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <button class="prev_btn" type="button" @click="goBack">
        <template v-if="isSecondLevelRoute">
          <i class="fa-solid fa-chevron-left"></i>
        </template>
      </button>
      <div class="person_context">
        <button type="button" class="bell_btn">
          <i class="fa-solid fa-bell"></i>
          <span class="notify">1</span>
        </button>
        <button type="button">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
        <button class="person_btn">小明</button>
      </div>
    </header>
    <nav>
      <span class="current_page">{{ isSecondLevelRoute ? currentRoute.name : '' }}</span>
      <div class="custom-select-wrapper">
        <select @change="navigate($event)">
          <option v-for="nav in navList" :key="nav.path" :value="nav.path">
            {{ nav.name }}
          </option>
        </select>
        <span class="custom-arrow">
          <i class="fa-solid fa-chevron-down"></i>
        </span>
      </div>
    </nav>
    <main>
      <RouterView />
    </main>
    <button class="home_btn" type="button" @click="goToHomePage" v-if="isSecondLevelRoute">
      <i class="fa-solid fa-house"></i>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  position: relative;
  height: 100vh;
  background: $bg-100;

  .home_btn {
    position: absolute;
    bottom: 5px;
    right: 12px;
    color: $white;
    background: $primary;
    border-radius: 50%;
    padding: 9.5px 8px;

    i {
      font-size: 25px;
    }
  }
}
header {
  padding: 8px 15px;
  display: flex;
  justify-content: space-between;

  background: $primary;
  i {
    color: $white;
    font-size: 25px;
  }
}
.person_context {
  display: flex;
  justify-content: flex-end;
  gap: 22px;
}
.bell_btn {
  position: relative;
  padding-right: 7px;
  .notify {
    position: absolute;
    top: 4px;
    right: 0px;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 50%;
    background: $danger;
    color: $white;
  }
}

.person_btn {
  background: $white;
  color: $primary;
  border-radius: 50%;
  padding: 6px 3px;
  font-size: 10px;
}

nav {
  padding: 12px 8px;
  background: $bg-100;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.current_page {
  font-size: 14px;
  color: $gray-100;
}

.custom-select-wrapper {
  position: relative;
  display: inline-block;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 8px 50px 8px 7px;
  font-size: 16px;
  border-radius: 30px;
  border: 0px;
  box-shadow: 2px 3px 5px $gray-100;
  background: $white;
  color: $gray-100;
  cursor: pointer;
  &:focus-visible {
    outline: 0px;
  }
}

.custom-arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: $primary;
}

main {
  display: flex;
  padding: 0px 8px 26px;
  gap: 12px;
  flex-direction: column;
  background: $bg-100;
  & > div {
    color: $primary;
  }
}
</style>
