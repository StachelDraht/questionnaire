<template>
<div>
  <v-textarea solo filled :name="questionId" v-model="textArea"></v-textarea>
  </div>
</template>

<script>
export default {
  data: () => ({
    textArea: ''
  }),
  props: {
      questionId: String
  },
  watch: {
    textArea: function() {
      this.$store.dispatch('addAnswer',{
        questionId: this.questionId,
        answer: this.textArea
      })
    }
  }
}
</script>