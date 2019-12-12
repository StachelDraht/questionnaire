<template>
<div>
  <v-textarea solo filled :name="questionId"></v-textarea>
  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  props: {
      questionId: String
  }
}
</script>