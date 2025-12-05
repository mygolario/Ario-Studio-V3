import {defineType} from 'sanity'

export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    {name: 'en', title: 'English', type: 'array', of: [{type: 'block'}]},
    {name: 'fa', title: 'فارسی', type: 'array', of: [{type: 'block'}]},
  ],
})

