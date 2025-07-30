<template>
  <div class="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div class="max-w-md w-full p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl bg-primary-light border border-primary font-sans">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-3 tracking-tight">Bank Account</h2>
      <p class="mb-6 text-lg sm:text-xl text-primary-dark">Current Balance: <span class="font-bold text-accent">{{ balance }}</span></p>
      
      <!-- Transaction Controls -->
      <div class="flex flex-col sm:flex-row gap-3 mb-8 w-full">
        <input 
          v-model.number="amount" 
          type="number" 
          placeholder="Amount" 
          class="flex-1 min-w-0 px-3 sm:px-4 py-2 text-sm sm:text-base border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white text-primary-dark placeholder-gray-400 transition" 
        />
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button 
            @click="addMoney" 
            class="w-full sm:w-auto bg-primary text-white px-4 sm:px-5 py-2 text-sm sm:text-base rounded-lg font-semibold shadow hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent transition"
          >
            Add Money
          </button>
          <button 
            @click="withdrawMoney" 
            class="w-full sm:w-auto bg-info text-white px-4 sm:px-5 py-2 text-sm sm:text-base rounded-lg font-semibold shadow hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent transition"
          >
            Withdraw
          </button>
        </div>
      </div>
      
      <!-- Interest Calculator -->
      <div class="bg-white rounded-xl p-4 sm:p-6 shadow-inner">
        <h3 class="text-lg sm:text-xl font-bold text-primary-dark mb-3">Interest Calculator</h3>
        
        <!-- Calculator Inputs -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div class="space-y-1">
            <label class="block text-xs font-medium text-primary-dark">Interest Rate</label>
            <input 
              v-model.number="rate" 
              type="number" 
              step="0.01" 
              placeholder="0.05" 
              class="w-full px-3 py-2 text-sm sm:text-base border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-primary-light text-primary-dark placeholder-gray-400 transition" 
            />
            <p class="text-xs text-gray-500">e.g., 0.05 for 5%</p>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-medium text-primary-dark">Time Period</label>
            <input 
              v-model.number="years" 
              type="number" 
              placeholder="1" 
              class="w-full px-3 py-2 text-sm sm:text-base border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-primary-light text-primary-dark placeholder-gray-400 transition" 
            />
            <p class="text-xs text-gray-500">in years</p>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-medium text-primary-dark">Compound Freq.</label>
            <input 
              v-model.number="compoundN" 
              type="number" 
              placeholder="1" 
              class="w-full px-3 py-2 text-sm sm:text-base border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-primary-light text-primary-dark placeholder-gray-400 transition" 
            />
            <p class="text-xs text-gray-500">times per year</p>
          </div>
        </div>
        
        <!-- Results -->
        <div class="space-y-2">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <span class="text-primary-dark text-sm sm:text-base font-medium">Simple Interest:</span>
            <span class="font-bold text-success text-sm sm:text-lg">{{ simpleInterest }}</span>
          </div>
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <span class="text-primary-dark text-sm sm:text-base font-medium">Compound Interest:</span>
            <span class="font-bold text-success text-sm sm:text-lg">{{ compoundInterest }}</span>
          </div>
        </div>
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