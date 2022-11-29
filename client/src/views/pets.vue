<template>
  <div class="pets">
    <div class="pets__sidebar">
      <div class="pets__sidebar-text">
        现已收集
        <span class="pets_sidebar--number">{{ pets.length }}</span>
        种{{ searchAttribute ? searchAttribute + '系' : '' }}宠物
      </div>
      <div class="pets__sidebar-nav">
        <button
          :class="[
            searchAttribute === '神'
              ? 'btn__pets--godactive'
              : 'btn__pets--god',
            'btn__pets--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          神
        </button>
        <button
          :class="[
            searchAttribute === '金'
              ? 'btn__pets--metalactive'
              : 'btn__pets--metal',
            'btn__pets--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          金
        </button>
        <button
          :class="[
            searchAttribute === '木'
              ? 'btn__pets--woodactive'
              : 'btn__pets--wood',
            'btn__pets--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          木
        </button>
        <button
          :class="[
            searchAttribute === '水'
              ? 'btn__pets--wateractive'
              : 'btn__pets--water',
            'btn__pets--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          水
        </button>
        <button
          :class="[
            searchAttribute === '火'
              ? 'btn__pets--fireactive'
              : 'btn__pets--fire',
            'btn__pets--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          火
        </button>
        <button
          :class="[
            searchAttribute === '土'
              ? 'btn__pets--earthactive'
              : 'btn__pets--earth',
            'btn__pets--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          土
        </button>
        <button
          class="btn__pets--reset btn__pets--rectangle"
          @click="handleBtnPetsClick"
        >
          所有
        </button>
      </div>
    </div>
    <div class="pets__content">
      <div
        v-for="item in pets"
        :key="item._id"
        class="portrait pets__content-item"
        @click="handlePortraitClick(item.name)"
      >
        <div class="portrait-img">
          <img
            :src="`${imgDir.portrait}/${item.photo}`"
            loading="lazy"
            :alt="item.name"
          />
        </div>
        <div class="portrait-text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { IRootState } from '@/store/type'
export default defineComponent({
  name: 'pets',
  setup() {
    const store = useStore<IRootState>()
    const router = useRouter()
    let searchAttribute = ref('神')
    const imgDir = store.state.imgDir
    const pets = computed(() => {
      if (searchAttribute.value)
        return store.state.pets.filter(
          (item) => item.attribute === searchAttribute.value
        )
      return store.state.pets
    })

    const handleBtnPetsClick = (e: Event) => {
      const dom = e.currentTarget as HTMLElement
      searchAttribute.value = dom.innerText === '所有' ? '' : dom.innerText
    }

    const handlePortraitClick = (name: string) => {
      router.push(`/pet/${name}`)
    }

    return {
      imgDir,
      searchAttribute,
      pets,
      handleBtnPetsClick,
      handlePortraitClick
    }
  }
})
</script>
