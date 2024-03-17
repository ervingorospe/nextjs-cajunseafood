import _ from 'lodash'
import { cache } from 'react';
// function
import { setDefaultHeaderColor, setHeaderColor } from './theme-style'
// api
import { getCollection, generalInfo } from '@/api/collection'
import { getItem } from '@/api/item'
import { getFacebookFeed } from '@/api/social-media'

const ids = {
  callToActionSections: 30522,
  footerLocationInfo: 30495,
  socialMedia: 30497,
  location: 30494,
  settings: 172592
}

const facebookFeed = cache(async (id, limit, token) => {
  return await getFacebookFeed(id, limit, token)
})

const getLocation = cache(async () => {
  return await getCollection(`${ids.location}`)
})

const getGeneralInfo = cache(async () => {
  return await generalInfo()
})

const getSettings = cache(async () => {
  const items = await getItem(ids.settings)
  return items
})

const pageDetails = cache(async (id) => {
  const collection = await getItem(id)

  const { sectionItems } = _.first(collection)
  const firstSection = _.find(_.first(collection).sectionItems, data => data.fields.active === '1')
  const activeSections = _.filter(sectionItems, data => _.get(data, 'fields.active') === '1')

  let themeColor = setDefaultHeaderColor(_.get(firstSection, 'fields.customType') || _.get(firstSection, 'fields.type'));
  
  if (_.get(firstSection, 'fields.backgroundColorClass')) 
    themeColor = setHeaderColor(_.get(firstSection, 'fields.backgroundColorClass') ? _.get(firstSection, 'fields.backgroundColorClass') : 'default')

  if (!themeColor)
    themeColor = 'light-theme' 

  return {
    themeColor,
    activeSections
  }
})

const getCallToAction = cache(async () => {
  const temp = await getCollection(ids.callToActionSections)
  return temp[0].items
})

const getSocialMedia = cache(async () => {
  const temp = await getCollection(ids.socialMedia)
  return temp[0].items
})

const getFooterLocationInfo = cache(async () => {
  const temp = await getCollection(ids.footerLocationInfo)
  return temp[0].items
})

export {
  pageDetails,
  getSettings,
  getCallToAction,
  getSocialMedia,
  getLocation,
  getGeneralInfo,
  getFooterLocationInfo,
  facebookFeed
}