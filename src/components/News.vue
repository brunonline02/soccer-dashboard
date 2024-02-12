<template>
  <div>
    <h2>News</h2>
  <div class="news">
    <div v-if="news.length" class="carousel">
      <button @click="prevNews" class="arrow left">&#9664;</button>
      <ul>
        <li class="article" v-for="(article, index) in displayedNews" :key="article.id" :class="{ active: index === currentIndex }">
          <h4>{{ article.title }}</h4>
          <h6>{{ article.author }}</h6>
          <div class="read_more_btn">
            <a :href="article.url" target="_blank">Read More</a>
          </div>
          </li>
      </ul>
      <button @click="nextNews" class="arrow right">&#9654;</button>
    </div>
    <div class="no_news" v-else>No news available</div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      displayedNews: [],
      currentIndex: 0,
    };
  },
  computed: {
    ...mapState(['news'])
  },
  created() {
    this.$store.dispatch('fetchNews').then(() => {
        this.updateDisplayedNews();
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  },
  methods: {  
    updateDisplayedNews() {
      this.displayedNews = [this.news[this.currentIndex]];
    },
    prevNews() {
      this.currentIndex = (this.currentIndex - 1 + this.news.length) % this.news.length;
      this.updateDisplayedNews();
    },
    nextNews() {
      this.currentIndex = (this.currentIndex + 1) % this.news.length;
      this.updateDisplayedNews();
    },
  },
};
</script>

<style scoped>
.news {
  text-align: center;
  background-color: antiquewhite;
  padding: 30px;
  border-radius: 10px;
  color: black;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.19) 
  0px 10px 20px, 
  rgba(0, 0, 0, 0.23) 
  0px 6px 6px;
}

.no_news{
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  height: 100%;
}

.carousel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  overflow: hidden;
}

li {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.5s ease;
  @media only screen and (max-width: 1024px) {
    h4 {
      font-size: 14px;
    }
  }
  @media only screen and (max-width: 768px) {
    h4 {
      font-size: 17px;
    }
  }
  @media only screen and (max-width: 425px) {
    h4 {
      font-size: 12px;
    }
  }
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  opacity: 0.2;
  transition: opacity 0.3s ease-out;

  &:hover{
    opacity: 1;
  }
}

.left {
  left: 0;
}

.right {
  right: 0;
}

.active {
  transform: translateX(0);
}

.read_more_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(86, 125, 70);
  border-radius: 5px;
  width: 100px;
  height: 50px;
  border: none;
}
a {
  text-decoration: none;
  color:white;
  font-weight: 600;
}
</style>
