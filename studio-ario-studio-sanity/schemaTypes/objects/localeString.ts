import {defineType} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {name: 'en', title: 'English', type: 'string'},
    {name: 'fa', title: 'فارسی', type: 'string'},
  ],
})

