<template>
  <div class="stats">
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
</template>

<script>
import { computed } from 'vue';

export default {
  props: ['session'],
  setup(props) {
    const getInitialWinrate = () => {
      if (props.session.currentRank.orderedRank < 25) {
        return 52;
      }
      return 50;
    };

    const winrate = computed(() => {
      const difference = props.session.maxRank.orderedRank
        - props.session.currentRank.orderedRank;
      return getInitialWinrate() + difference * 2;
    });

    return { winrate };
  },
};
</script>

<style>
.stats {
  grid-area: 4 / 2 / 5 / 3;
  font-size: 2vw;
  text-align: center;
  font-family: 'Muli';
  font-weight: 600;
  letter-spacing: 1.2px;
  line-height: 150%;
}

@media only screen and (min-width: 768px) {
  .stats {
    grid-area: 4 / 2 / 5 / 3;
    font-size: 1.5vw;
  }
}
</style>
