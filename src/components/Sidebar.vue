<template>
    <div class="sidebar_container" :class="{ active: active }">
      <font-awesome-icon class="show_btn" @click="toggle" icon="fa-solid fa-bars" />
      <div class="show_bar" >
        <div class="sidebar_header">
          <h3>Profile</h3>
        </div>
        <div class="profile_picture_container">
          <div class="profile_picture_row" v-if="profilePicture">
              <button class="delete_btn" @click="deleteProfilePicture">X</button>
              <div class="profile_picture" :style="{ backgroundImage: 'url(' + profilePicture + ')' }" alt="Profile Picture"></div>
          </div>
          <div class="no_picture" v-else>
              <div class="input_btn">
                  <input type="file" @change="handleImageUpload" accept="image/*" />
              </div>    
          </div>
        </div>
        <div class="links_container">
          <div class="links" @click="openModal('results')">
              <font-awesome-icon icon="fa-regular fa-futbol" />
              <p>Results</p>
          </div>
          <div class="links" @click="openModal('news')">
              <font-awesome-icon icon="fa-regular fa-newspaper" />
              <p>News</p>
          </div>
          <div class="links" @click="openModal('videos')">
              <font-awesome-icon icon="fa-solid fa-video" />
              <p>Videos</p>
          </div>
        </div>
      </div>
    </div>
    <Modal 
    :isOpen="modalOpen"
    :type="modalType"
    @close="closeModal" 
    />
  </template>
  
  <script>
  import Modal from './Modal.vue';

  export default {
    components: {
      Modal,
    },
    data() {
      return {
        profilePicture: localStorage.getItem('profilePicture') || null,
        active: false,
        modalOpen: false,
        modalType: null
      };
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.profilePicture = e.target.result;
            localStorage.setItem('profilePicture', this.profilePicture);
          };
          reader.readAsDataURL(file);
        }
      },
      deleteProfilePicture() {
        localStorage.removeItem('profilePicture');
        this.profilePicture = null;
      },
      toggle () {
        this.active = !this.active
      },
      openModal(type) {
        this.modalOpen = true
        this.modalType = type;
      },
      closeModal() {
        this.modalOpen = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .sidebar_container {
    background-color: antiquewhite;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.19) 
    0px 10px 20px, 
    rgba(0, 0, 0, 0.23) 
    0px 6px 6px;
    display: flex;
    flex-direction: column;
    color: black;
    border-radius: 20px;
    @media only screen and (max-width: 1024px) {
      transition: height 1s ease-out;
      overflow: hidden;
      height: 50px;
      border-radius: 20px 20px 0 0;
      box-shadow: none;
      svg {
        align-self: center;
        margin-top: 15px;
      }
    }
  }
  
  .sidebar_header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .profile_picture_container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    padding-inline: 10px;
  }

  .profile_picture_row{
    border-radius: 50%;
    border: 2px solid #fff
  }

  .profile_picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .no_picture {
    display: flex;
    justify-content: center;
    input::-webkit-file-upload-button {
    cursor: pointer;
    }
  }

  input {
    width: 100px;
    height: 100px;
    opacity: 0;
    cursor: pointer;
  }

  .input_btn {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: url('avatar.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .delete_btn{
    position: absolute;
    background-color: red;
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    font-size: 20px;
    opacity: 0.2;
    transition: opacity 0.3s ease-out;
    &:hover{
        opacity: 1;
    }
  }
  
  .links_container {
    margin-bottom: 20px;
  }
  
  .links {
    display: flex;
    align-items: center;
    column-gap: 10px;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    color: black;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
    background-color: #ddd;
    }
  }

  .show_btn {
    display: none;
    width: fit-content;
    @media only screen and (max-width: 1024px) {
      display: block;
    }
  }

  .show_bar {
    transition: opacity 0.3s ease-out;
    @media only screen and (min-width: 1025px) {
      display: block !important;
    }
    @media only screen and (max-width: 1024px) {
      opacity: 0;
    }
  }
  .sidebar_container.active {
    height: 100%; 
  }
  .sidebar_container.active .show_bar {
    opacity: 1;
    }
  </style>
  