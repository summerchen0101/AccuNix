<script lang="ts">
import Activity from '@/components/linebot/Activity.vue'
import Friends from '@/components/linebot/Friends.vue'
import Keywords from '@/components/linebot/Keywords.vue'
import Labels from '@/components/linebot/Labels.vue'
import LifeCycle from '@/components/linebot/LifeCycle.vue'
import Message from '@/components/linebot/Message.vue'
import Scripts from '@/components/linebot/Scripts.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    LifeCycle,
    Activity,
    Friends,
    Message,
    Labels,
    Keywords,
    Scripts,
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
    <LifeCycle />
    <Activity />
    <Friends />
    <Message />
    <Labels />
    <Keywords />
    <Scripts />
  </div>
</template>
