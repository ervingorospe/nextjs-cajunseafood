import _ from 'lodash'

const sectionThemes = {
  light: 'light-theme',
  dark: 'dark-theme'
}

const arrLightTheme = ['primary-100','primary-200','primary-300','primary-400','primary-500','secondary-500','white','gray-50','gray-100','gray-200','gray-300','primary-600']
const arrDarkTheme = ['gray-400','gray-500','gray-600','gray-700','gray-800','gray-900','black','primary-700','primary-800','primary-900']

const defaultDarkTheme = ['hero-custom', 'hero-centered', 'hero-banner', 'hero-image-right', 'hero-image-left','hero-centered-form','hero-form-right']
const defaultLightTheme = ['default', 'form-right-detached-title', 'about']

const setDefaultHeaderColor = (sectionType) => {
  if (_.includes(defaultLightTheme, sectionType))
    return sectionThemes.light
  
  if (_.includes(defaultDarkTheme, sectionType))
    return sectionThemes.dark
}

const setHeaderColor = (sectionBgColor) => {
  if (_.includes(arrLightTheme, sectionBgColor))
    return sectionThemes.light
  
  if (_.includes(arrDarkTheme, sectionBgColor))
    return sectionThemes.dark
}

const setSectionColor = (sectionBgColor) => {
  if(!sectionBgColor) {
    return sectionThemes.light
  }

  if (_.includes(arrLightTheme, sectionBgColor))
    return sectionThemes.light
  
  if (_.includes(arrDarkTheme, sectionBgColor))
    return sectionThemes.dark
}

export {
  sectionThemes,
  setDefaultHeaderColor,
  setHeaderColor,
  setSectionColor
}