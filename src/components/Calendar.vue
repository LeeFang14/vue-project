<template>
  <div class="component_container">
    <div class="calendar_context">
      <div class="week">{{ data.week }}</div>
      <div class="date_context">
        <button class="schedule_btn" type="button"><i class="fa-solid fa-plus fa-fw"></i></button>
        <div class="date">
          <span>{{ data.lunarCalendar }}</span>
          <span>{{ `${data.month}/${data.day}` }}</span>
        </div>
      </div>
    </div>
    <div class="schedule_list">
      <div class="divider"></div>
      <div class="schedule_item" v-for="shedule in data.schedule" :key="shedule.id">
        <div class="date">
          <span>{{ `${data.year}/${data.month}/${data.day}` }}</span>
          <span>{{ shedule.scheduleTime }}</span>
        </div>
        <p>
          {{ shedule.scheduleText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.component_container {
  padding: 33px 8px 5px;
  background: $Secondary;
  border-radius: 5px;
  box-shadow: 2px 2px 3px $gray-100;
  color: $white;
}
.calendar_context {
  padding-right: 25px;
  margin-bottom: 10px;
}
.week {
  font-size: 16px;
  text-align: end;
  margin-bottom: 8px;
}
.date_context {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .date {
    line-height: 1;
    span:nth-child(1) {
      font-size: 16px;
    }
    span:nth-child(2) {
      font-size: 43.5px;
      margin-left: 5px;
    }
  }
}
.schedule_btn {
  background: $primary;
  color: $white;
  border-radius: 50%;
  padding: 8px 6px;
  i {
    font-size: 20px;
    line-height: 1;
  }
}

.schedule_list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.divider {
  position: absolute;
  top: 0;
  right: -5px;
  width: 2px;
  height: 22px;
  background: $white;
  border-radius: 0.5px;
}
.schedule_item {
  padding: 10px 5px;
  font-size: 12px;
  background: $bg-100;
  color: $gray-100;
  border-radius: 5px;
  .date {
    span:nth-child(2) {
      margin-left: 10px;
    }
  }
  p {
    margin: 0;
    white-space: pre-wrap;
  }
}
</style>
