<template>
  <div class="pet" v-if="pet">
    <div class="pet__btn--back" @click="$router.back()">
      <div class="arrow--left"></div>
    </div>
    <div class="pet__graph--1">
      <div class="pet__img--exhibition">
        <img
          :src="`${imgDir.exhibition}/${pet.photo}`"
          loading="lazy"
          :alt="pet.name"
        />
      </div>
      <div class="pet__detail">
        <div class="pet__detail--name">{{ pet.name }}</div>
        <div class="pet__detail--attribute">五行：{{ pet.attribute }}</div>
        <div class="pet__detail--rank">阶数：{{ pet.rank }}</div>
        <div class="pet__detail--access" v-if="pet.access">
          获取途径：{{ pet.access }}
        </div>
        <div class="pet__detail--formula" v-if="pet.formula">
          合成公式： {{ pet.formula }}
        </div>
        <div class="pet__detail--reward" v-if="pet.reward">
          专属奖励：{{ pet.reward }}
        </div>
        <div class="pet__detail--magic" v-if="pet.magic.length">
          <div class="magic-title">专属技能：</div>
          <div v-for="item in pet.magic" :key="item.name" class="magic-item">
            <span>{{ item.name }}：{{ item.description }}</span>
          </div>
        </div>
        <div class="pet__detail--story" v-if="pet.story">
          <div class="story-title">宠物故事：</div>
          <div
            v-for="item in pet.story.split('\n')"
            :key="item"
            class="story-item"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="pet__graph-phone--1"
      v-if="pet.formula || pet.reward || pet.story || pet.magic.length"
    >
      <div v-if="pet.formula">
        <div>合成公式：</div>
        <div v-for="item in pet.formula.split('；')" :key="item">
          {{ item }}
        </div>
      </div>
      <div v-if="pet.reward">
        <div>专属奖励：</div>
        <div>{{ pet.reward }}</div>
      </div>
      <div v-if="pet.magic.length">
        <div>专属技能：</div>
        <div v-for="item in pet.magic" :key="item.name" class="magic-item">
          <span>{{ item.name }}：{{ item.description }}</span>
        </div>
      </div>
      <div v-if="pet.story">
        <div>宠物故事：</div>
        <div
          v-for="item in pet.story.split('\n')"
          :key="item"
          style="line-height: 26px"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="pet__graph--2">
      <div class="pet__img--prepare">
        <img
          :src="`${imgDir.prepare}/${pet.photo}`"
          loading="lazy"
          :alt="pet.name"
        />
        <span>常规动作</span>
      </div>
      <div class="pet__img--attack">
        <img
          :src="`${imgDir.attack}/${pet.photo}`"
          loading="lazy"
          :alt="pet.name"
        />
        <span>攻击动作</span>
      </div>
      <div class="pet__img--magic">
        <img
          :src="`${imgDir.magic}/${pet.photo}`"
          loading="lazy"
          :alt="pet.name"
        />
        <span>施法动作</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getAllPets } from '@/service/pet'
import { IRootState, Tpet } from '@/store/type'
export default defineComponent({
  name: 'pet',
  setup() {
    const route = useRoute()
    const store = useStore<IRootState>()
    const imgDir = store.state.imgDir
    const name = route.params.name as string
    let pet = ref<Tpet>()

    getAllPets(`?name=${name}`).then(
      (res) => {
        if (res.status === 'success' && res.results === 1) {
          pet.value = (res.data as Tpet[])[0]
        } else if (res.status === 'success' && !res.results) {
          console.log(`${res.status}: 没有找到对应宠物详情！`)
        } else {
          console.log(`${res.status}: ${res.message}`)
        }
      },
      (err) => {
        console.log(err.message)
      }
    )

    return {
      imgDir,
      name,
      pet
    }
  }
})
</script>
