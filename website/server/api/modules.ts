import { ModuleInfo } from '../../../lib/types'

export default async () => {
  const _modules = await import('../../../npm/modules.json').then(r => r.default || r) as ModuleInfo[]
  const modules = await Promise.all(_modules.map(module => fetchModuleStats(module)))
  return {
    modules
  }
}

function rand (min: number, max: number) {
  return min + Math.round((Math.random() * (max - min)))
}

async function fetchModuleStats (module: ModuleInfo) {
  // TODO: this is quick and dirty, improve if it becomes relevant
  const manifest = await $fetch(module.url + module.manifest)
  const iconUrl = manifest.icons[0].src ?? ''
  if (iconUrl.indexOf('http://') === 0 || iconUrl.indexOf('https://') === 0) {
    module.icon = iconUrl
  } else {
    module.icon = module.url + iconUrl
  }
  module.name = manifest.short_name ?? manifest.name
  module.description = manifest.description

  console.log(module.icon)

  const ghRepo = module.repo.split('#')[0]
  module.downloads = rand(0, 500)
  module.stars = rand(0, 2000)
  module.publishedAt = rand(1_600_000_000_000, 1_630_000_000_000)
  module.createdAt = rand(1_600_000_000_000, 1_630_000_000_000)
  module.contributors = [
    { login: 'nuxt' },
    { login: 'vuejs' },
    { login: 'unjs' }
  ]
  return module
}
