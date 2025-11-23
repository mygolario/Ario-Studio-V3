import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    hero,
    intro,
    servicesPrimary,
    strengths,
    evolution,
    servicesSecondary,
    identityHighlight,
    portfolioHighlight[]->{
      title,
      slug,
      year,
      coverImage,
      shortDescriptionFa,
      shortDescriptionEn
    }
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]
`
