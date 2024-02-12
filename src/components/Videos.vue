<template>
    <div>
      <h2>Latest Videos</h2>
      <div 
      v-if="videos.length" 
      class="video_carousel"
      :style="{ '--carousel-height': carouselHeight }"
      >
        <button @click="prevVideo" class="arrow left">&#9664;</button>
        <div class="video_container">
          <iframe
            class="video"
            v-for="(video) in displayedVideos"
            :key="video.id"
            :src="video.url"
            frameborder="0"
            controls="0"
            allowfullscreen
          ></iframe>
        </div>
        <button @click="nextVideo" class="arrow right">&#9654;</button>
      </div>
      <p v-else>No videos available</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      carouselHeight: {
      type: String,
      default: '200px'
    },
    },
    data() {
      return {
        videos: [
        { id: 1, url: 'https://www.youtube.com/embed/mLgM52IT6DA?si=mlngxWB45ibSxvlP' },
          { id: 2, url: 'https://www.youtube.com/embed/8qtR3_Uj1lA?si=XjGcaNbsRiJg3KD-' },
          { id: 3, url: 'https://www.youtube.com/embed/wP6__QU0jv0?si=xWOd3oPhemwf3iA3' },
          { id: 4, url: 'https://www.youtube.com/embed/nYteOUABFn4?si=A1Ta7AokQAIarFh5' },
          { id: 5, url: 'https://www.youtube.com/embed/71LEfaO9A_g?si=G2_8fyV7e3jkFLrb' },
          { id: 6, url: 'https://www.youtube.com/embed/y2m24X6qHVc?si=AwpXltPDyMr7xmNj' },
          { id: 7, url: 'https://www.youtube.com/embed/wjpw4T1ACyw?si=C7civ5F520XXPhw1' },
          { id: 8, url: 'https://www.youtube.com/embed/GICakUjhHa4?si=fIRPrFlhJdqboq3K' },
          { id: 9, url: 'https://www.youtube.com/embed/mHYsAgAx5I4?si=0BDV2O3mPboAJ5Bk' },
          { id: 10, url: 'https://www.youtube.com/embed/rzUHunTocJM?si=G7GK7rvZmOV3-sTD' },
        ],
        displayedVideos: [],
        currentVideoIndex: 0,
      };
    },
    created() {
      this.updateDisplayedVideos();
    },
    methods: {
      updateDisplayedVideos() {
        this.displayedVideos = [this.videos[this.currentVideoIndex]];
      },
      prevVideo() {
        this.currentVideoIndex =
          (this.currentVideoIndex - 1 + this.videos.length) % this.videos.length;
        this.updateDisplayedVideos();
      },
      nextVideo() {
        this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
        this.updateDisplayedVideos();
      },
    },
  };
  </script>
  
  <style scoped>
  .video_carousel {
    position: relative;
    background-color: antiquewhite;
    padding: 30px;
    border-radius: 10px;
    height: var(--carousel-height);
    box-shadow: rgba(0, 0, 0, 0.19) 
    0px 10px 20px, 
    rgba(0, 0, 0, 0.23) 
    0px 6px 6px;
  }
  
  .video_container {
    display: flex;
    justify-content: center;
    height: 100%;
  }
  
  .video {
    width: 100%;
    height: auto;
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
  
    &:hover {
      opacity: 1;
    }
  }
  
  .left {
    left: 0;
  }
  
  .right {
    right: 0;
  }
  </style>
  