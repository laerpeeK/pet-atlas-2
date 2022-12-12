<template>
  <header class="header">
    <router-link to="/pets" class="header-title">
      口袋精灵2宠物图鉴
    </router-link>
  </header>
  <main class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive"></component>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive"></component>
    </router-view>
  </main>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'
import type { IRootState } from './store/type'
const store = useStore<IRootState>()
store.dispatch('getPetsByLocalCache', { fields: 'name,attribute,photo' })
</script>
