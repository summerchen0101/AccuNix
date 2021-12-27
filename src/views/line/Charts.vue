<script lang="ts">
import Activity from '@/components/charts/Activity.vue'
import Friends from '@/components/charts/Friends.vue'
import Keywords from '@/components/charts/Keywords.vue'
import Labels from '@/components/charts/Labels.vue'
import LifeCycle from '@/components/charts/LifeCycle.vue'
import Message from '@/components/charts/Message.vue'
import Scripts from '@/components/charts/Scripts.vue'
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
