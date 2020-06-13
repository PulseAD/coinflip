<template>
  <div id="game-history">
    <h2>LAST GAMES</h2>
    <div class="history">
      <div
        class="history-element"
        v-for="history in session.messageHistory"
        :key="history._id"
        :class="obtainClass(history.message)"
        >
        <div>{{ history.message }}</div>
        <div class="right">{{ formatLp(history) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import formatLp from '../helpers/formatLp';

export default {
  props: ['session'],
  setup() {
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

    return { obtainClass, formatLp };
  },
};
</script>

<style scoped>
h2 {
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 5vw;
  color: #fff;
  font-size: 5vw;
  font-family: 'Montserrat';
  font-weight: 900;
}

.history {
  margin: 0px 5vw;
}

.history-element {
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 4vw;
  font-family: 'Montserrat';
  font-weight: 900;
  text-transform: uppercase;
  padding: 15px 20px;
  margin: 10px 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.defeat {
  background-color: #D76161;
}

.victory {
  background-color: #566BB2;
}

#game-history {
  grid-area: 6 / 1 / 7 / 3;
}

@media only screen and (min-width: 768px) {
  #game-history {
    grid-area: 1 / 3 / 4 / 5;
  }

  h2 {
    font-size: 3vw;
    margin-top: 30px;
    margin-bottom: 40px;
    margin-left: 0px;
    text-align: center;
  }

  .history {
    margin: 100px 7vw;
  }

  .history-element {
    font-size: 1.5vw;
    margin: 20px 0px;
    padding: 20px 20px;
  }

}
</style>
