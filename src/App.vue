<template>
  <div id="application" :class="[customClass]">
    <div id="nav">
      <router-link to="/" :class="[navClass]">HOME</router-link>
      <router-link :to="{ name: 'Leaderboard' }" :class="[navClass]">LEADERBOARD</router-link>
      <router-link :to="{ name: 'Contribute' }" :class="[navClass]">CONTRIBUTE</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const customClass = computed(() => {
      if (router.currentRoute.value.name === 'Dashboard') {
        return 'home-bg';
      }
      if (router.currentRoute.value.name === 'NewGame') {
        return 'new-game-bg';
      }
      if (router.currentRoute.value.name === 'Leaderboard') {
        return 'leaderboard-bg';
      }
      if (router.currentRoute.value.name === 'Contribute') {
        return 'leaderboard-bg';
      }
      return 'home-bg';
    });

    const navClass = computed(() => {
      if (router.currentRoute.value.name === 'Leaderboard') {
        return 'black';
      }
      if (router.currentRoute.value.name === 'Contribute') {
        return 'black';
      }
      return '';
    });

    return { customClass, navClass };
  },
};
</script>

<style>
@import './styles/style.css';
</style>
