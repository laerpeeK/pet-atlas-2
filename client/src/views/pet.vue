<template>
  <template v-if="pet">
    <div class="pet">
      <div class="btn--back" @click="$router.back()">
        <div class="arrow--left"></div>
      </div>
      <div class="pet-detail">
        <div class="pet-detail__img">
          <img
            :src="`${imgDir.exhibition}/${pet.photo}`"
            loading="lazy"
            :alt="pet.name"
          />
        </div>
        <div class="pet__detail pet-detail__text">
          <div class="text--name">{{ pet.name }}</div>
          <div class="text--attribute">五行：{{ pet.attribute }}</div>
          <div class="text--rank">阶数：{{ pet.rank }}</div>
          <div class="text--access" v-if="pet.access">
            获取途径：{{ pet.access }}
          </div>
          <div class="text--scene" v-if="pet.scene">
            相关场景：{{ pet.scene }}
          </div>
          <div class="text--formula" v-if="pet.formula">
            合成公式： {{ pet.formula }}
          </div>
          <div class="text--reward" v-if="pet.reward">
            专属奖励：{{ pet.reward }}
          </div>
          <div class="text--magic" v-if="pet.magic.length">
            <div class="magic-title">专属技能：</div>
            <div v-for="item in pet.magic" :key="item.name" class="magic-item">
              <span>{{ item.name }}：{{ item.description }}</span>
            </div>
          </div>
          <div class="text--story" v-if="pet.story">
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
        class="pet-detail--phone"
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
      <div class="pet-picture-collection">
        <div>
          <img
            :src="`${imgDir.prepare}/${pet.photo}`"
            loading="lazy"
            :alt="pet.name"
          />
          <span>常规动作</span>
        </div>
        <div>
          <img
            :src="`${imgDir.attack}/${pet.photo}`"
            loading="lazy"
            :alt="pet.name"
          />
          <span>攻击动作</span>
        </div>
        <div>
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
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getAllPets } from '@/service/pet'
import { IRootState, Tpet } from '@/store/type'
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
</script>
