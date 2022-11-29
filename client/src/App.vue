<template>
  <header class="header">
    <router-link to="/pets" class="header__title">
      口袋精灵2宠物图鉴
    </router-link>
  </header>
  <main class="content">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive"></component>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive"></component>
    </router-view>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    store.dispatch('getPetsByLocalCache', { fields: 'name,attribute,photo' })
  }
})
</script>
