<template>
  <div class="container">
    <div id="leaderboard" v-if="!isLoading">
      <h1>LEADERBOARDS</h1>
      <h2>BEST SCORES TODAY</h2>
      <LeaderboardTable :leaderboard="leaderboards.todayLuckyLeaderboard" />
      <h2>MOST UNLUCKY TODAY</h2>
      <LeaderboardTable :leaderboard="leaderboards.todayUnluckyLeaderboard" />
      <h2>GLOBAL BEST SCORES</h2>
      <LeaderboardTable :leaderboard="leaderboards.luckyLeaderboard" />
      <h2>GLOBAL MOST UNLUCKY</h2>
      <LeaderboardTable :leaderboard="leaderboards.unluckyLeaderboard" />
    </div>
    <div v-else class="loader centered"></div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import LeaderboardTable from '../components/LeaderboardTable.vue';

export default {
  components: { LeaderboardTable },
  setup() {
    const store = useStore();
    const isLoading = ref(false);

    const leaderboards = computed(() => store.getters.getLeaderboards);

    const getLeaderboards = async () => {
      try {
        isLoading.value = true;
        await store.dispatch('getLeaderboards');
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
      }
    };
    getLeaderboards();

    return {
      leaderboards,
      isLoading,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 20px;
}
#leaderboard {
  font-family: 'Muli';
  max-width: 1000px;
  margin: 20px;
}
h1 {
  font-family: 'Montserrat';
  text-align: center;
  font-size: 4vw;
}

h2 {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 3.5vw;
}

table {
  width: 100%;
  margin: 0 auto;
  font-size: 3vw;
}

@media only screen and (min-width: 768px) {
  h1 {
    font-family: 'Montserrat';
    text-align: center;
    font-size: 30px;
  }

  h2 {
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 25px;
  }

  table {
    font-size: 20px;
  }
}

</style>
