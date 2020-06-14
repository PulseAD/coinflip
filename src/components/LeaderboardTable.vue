<template>
  <table>
    <tr>
      <th>#</th>
      <th>Summoner</th>
      <th>Score</th>
      <th>Wins / Loses</th>
    </tr>
    <tr v-for="(item, i) in leaderboard" :key="item">
      <td>{{ i + 1 }}</td>
      <td>{{ item.summonerName }}</td>
      <td>{{ item.score }}</td>
      <td>{{ item.winNumber }} / {{ item.looseNumber }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ['leaderboard'],
};
</script>

<style>

td, th {
  padding: 15px 15px;
}

tr:nth-child(even) {
  background-color: rgb(224, 223, 223);
}

tr:nth-child(odd) {
  background-color: rgb(167, 167, 167);
}

@media only screen and (min-width: 768px) {
  td, th {
    padding: 20px 15px;
  }
}
</style>
