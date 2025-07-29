import { createStore, Store } from 'vuex';

export interface BankState {
  balance: number;
}

const state: BankState = {
  balance: 0,
};

export default createStore({
  state,
  mutations: {
    addMoney(state: BankState, amount: number) {
      state.balance += amount;
    },
    withdrawMoney(state: BankState, amount: number) {
      state.balance -= amount;
    },
  },
  actions: {
    addMoney({ commit }: { commit: Function }, amount: number) {
      commit('addMoney', amount);
    },
    withdrawMoney({ commit }: { commit: Function }, amount: number) {
      commit('withdrawMoney', amount);
    },
  },
  getters: {
    balance(state: BankState): number {
      return state.balance;
    },
    simpleInterest: (state: BankState) => (rate: number, years: number): number => {
      return state.balance * (1 + rate * years);
    },
    compoundInterest: (state: BankState) => (rate: number, years: number, n: number = 1): number => {
      return state.balance * Math.pow(1 + rate / n, n * years);
    },
  },
}); 