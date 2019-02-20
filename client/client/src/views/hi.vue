<template>
  <radial-progress-bar :diameter="200"
                       :completed-steps="completedSteps"
                       :total-steps="totalSteps">
   <p>Total steps: {{ totalSteps }}</p>
   <p>Completed steps: {{ completedSteps }}</p>
  </radial-progress-bar>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'

export default {
  data () {
    return {
      completedSteps: 5,
      totalSteps: 10
    }
  },

  components: {
    RadialProgressBar
  }
}
</script>