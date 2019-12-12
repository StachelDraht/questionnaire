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
                <!--<v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://codepen.io/johnjleider/pen/pMvGQO"
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-codepen</v-icon>
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip>-->
              </v-toolbar>
              <v-card-text>
                <!--<v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    type="text"
                  />
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="done"
                    type="password"
                  />
                </v-form>-->
                <v-form ref="form">
                <v-stepper v-model="e6" vertical>
                  <!-- start -->
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
                      
                      <!--<v-btn text>Cancel</v-btn>-->
                    </v-stepper-content>
                  </div>
                  <!-- end -->
                  <!--<v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>
                  <v-stepper-content step="2">
                    <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                    <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                    <v-btn text>Cancel</v-btn>
                  </v-stepper-content>
                  <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>
                  <v-stepper-content step="3">
                    <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                    <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
                    <v-btn text>Cancel</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="4">View setup instructions</v-stepper-step>
                  <v-stepper-content step="4">
                    <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                    <v-btn color="primary" @click="e6 = 1">Next</v-btn>
                    <v-btn text>Cancel</v-btn>
                  </v-stepper-content>-->
                </v-stepper>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <!--<v-btn color="primary">Answer</v-btn>-->
              </v-card-actions>
            </v-card>
            <v-card v-if="!loader">
               <v-progress-linear
                indeterminate
                color="yellow darken-2"
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
        questions: [],
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
        console.log('hello')
        this.questions.forEach(element => {
          console.log(element)
          console.log(this.$refs.form)
        });
      }
    },
    created: function() {
      this.questionnaireId = this.$route.params.id
      api.get(`questionnaire/${this.questionnaireId}`).
      then(data => {
        this.questionnaireTitle = data.data.questionnaire.name
        this.questions = data.data.questions
      })
      .then(() => {
        this.loader = true
      })
    }
  }
</script>
