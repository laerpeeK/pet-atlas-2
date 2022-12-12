<template>
  <div class="pets">
    <div class="pets-sidebar">
      <div class="pets-sidebar__text">
        现已收集
        <span class="text--number">{{ pets.length }}</span>
        种{{ searchAttribute ? searchAttribute + '系' : '' }}宠物
      </div>
      <div class="pets-sidebar__nav">
        <button
          :class="[
            searchAttribute === '神' ? 'btn--godactive' : 'btn--god',
            'btn--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          神
        </button>
        <button
          :class="[
            searchAttribute === '金' ? 'btn--metalactive' : 'btn--metal',
            'btn--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          金
        </button>
        <button
          :class="[
            searchAttribute === '木' ? 'btn--woodactive' : 'btn--wood',
            'btn--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          木
        </button>
        <button
          :class="[
            searchAttribute === '水' ? 'btn--wateractive' : 'btn--water',
            'btn--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          水
        </button>
        <button
          :class="[
            searchAttribute === '火' ? 'btn--fireactive' : 'btn--fire',
            'btn--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          火
        </button>
        <button
          :class="[
            searchAttribute === '土' ? 'btn--earthactive' : 'btn--earth',
            'btn--circle'
          ]"
          @click="handleBtnPetsClick"
        >
          土
        </button>
        <button class="btn--reset btn--rectangle" @click="handleBtnPetsClick">
          所有
        </button>
      </div>
    </div>
    <div class="pets-content">
      <div
        v-for="item in pets"
        :key="item._id"
        class="portrait pets-content__item"
        @click="handlePortraitClick(item.name)"
      >
        <div class="portrait__img">
          <img
            :src="`${imgDir.portrait}/${item.photo}`"
            loading="lazy"
            :alt="item.name"
          />
        </div>
        <div class="portrait__text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { IRootState } from '@/store/type'
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
</script>
