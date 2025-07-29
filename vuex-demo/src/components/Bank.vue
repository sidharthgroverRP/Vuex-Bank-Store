<template>
  <div class="max-w-md mx-auto mt-12 p-10 rounded-2xl shadow-2xl bg-primary-light border border-primary font-sans">
    <h2 class="text-3xl font-extrabold text-primary-dark mb-3 tracking-tight">Bank Account</h2>
    <p class="mb-6 text-xl text-primary-dark">Current Balance: <span class="font-bold text-accent">{{ balance }}</span></p>
    <div class="flex flex-col md:flex-row gap-3 mb-8 w-full">
      <input v-model.number="amount" type="number" placeholder="Amount" class="flex-1 min-w-0 px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white text-primary-dark placeholder-gray-400 transition" />
      <button @click="addMoney" class="w-full md:w-auto bg-primary text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent transition">Add Money</button>
      <button @click="withdrawMoney" class="w-full md:w-auto bg-info text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent transition">Withdraw</button>
    </div>
    
    <div class="bg-white rounded-xl p-6 shadow-inner">
      <h3 class="text-xl font-bold text-primary-dark mb-3">Interest Calculator</h3>
      <div class="flex flex-col md:flex-row gap-3 mb-3">
        <input v-model.number="rate" type="number" step="0.01" placeholder="Rate (e.g. 0.05)" class="flex-1 min-w-0 px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-primary-light text-primary-dark placeholder-gray-400 transition" />
        <input v-model.number="years" type="number" placeholder="Years" class="flex-1 min-w-0 px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-primary-light text-primary-dark placeholder-gray-400 transition" />
        <input v-model.number="compoundN" type="number" placeholder="Compound/Year (n)" class="flex-1 min-w-0 px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-primary-light text-primary-dark placeholder-gray-400 transition" />
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-primary-dark text-lg">Simple Interest: <span class="font-bold text-success">{{ simpleInterest }}</span></p>
        <p class="text-primary-dark text-lg">Compound Interest: <span class="font-bold text-success">{{ compoundInterest }}</span></p>
      </div>
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import type { BankState } from '../store';

export default defineComponent({
  name: 'Bank',
  setup() {
    const store = useStore();
    const amount = ref(0);
    const rate = ref(0.05);
    const years = ref(1);
    const compoundN = ref(1);

    const balance = computed(() => store.getters.balance);
    const simpleInterest = computed(() => store.getters.simpleInterest(rate.value, years.value).toFixed(2));
    const compoundInterest = computed(() => store.getters.compoundInterest(rate.value, years.value, compoundN.value).toFixed(2));

    function addMoney() {
      if (amount.value > 0) {
        store.dispatch('addMoney', amount.value);
      }
    }
    function withdrawMoney() {
      if (amount.value > 0) {
        store.dispatch('withdrawMoney', amount.value);
      }
    }

    return {
      amount,
      rate,
      years,
      compoundN,
      balance,
      simpleInterest,
      compoundInterest,
      addMoney,
      withdrawMoney,
    };
  },
});
</script> 