<template>
  <div class="home">
    <div>
      <h1>CHOOSE</h1>
      <h1>YOUR SIDE</h1>
    </div>
    <div class="row">
      <div class="column left">
        <div class="img-container">
          <img src="../assets/blue-inib.png" alt="blue-inib" title="blue-inib" />
        </div>
        <h2>BLUE SIDE</h2>
      </div>
      <div class="column right">
        <div class="img-container">
          <img src="../assets/red-inib.png" alt="red-inib" title="red-inib" />
        </div>
        <h2>RED SIDE</h2>
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
    const router = useRouter();
    const store = useStore();


    const validate = () => {
      if (isDisabled.value) {
        return;
      }
      retrieveSession();
    };

    return {
    };
  },
};
</script>

<style scoped>
</style>
