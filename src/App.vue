<script setup>
import Results from './components/Results.vue'
import News from './components/News.vue'
import Videos from './components/Videos.vue'
import Sidebar from './components/Sidebar.vue'

</script>

<template>
  <div id="app">
    <div class="dashboard">
      <aside class="sidebar">
        <Sidebar />
      </aside>
      <main class="main-content">
        <Results />
        <div class="bottom-row">
          <News />
          <Videos />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>

.dashboard {
  display: grid;
  grid-template-columns: 1fr 7fr;
  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.sidebar {
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 20px 0 0 20px;
  @media only screen and (max-width: 1024px) {
    background-color: transparent;
    padding: 0;
  }
}

.main-content {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
  padding-inline: 20px;
  padding-bottom: 20px;
}

.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
}
}
</style>
