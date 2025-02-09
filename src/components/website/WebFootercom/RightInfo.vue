<script setup lang="ts">
import { useStoreRef as useStoreReference } from '~/hooks/useStoreRef'
import { UIStore } from '~/stores/ui'

import { Dark, Light } from '~/components/icons/index'

const { isDark, toggleDark } = useStoreReference(UIStore)
</script>

<template>
    <div class="mt-12 space-y-3 text-center md:mt-6 md:text-left">
      <p>
        <span>邮箱：zhouzw1302@163.com</span>
      </p>
      <p class=" flex">
        <p>主题：</p>
        <button class="flex justify-center" @click="() => void toggleDark()">
            <div class="m-auto">
              <light v-if="!isDark" />
              <dark v-else />
            </div>
        </button>
      </p>
    </div>
</template>
