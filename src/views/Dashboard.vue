<template>
  <div class="dashboard">
    <div class="row">
      <div class="column left">
        <h2>{{ session.summonerName }}</h2>
        <div class="emblem-container">
          <img
            :src="require(`@/assets/${session.currentRank.tier}.png`)"
            alt="emblem"
            title="emblem"
          />
        </div>
        <p class="rank">
          {{ session.currentRank.tier }} {{ session.currentRank.rank }}
        </p>
        <p class="lp white" v-if="!session.currentRank.miniSeries">
          {{ session.currentRank.leaguePoints }} LP
        </p>
        <p class="lp white mini-series" v-else>
          {{ formatMiniSeries(session.currentRank.miniSeries.progress) }}
        </p>
      </div>
      <div class="column right">
        <h2>LAST GAMES</h2>
        <div class="history">
          <div
            class="history-element"
            v-for="history in session.messageHistory"
            :key="history._id"
            :class="obtainClass(history.message)"
            >
            {{ history.message }} {{ formatLp(history) }}
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column left">
        <div class="row stats">
          <div class="column left ranks">
            <p class="score">
              <span class="white">Score: </span>
              <span class="black">{{ session.score }}</span>
            </p>
            <p class="initial-rank">
              <span class="white">Initial rank: </span>
              <span class="black">
                {{ session.initialRank.tier }}
                {{ session.initialRank.rank }}
              </span>
              <span class="white">
                {{ ` ${session.initialRank.leaguePoints}` }} LP
              </span>
            </p>
            <p class="highest-rank">
              <span class="white">Hightest rank: </span>
              <span class="black">
                {{ session.maxRank.tier }}
                {{ session.maxRank.rank }}
              </span>
            </p>
            <p class="winrate">
              <span class="white">New game winrate: </span>
              <span>{{ winrate }} %</span>
            </p>
          </div>
          <div class="column right">
            <p class="record">
              {{ session.winNumber }}W - {{ session.looseNumber }}L
            </p>
          </div>
        </div>
      </div>
      <div class="column right">
        <a
          class="button"
          role="button"
          @click="newGame()"
          >
          NEW GAME
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import formatLp from '../helpers/formatLp';

export default {
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

    const winrate = computed(() => {
      const difference = session.value.maxRank.orderedRank - session.value.currentRank.orderedRank;
      return 50 + difference * 2;
    });

    const formatMiniSeries = (value) => {
      let newValue = value;
      newValue = newValue.replace(/N/g, '-');
      return newValue;
    };

    const obtainClass = (message) => {
      const victories = [
        'miniseries_victory',
        'victory',
        'promote',
        'new_miniseries',
      ];
      if (victories.includes(message)) {
        return ['victory'];
      }
      return ['defeat'];
    };

    const newGame = () => {
      router.push({ name: 'NewGame' });
    };

    retrieveSession();

    return {
      session,
      isLoading,
      winrate,
      formatMiniSeries,
      formatLp,
      obtainClass,
      newGame,
    };
  },
};
</script>

<style scoped>
.column.left h2 {
  margin-top: 40px;
  color: #fff;
  font-size: 72px;
  text-align: center;
  font-family: 'Montserrat';
  font-weight: 900;
}

.emblem-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.emblem-container img{
  display: block;
  margin: 0 auto;
  max-width: 400px;
}

.rank,.lp{
  font-family: 'Montserrat';
  font-weight: 900;
  font-size: 64px;
  text-align: center;
}

.white {
  color: #fff;
}

.column.right h2 {
  margin-top: 40px;
  margin-bottom: 40px;
  color: #fff;
  font-size: 48px;
  text-align: center;
  font-family: 'Montserrat';
  font-weight: 900;
}

.history {
  margin: 0px auto;
  max-width: 800px;
}

.history-element {
  display: block;
  color: #fff;
  font-size: 48px;
  text-align: center;
  font-family: 'Montserrat';
  font-weight: 900;
  text-transform: uppercase;
  margin: 20px auto;
  padding: 20px 40px;
}

.stats {
  margin: 0 auto;
  margin-top: 40px;
  max-width: 700px;
}

.ranks {
  font-size: 18px;
  font-family: 'Muli';
  font-weight: 600;
  letter-spacing: 1.2px;
  line-height: 150%;
}

.record {
  font-size: 36px;
  font-family: 'Montserrat';
  font-weight: 900;
  text-align: right;
}

.mini-series {
  letter-spacing: 10px;
  font-family: 'Muli';
  font-weight: 600;
  font-size: 55px;
}

.defeat {
  background-color: #8E3D3D;
}

.victory {
  background-color: #3E9264;
}
</style>
