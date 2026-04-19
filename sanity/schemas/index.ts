// Sanity schema barrel. Import from sanity.config.ts via:
//   import { schemaTypes } from './schemas'

import siteConfig from './siteConfig'
import service from './service'
import review from './review'

export const schemaTypes = [siteConfig, service, review]
