<template>
  <div class="container">
    <div id="contribute">
      <h1>CONTRIBUTE</h1>
      <p>I see that a lot of people like the app thus I am determinated to improve it.</p>
      <p>My objectives:</p>
      <ul>
      <li>Put the application on a real server to make it available 24/24</li>
      <li>Add translations for more languages</li>
      <li>Add more rewards</li>
      <li>Implement mini games which could increase your winrate</li>
      <li>Add context sentences after each game</li>
      </ul>
      <p>If you like the project, feel free to contribute to it :p</p>
      <a class="button" :href="getSupportUrl" target="_blank">CONTRIBUTE</a>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  setup() {
    const getSupportUrl = computed(() => 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BNF2N93FX8YZU&source=url');
    return { getSupportUrl };
  },
};
</script>

<style>
.container {
  padding-bottom: 20px;
  font-family: 'Muli';
  max-width: 1000px;
  margin: 0 auto;
}

#contribute {
  margin: 20px;
}

h1 {
  font-family: 'Montserrat';
  text-align: center;
  font-size: 4vw;
}

p, ul {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 3.5vw;
}

ul {
  list-style-type: circle;
  margin-left: 30px;
}

.button {
  margin-top: 30px;
}

@media only screen and (min-width: 768px) {
  h1 {
    font-family: 'Montserrat';
    text-align: center;
    font-size: 30px;
  }

  p, ul {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 25px;
  }

  .button {
    margin-top: 60px;
  }

}
</style>
