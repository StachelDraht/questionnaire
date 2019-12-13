<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12" v-if="loader">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>{{ questionnaireTitle }}</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                <v-stepper v-model="e6" vertical>
                  <div v-for="question in questions" :key="question._id">
                    <v-stepper-step :complete="e6 > question.order" :step="question.order">
                      <small><b>{{ question.question }}</b></small>
                    </v-stepper-step>

                    <v-stepper-content :step="question.order">
                      <v-card elevation="0">
                        <component v-bind:is="'type'+question.type" v-bind:questionId="question._id"></component>
                        <v-card-actions>
                          <v-btn small color="primary" @click="sendAnswers" v-if="question.order == questions.length">Send</v-btn>
                          <v-btn small color="primary" @click="e6 = question.order+1" v-if="question.order != questions.length">Next</v-btn> <v-spacer />
                          <v-btn small color="primary" @click="e6 = question.order-1" v-if="question.order > 1">Prev</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>
                  </div>
                </v-stepper>
                </v-form>
              </v-card-text>
              <v-card-actions>
              </v-card-actions>
            </v-card>
            <v-card v-if="!loader">
               <v-progress-linear
                indeterminate
                color="blue darken-2"
              ></v-progress-linear>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import typetext from './components/typeText'
  import typerate from './components/typeRate.vue'
  import {api} from './data/axios.base'
  export default {
    data() {
      return {
        e6: 1,
        questionnaireTitle: '',
        questions: '',
        loader: false,
        questionnaireId: ''
      }
    },
    props: {
      source: String,
    },
    components: {
      'typetext': typetext,
      'typerate': typerate
    },
    methods: {
      sendAnswers: function() {
        //console.log(this.$store.getters.getAnswers)
        let formData = this.$store.getters.getAnswers
        api.post(`answer/makeanswers`, {questionnaireId: this.questionnaireId, answers: formData})
        .then(data => {
          data
        })
      }
    },
    created: function() {
      this.questionnaireId = this.$route.params.id
      api.get(`questionnaire/${this.questionnaireId}`).
      then(data => {
        this.questionnaireTitle = data.data.questionnaire.name
        this.questions = data.data.questions
        this.questionnaireId = data.data.questionnaire._id
      })
      .then(() => {
        this.loader = true
      })
    }
  }
</script>
