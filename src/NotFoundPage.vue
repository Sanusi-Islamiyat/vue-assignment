<template>
  <div class="ntf-cont" style="text-align: center; margin-top: 50px;">
    <img class="ntf-img" src="/No-Connection.jpg" alt="" />
    <h1 class="ntf-h">404 - Connection Lost</h1>
    <p class="ntf-para">
      Find your way back to the homepage to plug in what you need
    </p>
    <button
      @click="goHome"
      style="
        padding: 10px 20px;
        background-color: pink;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-block-start: 10px;
      "
    >
      Go Back Home
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style src="./NotFoundPage.css" />
