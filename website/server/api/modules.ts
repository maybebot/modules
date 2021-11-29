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

function fetchModuleStats (module: ModuleInfo) {
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
