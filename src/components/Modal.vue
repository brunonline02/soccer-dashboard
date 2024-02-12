<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <div v-if="type === 'results'">
          <h2>Results</h2>
          <div class="results">
              <div v-if="results.length">
                <div class="date_time" v-for="result in results" :key="result.id">
                  {{ formatDate(result.utcDate) }} {{ formatTime(result.utcDate) }}
                  <div class="result-item">
                    {{ result.homeTeam.name }} 
                    <img class="crest" :src="result.homeTeam.crest">
                    {{ result.score.fullTime.home }}
                    vs.
                    {{ result.score.fullTime.away }} 
                    <img class="crest" :src="result.awayTeam.crest">
                    {{ result.awayTeam.name }}
                  </div>
                  <hr class="line_break">
                </div>
              </div>
              <div class="no_result" v-else>No results available</div>
          </div>
      </div>
      <News v-if="type === 'news'" />
      <Videos v-if="type === 'videos'" :carouselHeight="'500px'" />
      <div class="close_btn_container">
          <button class="close_btn" @click="closeModal">X Close</button>
      </div>    
      </div>
  </div>
</template>

<script>
import News from './News.vue'
import Videos from './Videos.vue'  
import { mapState } from 'vuex';

export default {
  components: {
    News,
    Videos
  },
  props: {
    isOpen: Boolean,
    type: String
  },
  computed: {
  ...mapState(['results'])
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    formatDate(utcDate) {
      const date = new Date(utcDate);
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('de-DE', options);
    },
    formatTime(utcDate) {
      const date = new Date(utcDate);
      const options = { hour: '2-digit', minute: '2-digit' };
      return date.toLocaleTimeString('de-DE', options).replace(/:\d+ /, '');
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  overflow: scroll;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: lightgrey;
  padding: 20px;
  border-radius: 0 0 20px 20px;
}
.close_btn_container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.close_btn {
  background-color: brown;
  border-radius: 5px;
  width: 100px;
  height: 50px;
  color:white;
  border: none;
  font-weight: 600;
}
.results {
  color: black;
  background-color: antiquewhite;
  padding: 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 
  0px 10px 20px, 
  rgba(0, 0, 0, 0.23) 
  0px 6px 6px;
}
.no_result {
  text-align: center;
  font-weight: 900;
}
.date_time {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  align-items: center;
  font-weight: 900;
  @media only screen and (max-width: 768px) {
  font-size: 10px;
  }
  @media only screen and (max-width: 425px) {
  font-size: 12px;
  flex-direction: column;
  row-gap: 5px;
  }
}
.result-item {
display: flex;
align-items: center;
justify-content: center;
column-gap: 5px;
margin-bottom: 10px;
@media only screen and (max-width: 425px) {
  flex-direction: column;
  row-gap: 5px;
}
}
.crest {
height: 15px;
width: 20px;
}
.line_break {
  width: 100%;
  margin-bottom: 20px;
}
</style>