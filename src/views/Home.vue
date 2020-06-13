<template>
  <div class="home">
    <div class="title-container">
      <h1>REACH CHALLENGER</h1>
      <div class="img-container">
        <img
          src="../assets/CHALLENGER.png"
          alt="Challenger emblem"
          title="Challenger emblem"
        />
      </div>
    </div>
    <div class="form-container">
      <form @submit.prevent="validate()" autocomplete="off">
        <div class="error-container">
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>
        <div class="input-container username" v-if="!isRetrievingSession">
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" />
        </div>
        <div class="input-container server" v-if="!isRetrievingSession">
          <label for="server">Server</label>
          <select id="server" v-model="server">
            <option v-for="server in availableServers" :key="server.value" :value="server.value">
              {{ server.name }}
            </option>
          </select>
        </div>
        <div class="input-container" v-if="isRetrievingSession">
          <label for="sessionId">Session Id</label>
          <input id="sessionId" v-model="sessionId" type="text" />
        </div>
        <div class="button-container">
          <a
            class="button"
            role="button"
            :class="{ disabled: isDisabled }"
            @click="validate()"
            >
            <div class="small-loader" v-if="isLoading"></div>
            <template v-else>PLAY</template>
          </a>
        </div>
        <p class="existing-session" @click="toggleIsRetrievingSession()">
          {{ isRetrievingSession ? 'Create a new session' : 'I already have a session!' }}
        </p>
      </form>
    </div>
    <div class="text-container">
      <p>Retrieve your League of Legends account with your current soloQ rank</p>
      <p>Play games choosing between red and blue side</p>
      <p>A side will be randomly selected as winner</p>
      <p>Try to be lucky and climb the ladder</p>
      <p>Once Master+, you unlock Grand Master by reaching 350 LP and Challenger with 700 LP</p>
      <p>Good luck!</p>
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
    const sessionId = ref('');
    const router = useRouter();
    const store = useStore();
    const errorMessage = ref(null);
    const isRetrievingSession = ref(false);
    const isLoading = ref(false);

    const isDisabled = computed(() => {
      if (isRetrievingSession.value) {
        return sessionId.value.length < 5;
      }
      return username.value.length < 1;
    });

    const availableServers = ref([
      { name: 'EUW', value: 'euw1' },
      { name: 'NA', value: 'na1' },
      { name: 'EUNE', value: 'eun1' },
      { name: 'TR', value: 'tr1' },
      { name: 'RU', value: 'ru' },
      { name: 'KR', value: 'kr' },
      { name: 'JP', value: 'jp1' },
      { name: 'LA1', value: 'la1' },
      { name: 'LA2', value: 'la2' },
      { name: 'OCE', value: 'oc1' },
      { name: 'BR', value: 'br1' },
    ]);

    const createNewSession = async () => {
      try {
        isLoading.value = true;
        await store.dispatch('createSession', { server: server.value, username: username.value });
        isLoading.value = false;
        const session = store.getters.getSession;
        router.push({ name: 'Dashboard', params: { sessionId: session._id } });
      } catch (error) {
        isLoading.value = false;
        errorMessage.value = 'That username was not found on that server';
      }
    };

    const retrieveSession = async () => {
      try {
        isLoading.value = true;
        await store.dispatch('retrieveSession', sessionId.value);
        isLoading.value = false;
        const session = store.getters.getSession;
        router.push({ name: 'Dashboard', params: { sessionId: session._id } });
      } catch (error) {
        isLoading.value = false;
        errorMessage.value = 'We were not able to retrieve that session';
      }
    };

    const validate = () => {
      if (isDisabled.value) {
        return;
      }
      if (isRetrievingSession.value) {
        retrieveSession();
        return;
      }
      createNewSession();
    };

    const toggleIsRetrievingSession = () => {
      isRetrievingSession.value = !isRetrievingSession.value;
    };

    return {
      server,
      username,
      isDisabled,
      validate,
      availableServers,
      errorMessage,
      isRetrievingSession,
      toggleIsRetrievingSession,
      sessionId,
      isLoading,
    };
  },
};
</script>

<style scoped>

.home {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* grid-template-rows: repeat(2, 1fr); */
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.title-container {
  grid-area: 1 / 1 / 2 / 2;
}

.form-container {
  grid-area: 1 / 2 / 3 / 3;
}

.text-container {
  grid-area: 2 / 1 / 3 / 2;
}

.img-container {
  margin-top: 30px;
  margin-bottom: 20px;
}

.img-container img{
  display: block;
  margin: 0 auto;
  max-width: 300px;
}

.form-container {
  font-family: Muli;
  margin: 0 auto;
}

.form-container form {
  margin-top: 20%;
}

.existing-session {
  margin-top: 80px;
  color: #fff;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  font-size: 1.5vw;
}

.input-container {
  background-color: #fff;
  padding: 10px;
  margin: 60px 0px;
}

.input-container label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.input-container input, select {
  background-color: #fff;
  border:0;
  font-size: 3vw;
  width: 100%;
}

h1 {
  font-family: Montserrat;
  font-size: 3.5vw;
  color: #fff;
  font-weight: 900;
  text-align: center;
  margin-top: 70px;
  margin-bottom: 30px;
}

.text-container p {
  margin: 20px 50px;
  font-family: Muli;
  color: #fff;
  font-size: 1.5vw;
}

.button-container {
  margin-top: 100px;
}

.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.error-container p{
  color: #fff;
  font-size: 1.5vw;
  text-align: center;
  background-color: #811029;
  padding: 15px 0px;
}

.error-container p span {
  padding: 10px 100px;
}

.small-loader {
  margin: 0 auto;
}

@media only screen and (max-width: 768px) {
  .home {
    display: initial;
  }

  .img-container img{
    max-width: 30vw;
  }

  .form-container form {
    margin-top: 0px;
  }

  .error-container p {
    font-size: 3.5vw;
  }

  .text-container p {
    font-size: 3.5vw;
  }

  p.existing-session {
    font-size: 3.5vw;
    margin-top: 20px;
    margin-bottom: 60px;
  }

  .button {
    font-size: 12vw;
  }

  .input-container input, select {
    font-size: 6vw;
  }

  h1 {
    margin-top: 20px;
    font-size: 6vw;
  }

  form {
    padding: 0px 20px;
  }

  .input-container {
    margin: 30px 0px;
  }

  .button-container {
    margin-top: 30px;
  }

  #nav a{
    font-size: 12px;
  }

  .text-container {
    padding-bottom: 20px;
  }
}

</style>
