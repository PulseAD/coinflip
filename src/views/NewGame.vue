<template>
  <div class="new-game">
    <div class="before-game" v-if="!isGameFinished">
      <div v-if="!isLoading">
        <div>
          <h1>CHOOSE <br /> YOUR SIDE</h1>
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
        <h1>{{ getLastGame.message }}</h1>
        <div class="img-winner">
          <img
            :src="require(`@/assets/${getWinnerImg}.png`)"
            alt="winner-side"
            title="winner-side"
          />
        </div>
        <h1>{{ formatLp(getLastGame, true) }}</h1>
        <div class="button-container">
          <a
            class="button"
            role="button"
            @click="next()"
            >
            NEXT
          </a>
        </div>
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
  font-size: 4.5vw;
  text-align: center;
}

h1 {
  font-size: 60px;
  margin-top: 20px;
}

h2 {
  font-size: 40px;
}

.row {
  cursor: pointer;
  margin-top: 14vw;
}

.after-game h1 {
  text-transform: uppercase;
  margin: 60px;
}

.img-container img{
  height: 30vw;
}

.img-winner img{
  height: 20vw;
}

.button-container {
  margin: 0px 20vw;
}

@media only screen and (max-width: 900px) {

  h1 {
    font-size: 8vw;
  }

  h2 {
    font-size: 6vw;
    margin: 10px;
  }

  .row {
    display: block;
    margin-top: 10px;
  }

  .column {
    padding: 20px;
  }

  .img-container img{
    height: 40vw;
  }

  .img-winner img{
    height: 50vw;
  }

  .button-container .button{
    font-size: 8vw;
    padding: 15px 0px;
  }

  .after-game h1 {
    margin-top: 20px;
    margin-bottom: 50px;
  }
}

@media only screen and (min-width: 1400px) {
  .row {
    margin-top: 50px;
  }
}
</style>
