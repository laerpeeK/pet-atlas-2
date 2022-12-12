import { createStore } from 'vuex'
import type { Tpet, IRootState } from './type'
import { getAllPets } from '@/service/pet'
import localCache from '@/utils/localCache'

export default createStore<IRootState>({
  state: {
    pets: [],
    imgDir: {
      portrait: `${process.env.VUE_APP_BASE_URL}/img/pet/portrait`,
      attack: `${process.env.VUE_APP_BASE_URL}/img/pet/attack`,
      exhibition: `${process.env.VUE_APP_BASE_URL}/img/pet/exhibition`,
      magic: `${process.env.VUE_APP_BASE_URL}/img/pet/magic`,
      prepare: `${process.env.VUE_APP_BASE_URL}/img/pet/prepare`
    }
  },
  mutations: {
    changePets(state, pets: Tpet[]) {
      state.pets = pets
    }
  },
  actions: {
    async getPetsByNet({ commit }, payload?) {
      let query = ''
      if (payload !== undefined) {
        query += '?'
        for (const i of Object.keys(payload)) {
          query += `${i}=${payload[i]}&`
        }
        query.slice(-1)
      }
      const result = await getAllPets(query)
      if (result.status === 'success') {
        commit('changePets', result.data)
        localCache.setLocalCache('pets', result.data)
        localCache.setLocalCache('petsv', '1.0.6')
      }
    },
    async getPetsByLocalCache({ commit, dispatch }, payload) {
      const petsv = localCache.getLocalCache('petsv') as string
      const pets = localCache.getLocalCache('pets') as Tpet[]
      if (pets?.length > 0 && petsv?.match(/1.0.6/)) {
        commit('changePets', pets)
      } else {
        localCache.deleteLocalCache('pets')
        localCache.deleteLocalCache('petsv')
        dispatch('getPetsByNet', payload)
      }
    }
  },
  modules: {}
})
