<template>
  <div class="err-cont">
    <img class="err-img" src="/pow.png" alt="" />

    <h1 class="err-h">Kaboom!</h1>
    <p class="err-para">Click on the button below to escape fire</p>
    <button
      @click="goBack"
      style="
        padding: 10px 30px;
        margin-top: 20px;
        background-color: #ff474c;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
      "
    >
      Run to Safety
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import './ErrorPage.css';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
<style>
@import './ErrorPage.css';
</style>