'use client'

import { usePathname } from 'next/navigation';
import _ from 'lodash'
import Link from 'next/link';
// function
import { sectionsComponent, formatComponentName } from '@/function/formatting'
// component
import * as FooterSection from '@/components/layouts/location-info'
import { ButtonLink } from '@/components/layouts/functions'
import { LocationCard } from '@/components/layouts'
//layouts
import { Container } from '@/app/layouts'


export function FooterContent({ navigation, locationInfo, location, socialMedia, general }) {
  let pathname = usePathname();

  if (pathname === '/') {
    pathname = '/home'
  }

  const navDetails = _.find(navigation, data => `/${data.slug}` === pathname)
  const defaultLocationInfo = _.find(location, data => data.name === 'Location Info')
  const filterNavigation = _.filter(navigation, data => _.get(data, 'fields.showInNavigation'))
  const filterLocation = _.filter(location, data => data.name !== 'Location Info')

  if (!_.get(navDetails, 'fields.hideFooter')) {
    return (
      <footer className="relative z-1 bg-primary-700 pb-24 pt-12">
        <Container width="max-w-screen-xl" margin="default" className="space-y-16">
          {/* locations */}
          <Locations filterLocation={filterLocation}/>

          {/* location info */}
          {
            !_.get(navDetails, 'fields.hideFooterLocationInfo') && (
              <LocationInfo locationInfo={locationInfo} navigation={navigation} socialMedia={socialMedia} defaultLocationInfo={defaultLocationInfo}/>
            )
          }

          {/* navigation */}
          <Nav filterNavigation={filterNavigation} navigation={navigation}/>

          {/* Logos */}
          <Logos general={general}/>
        </Container>
      </footer>
    )
  }
}

const Locations = ({ filterLocation }) => {
  return (
    filterLocation.length > 0 && (
      <div>
        <p className="text-center font-heading text-4xl font-semibold text-white md:text-5xl">Our Locations</p>
        <div className="mt-6 grid gap-3 md:mt-7 md:grid-cols-2 xl:grid-cols-4">
          {
            filterLocation?.map(item => (
              <LocationCard data={item} key={item.name}/>
            ))
          }
        </div>
      </div>
    )
  )
}

const LocationInfo = ({ locationInfo, navigation, socialMedia, defaultLocationInfo }) => {
  return (
    <div className="space-y-5 lg:flex lg:justify-between lg:space-y-0">
      {
        locationInfo?.map((item, i) => {
          const componentName = sectionsComponent(item)
          
          if (componentName && _.get(item, 'fields.active')) {
            const ComponentType = FooterSection[formatComponentName(componentName)]

            if (ComponentType) {
              return <ComponentType 
                navigation={navigation}
                data={item} 
                socialMedia={socialMedia} 
                key={i}
                location={defaultLocationInfo}
                styles={{
                  title: 'text-lg text-center lg:text-left font-medium uppercase tracking-wide text-secondary-300',
                  contentText: 'mt-3 text-center lg:text-left text-lg text-secondary-200',
                  link: 'text-white hover:text-secondary-300',
                  buttonStyle: 'button button-sm inline-flex bg-secondary-400 text-gray-900 hover:bg-secondary-300 hover:text-black focus:ring-primary-700 lg:flex'
                }}
              />
            }
          }
        })
      }
    </div>
  )
}


const Nav = ({ filterNavigation, navigation }) => {
  return (
    <ul className="space-y-2 text-center lg:flex lg:justify-between lg:space-y-0">
      {
        filterNavigation?.map(item => {
          if (_.get(item, 'parentId') === 0) {
            const subNav = _.filter(filterNavigation, data => data.parentId === item.id);

            if (subNav.length === 0) {
              return (
                <li key={item.name}>
                  <ButtonLink
                    navigation={navigation}
                    className="block font-medium uppercase tracking-wide text-primary-100 hover:text-white hover:underline"
                    data={{
                      button: {
                        url: _.get(item, 'fields.nav.url') ? _.get(item, 'fields.nav.url') : item.slug,
                        text: item.name,
                        target: _.get(item, 'fields.nav.target'),
                      },
                      buttonPageLink: _.get(item, 'fields.pageLink'),
                    }}
                  />
                </li>
              )
            }

            return (
              <li key={item.name} className="block">
                <div className="block font-medium uppercase tracking-wide text-primary-100 hover:text-white hover:underline">{item.name}</div>
                {
                  subNav?.map((subItem) => (
                    <ButtonLink
                      navigation={navigation}
                      className="mt-1 block text-sm font-normal tracking-wide text-gray-400 hover:text-gray-300"
                      data={{
                        button: {
                          url: _.get(subItem, 'fields.nav.url') ? _.get(subItem, 'fields.nav.url') : subItem.slug,
                          text: subItem.name,
                          target: _.get(item, 'fields.nav.target'),
                        },
                        buttonPageLink: _.get(subItem, 'fields.pageLink'),
                      }}
                      key={subItem.name}
                    />
                  ))
                }
              </li>
            )
          }
        })
      }
    </ul>
  )
} 

const Logos = ({ general }) => {
  return (
    <div className="">
      <p className="mt-5 flex items-center justify-center space-x-1 text-center text-sm text-primary-200">
        <span className="inline-block"> ©{new Date().getFullYear()} {_.get(general, 'defaultMetaTitle')} </span>
        <span className="leading-0 inline-block">
          <a className="" href="https://www.modiphy.com/" target="_blank" rel="noopener" title={`MODIPHY® DESIGN | ${_.get(general, 'defaultMetaTitle')}`}>
            <svg className="h-6 w-6 fill-current" version="1.1" id="Foreground" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20.5 20.5" role="img" aria-labelledby="modiphy-logo-title">
              <title id="modiphy-logo-title">en masse MEDIA</title>
              <rect className="cls-10 text-[#ea0029]" width="20.5" height="20.5"></rect>
              <path className="cls-20 text-white" d="m17.57,10.53H5.76c0,1.92.52,3.39,1.58,4.42.93.9,2.12,1.35,3.58,1.35,1.66,0,3.05-.48,4.16-1.45l1.22,2.1c-.45.45-1.14.84-2.07,1.16-1.16.43-2.46.64-3.89.64-2.06,0-3.81-.7-5.25-2.1-1.6-1.54-2.4-3.61-2.4-6.21s.82-4.87,2.46-6.5c1.47-1.46,3.21-2.19,5.22-2.19,2.33,0,4.17.66,5.49,1.97,1.28,1.26,1.93,2.94,1.93,5.03,0,.64-.08,1.23-.23,1.77Zm-7.05-6.33c-1.3,0-2.38.42-3.26,1.25-.84.8-1.31,1.78-1.42,2.97h9.07c0-1.17-.37-2.15-1.1-2.94-.81-.86-1.9-1.29-3.29-1.29Z"></path>
            </svg>
          </a>
        </span>
      </p>
      <div className="mt-5">
        <nav className="flex justify-center space-x-4 text-sm text-primary-200">
          <Link className="hover:text-white hover:underline" href="privacy-policy">Privacy Policy</Link>
          <span>|</span>
          <Link className="hover:text-white hover:underline" href="cookie-policy">Cookie Policy</Link>
        </nav>
      </div>
    </div>
  )
}