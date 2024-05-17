<template>
  <div class="custom-select-wrapper">
    <select @change="navigate($event)">
      <option value="/">屏東歸來場</option>
      <option value="/about">About</option>
      <option value="/contact">Contact</option>
    </select>
    <span class="custom-arrow">
      <i class="fa-solid fa-chevron-down"></i>
    </span>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
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
</style>
