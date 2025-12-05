import {postType} from './postType'
import {projectType} from './projectType'
import {serviceType} from './serviceType'
import {homepageType} from './homepageType'
import {localeString} from './objects/localeString'
import {localeText} from './objects/localeText'
import {localeBlockContent} from './objects/localeBlockContent'

export const schemaTypes = [
  localeString,
  localeText,
  localeBlockContent,
  postType,
  projectType,
  serviceType,
  homepageType,
]
