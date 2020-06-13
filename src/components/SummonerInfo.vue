<template>
    <h2>{{ session.summonerName }}</h2>
    <div class="emblem-container">
      <img
        :src="require(`@/assets/${session.currentRank.tier}.png`)"
        alt="emblem"
        title="emblem"
      />
    </div>
    <div class="tier-rank">
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
</template>

<script>
export default {
  props: ['session'],
  setup() {
    const formatMiniSeries = (value) => {
      let newValue = value;
      newValue = newValue.replace(/N/g, '-');
      return newValue;
    };

    return { formatMiniSeries };
  },
};
</script>

<style scoped>
h2 {
  grid-area: 1 / 1 / 2 / 3;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;
  font-size: 8vw;
  text-align: center;
  font-family: 'Montserrat';
  font-weight: 900;
}

.emblem-container {
  grid-area: 2 / 1 / 5 / 2;
  margin-top: 20px;
  margin-bottom: 20px;
}

.emblem-container img{
  display: block;
  margin: 0 auto;
  max-width: 30vw;
}

.mini-series {
  letter-spacing: 10px;
  font-family: 'Muli';
  font-weight: 600;
}

.tier-rank {
  font-family: 'Montserrat';
  font-weight: 900;
  text-align: center;
  font-size: 5vw;
  padding-top: 20px;
  grid-area: 2 / 2 / 3 / 3;
}

@media only screen and (min-width: 768px) {
  h2 {
    grid-area: 1 / 1 / 2 / 3;
    font-size: 5vw;
    margin-top: 40px;
  }

  .emblem-container {
    grid-area: 2 / 1 / 3 / 3;
  }

  .tier-rank {
    grid-area: 3 / 1 / 4 / 3;
    font-size: 3.5vw;
    margin-bottom: 5vw;
  }

  .emblem-container img{
    max-width: 300px;
  }
}

</style>
