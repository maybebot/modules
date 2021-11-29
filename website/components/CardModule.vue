<template>
  <div class="relative flex flex-col group p-5 nuxt-card-border nuxt-card-bg nuxt-text-default rounded-lg transition-transform duration-150 ease-in-out transform">
    <a
      :href="mod.website"
      :aria-label="mod.website"
      target="_blank"
      rel="noopener"
      class="absolute inset-0"
    >
      <div
        class="transition-opacity duration-200 ease-in-out rounded-full opacity-0 group-hover:opacity-100 absolute top-3 right-3 cursor-pointer"
      >
        <UnoIcon
          class="i-carbon-arrow-up-right text-xl leading-none !block group-hover:text-primary-800 dark:group-hover:text-white"
        />
      </div>
    </a>

    <div class="flex items-start w-full h-20">
      <div
        class="relative border  bg-white border-gray-200 dark:bg-secondary-dark dark:border-secondary-dark w-20 h-20 rounded-lg flex flex-none items-center justify-center"
      >
        <!-- TODO: use <nuxt-img> -->
        <img
          v-if="!coverError && mod.icon"
          :src="mod.icon"
          :alt="mod.name"
          class="w-10 h-10 object-contain"
          width="40px"
          height="40px"
          @error="coverError = true"
        >
        <UnoIcon v-else :class="iconPlaceholder(mod)" class="text-4xl opacity-20" />
      </div>
      <div class="ml-6 w-full h-full">
        <h2
          class="flex text-lg font-semibold items-center dark:text-white h-9 line-2 leading-tight"
        >
          <span>{{ mod.name }}</span>
          <UnoIcon
            v-if="mod.type === 'official'"
            v-tooltip="{ content: 'Official',classes: tooltipClass }"
            class="i-carbon-badge text-yellow-600 text-lg ml-1 my-auto opacity-85"
          />
        </h2>
        <h3>
          {{ extractHostname(mod.url) }}
        </h3>
      </div>
    </div>

    <div class="h-20 mt-4">
      <p
        class="text-sky-dark dark:text-white dark:opacity-85 text-sm font-normal line-clamp-3 mt-2"
      >
        {{ mod.description }}
      </p>
    </div>

    <div class="flex w-full z-30 relative">
      <div class="flex flex-none">
        <a
          :href="mod.url"
          aria-label="stars"
          target=" _blank"
          rel="noopener"
          class="flex whitespace-nowrap w-full mr-4 text-sky-dark hover:text-gray-400 dark:hover:text-secondary-lighter dark:text-white"
        >
          <UnoIcon class="mr-2 i-carbon-download" />
          <div class="text-sm leading-5 font-medium truncate">
            <span
              class="hidden md:inline-block"
            >Go to website and install</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModuleInfo, MaintainerInfo } from '~/../lib/types'
import { numberFormatter } from '~/utils/format'
import { CATEGORIES_ICONS } from '~/composables/constants'

defineProps<{ mod: ModuleInfo }>()

const coverError = ref(false)

interface CompatibilityData {
  statusText: string
  icon: string | null
  color: string
  class?: string
}

const tagMap = Object.fromEntries(VERSIONS.map(v => [v.key, { tagText: v.label }]))
const supportMap = {
  supported: { supportText: 'Supported', supportIcon: 'i-carbon-checkmark', color: '#1aa346', cssClass: '' },
  notSupported: { supportText: 'Not supported', supportIcon: 'i-carbon-help', color: '#61626c', cssClass: 'opacity-85' },
  wip: { supportText: 'Work in progress', supportIcon: 'i-carbon-time', color: '#c4930a', cssClass: '' }
}
const useModuleComptatibility = (mod: ModuleInfo) => {
  return ['2.x', '2.x-bridge', '3.x'].map(tag => ({
    tag,
    ...tagMap[tag],
    ...(mod.tags.includes(tag) ? supportMap.supported : supportMap.notSupported)
  }))
}

const tooltipClass = 'bg-secondary-dark text-white px-2 py-1 m-1 rounded text-sm shadow'

function numberFormat (num: number, options = { precision: 1 }) {
  return numberFormatter(num, options)
}

function extractHostname (url: string) {
  const { hostname } = new URL(url)
  return hostname
}

function iconPlaceholder ({ category }: ModuleInfo) {
  return CATEGORIES_ICONS[category] || 'i-carbon-circle-dash'
}

function npmUrl ({ npm }: ModuleInfo) {
  return `https://npmjs.com/package/${npm}`
}
</script>
