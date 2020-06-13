<template>
  <div class="dashboard">
    <SummonerInfo :session="session" />
    <p class="record">
      {{ session.winNumber }}W - {{ session.looseNumber }}L
    </p>
    <Statistics :session="session" />
    <GameHistory :session="session" />
    <div class="button-container">
      <a
        class="button"
        role="button"
        @click="newGame()"
        >
        NEW GAME
      </a>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import SummonerInfo from '../components/SummonerInfo.vue';
import Statistics from '../components/Statistics.vue';
import GameHistory from '../components/GameHistory.vue';

export default {
  components: { SummonerInfo, Statistics, GameHistory },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = router.currentRoute.value;
    const isLoading = ref(false);

    const session = computed(() => store.getters.getSession);
    const retrieveSession = async () => {
      if (session.value) {
        return;
      }
      try {
        isLoading.value = true;
        await store.dispatch('retrieveSession', route.params.sessionId);
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        router.push({ name: 'Home' });
      }
    };

    const newGame = () => {
      router.push({ name: 'NewGame' });
    };

    retrieveSession();

    return {
      session,
      isLoading,
      newGame,
    };
  },
};
</script>

<style scoped>

.dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* grid-template-rows: repeat(6, 1fr); */
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.record {
  grid-area: 3 / 2 / 4 / 3;
  font-size: 4vw;
  font-family: 'Montserrat';
  font-weight: 900;
  text-align: center;
}

.button-container {
  grid-area: 5 / 1 / 6 / 3;
  margin: 10px 5vw;
}

.button-container .button {
  font-size: 8vw;
  padding: 15px 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

@media only screen and (min-width: 768px) {
  .dashboard {
    grid-template-columns: repeat(4, 1fr);
  }

  .button-container {
    grid-area: 4 / 3 / 5 / 5;
    margin: 10px 7vw;
  }

  .button-container .button {
    font-size: 4vw;
    padding: 40px 0px;
  }

  .record {
    padding-top: 3vw;
    grid-area: 4 / 1 / 5 / 2;
    font-size: 2vw;
  }
}

</style>
