<template>
  <div class="home">
    <div class="row">
      <div class="column left">
        <div class="img-container">
          <img
            src="../assets/CHALLENGER.png"
            alt="Challenger emblem"
            title="Challenger emblem"
          />
        </div>
      </div>
      <div class="column right">
        <h1>REACH CHALLENGER</h1>
        <p>Retrieve your League of Legends account with your current rank</p>
        <p>Before starting the game you will need to choose between red and blue side</p>
        <p>A side will be randomly selected as winner</p>
        <p>Try to climb the ladder starting at your current rank</p>
        <p>As you climb you will be able to spam games more and you will climb more easily</p>
      </div>
    </div>
    <form class="row" @submit.prevent="validate()" autocomplete="off">
      <div class="column left">
        <div class="form-container">
          <div class="input-container username">
            <label for="username">Username</label>
            <input id="username" v-model="username" type="text" />
          </div>
          <div class="input-container server">
            <label for="server">Server</label>
            <select id="server" v-model="server">
              <option v-for="server in availableServers" :key="server.value" :value="server.value">
                {{ server.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="column right">
        <a
          class="button"
          role="button"
          :class="{ disabled: isDisabled }"
          @click="validate()"
          >
          PLAY
        </a>
      </div>
    </form>
    <div class="error-container">
      <p v-if="errorMessage"><span>{{ errorMessage }}</span></p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  setup() {
    const server = ref('euw1');
    const username = ref('');
    const isDisabled = computed(() => username.value.length < 1);
    const router = useRouter();
    const store = useStore();
    const errorMessage = ref(null);

    const availableServers = ref([
      { name: 'EUW', value: 'euw1' },
      { name: 'NA', value: 'na1' },
      { name: 'EUNE', value: 'eun1' },
      { name: 'TR', value: 'tr1' },
      { name: 'RU', value: 'ru' },
      { name: 'KR', value: 'kr' },
    ]);

    const retrieveSession = async () => {
      try {
        await store.dispatch('fetchSession', { server: server.value, username: username.value });
        const session = store.getters.getSession;
        router.push({ name: 'Dashboard', params: { sessionId: session._id } });
      } catch (error) {
        errorMessage.value = 'That username was not found on that server';
      }
    };

    const validate = () => {
      if (isDisabled.value) {
        return;
      }
      retrieveSession();
    };

    return {
      server,
      username,
      isDisabled,
      validate,
      availableServers,
      errorMessage,
    };
  },
};
</script>

<style scoped>

.img-container {
  margin-top: 140px;
  margin-bottom: 60px;
}

.img-container img{
  display: block;
  margin: 0 auto;
  max-width: 400px;
}

.form-container {
  font-family: Muli;
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 40px;
}

.input-container {
  background-color: #D7D9CE;
  padding: 10px;
  margin: 0px 5px;
}

.input-container label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.input-container input, select {
  background-color: #D7D9CE;
  border:0;
  font-size: 36px;
}

h1 {
  font-family: Montserrat;
  font-size: 48px;
  color: #fff;
  font-weight: 900;
  text-align: center;
  margin-top: 70px;
  margin-bottom: 80px;
}

p {
  margin: 20px 50px;
  font-family: Muli;
  color: white;
  font-size: 24px;
}

.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.error-container p{
  color: #fff;
  font-size: 36px;
  text-align: center;
}

.error-container p span {
  padding: 10px 100px;
  background-color: #811029;
}

</style>
