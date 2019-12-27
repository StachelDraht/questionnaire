<template>
    <v-card elevation="0">
        <v-rating v-model="rating" half-increments hover :name="questionId"></v-rating>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        rating: 3
    }),
    props: {
        questionId: String
    },
    watch: {
        rating: function(){
            this.$store.dispatch('addAnswer', {
                questionId: this.questionId,
                answer: this.rating 
            })
        }
    }
}
</script>