<template>
    <v-card elevation="0">
        <v-rating v-model="rating" half-increments hover></v-rating>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        rating: 3
    })
}
</script>