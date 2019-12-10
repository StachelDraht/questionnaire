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
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>EIC 2020 Q1</v-toolbar-title>
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
                <v-stepper v-model="e6" vertical>
                  <v-stepper-step :complete="e6 > 1" step="1">
                    Select an app
                    <small>Summarize if needed</small>
                  </v-stepper-step>

                  <v-stepper-content step="1">
                    <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                    <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                    <v-btn text>Cancel</v-btn>
                  </v-stepper-content>

                  <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

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
                    <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                    <v-btn text>Cancel</v-btn>
                  </v-stepper-content>
                </v-stepper>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">Answer</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {api} from './data/axios.base'
  export default {
    data() {
      return {
        e6: 1
      }
    },
    props: {
      source: String,
    },
    created: function() {
      api.get('questionnaire/5de62503b4d8d8c5e417acb4').then(data => {
        console.log(data)
      })
    }
  }
</script>