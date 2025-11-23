import { type SchemaTypeDefinition } from 'sanity'
import { homePage } from './homePage'
import { project } from './project'
import { service } from './service'
import { settings } from './settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, project, service, settings],
}
