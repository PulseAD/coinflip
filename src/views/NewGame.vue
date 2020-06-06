<template>
  <div class="new-game">
    <div class="before-game" v-if="!isGameFinished">
      <div v-if="!isLoading">
        <div>
          <h1>CHOOSE</h1>
          <h1>YOUR SIDE</h1>
        </div>
        <div class="row">
          <div class="column left" @click="newGame(true)">
            <div class="img-container">
              <img src="../assets/blue-inib.png" alt="blue-inib" title="blue-inib" />
            </div>
            <h2>BLUE SIDE</h2>
          </div>
          <div class="column right" @click="newGame(false)">
            <div class="img-container">
              <img src="../assets/red-inib.png" alt="red-inib" title="red-inib" />
            </div>
            <h2>RED SIDE</h2>
          </div>
        </div>
      </div>
      <div class="loader centered" v-else></div>
    </div>
    <div class="after-game" v-else>
        <h2>{{ getLastGame.message }}</h2>
        <div class="img-winner">
          <img
            :src="require(`@/assets/${getWinnerImg}.png`)"
            alt="winner-side"
            title="winner-side"
          />
        </div>
        <h2>{{ formatLp(getLastGame, true) }}</h2>
        <a
          class="button"
          role="button"
          @click="next()"
          >
          NEXT
        </a>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import formatLp from '../helpers/formatLp';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();
    const store = useStore();
    const isGameFinished = ref(false);
    const isLoading = ref(false);
    const winner = ref(null);

    const next = () => {
      const sessionId = store.getters.getSession._id;
      router.push({ name: 'Dashboard', params: { sessionId } });
    };

    const verifySession = () => {
      if (!store.getters.getSession) {
        router.push({ name: 'Home' });
      }
    };

    const newGame = async (isBlueSideWinning) => {
      try {
        const sessionId = store.getters.getSession._id;
        isLoading.value = true;
        winner.value = await store.dispatch('newGame', { sessionId, isBlueSideWinning });
        isGameFinished.value = true;
        isLoading.value = false;
      } catch (error) {
        router.push({ name: 'Home' });
      }
    };

    const getLastGame = computed(() => {
      const history = store.getters.getSession.messageHistory;
      return history[0];
    });

    const getWinnerImg = computed(() => {
      if (winner.value === 'redSide') {
        return 'red-inib';
      }
      return 'blue-inib';
    });

    verifySession();

    return {
      next,
      isGameFinished,
      isLoading,
      newGame,
      getLastGame,
      getWinnerImg,
      formatLp,
    };
  },
};
</script>

<style scoped>
.new-game {
  color: #fff;
  font-family: Montserrat;
  font-size: 64px;
  text-align: center;
}

.column.left .img-container {
  margin-top: 134px;
}

.row {
  cursor: pointer;
}

.after-game h2 {
  font-size: 96px;
  text-transform: uppercase;
  margin: 60px;
}

.img-winner img{
  height: 300px;
}

.centered {
  margin: 0 auto;
  margin-top: 100px;
}
</style>
