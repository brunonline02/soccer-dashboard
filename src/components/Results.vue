<template>
  <div>
    <h2>Results</h2>
    <div class="results">
      <div v-if="results.length">
        <div class="date_time" v-for="result in displayedResults" :key="result.id">
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
        </div>
      </div>
    <div v-else>No results available</div>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    ...mapState(['results']),
    displayedResults() {
      return this.results.slice(this.currentIndex, this.currentIndex + 1);
    },
  },
    created() {
      this.$store.dispatch('fetchResults').then(() => {
        this.startAutoLoop();
      })
      .catch((error) => {
        console.error('Error fetching Results:', error);
      });
  },
  methods: {
    startAutoLoop() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.results.length;
      }, 3000);
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
  },
};
</script>

<style scoped>
.results {
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: antiquewhite;
  padding: 30px;
  border-radius: 10px;
  color: black;
  font-weight: 900;
  height: 20px;
  box-shadow: rgba(0, 0, 0, 0.19) 
  0px 10px 20px, 
  rgba(0, 0, 0, 0.23) 
  0px 6px 6px;
  @media only screen and (max-width: 1024px) {
    font-size: 12px;
    padding: 20px;
    height: 30px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 10px;
    height: 60px;
    padding: 5px;
  }
  @media only screen and (max-width: 425px) {
    height: 120px;
  }
}

.date_time {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  align-items: center;
}

.result-item {
  display: flex;
  align-items: center;
  column-gap: 5px;
  transition: transform 0.5s ease;
  @media only screen and (max-width: 425px) {
    flex-direction: column;
    row-gap: 5px;
  }
}

.crest {
  height: 15px;
  width: 20px;
}
</style>
