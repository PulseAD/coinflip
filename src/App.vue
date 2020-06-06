<template>
  <div id="application" :class="[customClass]">
    <div id="nav">
      <router-link to="/">COINFLIP OF LEGENDS</router-link>
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
        return 'dashboard-bg';
      }
      return 'home-bg';
    });

    return { customClass };
  },
};
</script>

<style>
@import './styles/style.css';
</style>
