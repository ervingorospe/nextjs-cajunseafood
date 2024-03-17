import { cache } from 'react';
import _ from 'lodash'
// function
import { formatRouteName } from './formatting'
// api
import { getCollection } from '@/api/collection'
import { getItem } from '@/api/item'

const ids = {
  navigation: 30526,
  actionButtons: 30499
}

const getNavigation = cache(async () => {
  const collections = await getCollection(ids.navigation)
  return collections[0].items
})

const generateStaticRoutes = cache(async () => {
  const navigations = await getNavigation()

  const paths = await Promise.all(navigations?.map(async data => {
    const parentSlug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : data.name

    if (data.parentId !== 0) {
      const items = await getItem(data.parentId)
      const parentRoute = formatRouteName(_.get(items[0], 'fields.slug') ? _.get(items[0], 'fields.slug') : _.get(items[0], 'name'))

      if (_.get(items[0], 'parentId') !== 0) {
        const mainParent = await getItem(_.get(items[0], 'parentId'))
        const mainParentRoute = formatRouteName(_.get(mainParent[0], 'fields.slug') ? _.get(mainParent[0], 'fields.slug') : _.get(mainParent[0], 'name'))

        return {
          slug: [`${mainParentRoute}`,`${parentRoute}`,`${formatRouteName(parentSlug)}`]
        }
      }

      return {
        slug: [`${parentRoute}`,`${formatRouteName(parentSlug)}`]
      }
    }
    
    return {
      slug: [`${formatRouteName(parentSlug)}`]
    }
  }))

  return paths
})

const getNavigationDetails = cache(async () => {
  const navigations = await getNavigation()

  const paths = await Promise.all(navigations?.map(async data => {
    const parentSlug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : data.name

    if (data.parentId !== 0) {
      const items = await getItem(data.parentId)
      const parentRoute = formatRouteName(_.get(items[0], 'fields.slug') ? _.get(items[0], 'fields.slug') : _.get(items[0], 'name'))

      if (_.get(items[0], 'parentId') !== 0) {
        const mainParent = await getItem(_.get(items[0], 'parentId'))
        const mainParentRoute = formatRouteName(_.get(mainParent[0], 'fields.slug') ? _.get(mainParent[0], 'fields.slug') : _.get(mainParent[0], 'name'))

        return {
          ...data,
          slug: `${mainParentRoute}/${parentRoute}/${formatRouteName(parentSlug)}`,
        }
      }

      return {
        ...data,
        slug: `${parentRoute}/${formatRouteName(parentSlug)}`,
      }
    }

    return {
      ...data,
      slug: formatRouteName(parentSlug),
    }
  }))

  return paths
})

const checkRoute = cache(async (routeName) => {
  if (routeName === '/') {
    routeName = 'home'
  }

  const paths = await getNavigationDetails()
  return _.find(paths, data => data.slug == routeName)
})

const getActionButtons = cache(async () => {
  const temp = await getCollection(ids.actionButtons)
  return temp[0].items
})

export {
  checkRoute,
  generateStaticRoutes,
  getNavigationDetails,
  getActionButtons
}