'use client'

import React, { Fragment } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import _ from 'lodash'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
// layouts
import { Container } from '@/app/layouts'
// function
import { buttonNav } from '@/function/navigation'


export const MobileHeader = ({ navigation, general, actionButtons }) => {
  return (
    <Transition
      as={Fragment}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition xl:hidden"
      >
        {({ close }) => (
          <div className="overflow-hidden rounded bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <Link href="/">
                <Image
                  src="https://fluxconsole.com/files/item/1355/173874/logo.svg"
                  alt={_.get(general, 'organizationName')}
                  height={1000}
                  width={1000}
                  className="h-14 w-auto"
                />
              </Link>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close main menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="py-4 space-y-1 px-2 pt-2 pb-3 max-h-[700px] overflow-y-scroll">
              <Nav 
                navigation={navigation}
                close={() => close()}
                className={{
                  nav: "",
                  link: "block p-3 text-base font-normal uppercase tracking-wider text-gray-700 hover:text-primary-300"
                }}
              />
            </div>
            <div className="grid w-full border">
              <NavButtons close={() => close()} actionButtons={actionButtons} navigation={navigation} className="button w-full flex rounded-t-none bg-secondary-400 text-gray-950 hover:bg-secondary-300 focus:ring-secondary-400"/>
            </div>
          </div>
        )}
      </Popover.Panel>
    </Transition>
  )
}

export const DesktopHeader = ({ navigation, general, actionButtons }) => {
  return (
    <Container className="flex max-w-screen-2xl justify-between py-4">
      <Link href="/">
        <Image 
          className="h-16 w-auto md:h-20 xl:h-28" 
          src="https://fluxconsole.com/files/item/1355/173874/logo.svg" 
          alt={_.get(general, 'organizationName')}
          height={500}
          width={500}
        />
      </Link>
      <div className="flex items-center justify-end">
        <Nav 
          navigation={navigation}
          className={{
            nav: "hidden space-x-8 xl:flex",
            link: "block text-base font-medium uppercase tracking-wide text-white hover:text-secondary-300 nav-link"
          }}
        />
        
        <div className="ml-8 hidden md:flex">
          <NavButtons actionButtons={actionButtons} navigation={navigation} className="button inline-flex bg-secondary-400 text-gray-950 hover:bg-secondary-300 focus:ring-secondary-400"/>
        </div>

        <div className="-my-2 -mr-2 ml-6 xl:hidden">
          <Popover.Button className="inline-flex items-center justify-center rounded p-2 text-white border-2 border-transparent hover:border-primary-400 hover:text-secondary-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
      </div>
    </Container>
  )
}

const NavButtons = ({ actionButtons, navigation, className, close }) => {
  const filteredButtons = _.filter(actionButtons, data => _.get(data, 'fields.active'))

  return (
    filteredButtons?.map(item => (
      <ButtonLink
        className={className}
        navigation={navigation}
        close={close}
        data={{
          button: {
            ..._.get(item, 'fields.button'),
            text: _.get(item, 'fields.button') ? _.get(item, 'fields.button.text') : _.get(item, 'name'),
          },
          buttonPageLink: _.get(item, 'fields.buttonPageLink'),
        }}
        key={item.name}
      />
    ))
  )
}

export const Nav = ({ navigation, className, close }) => {
  const filteredNav = _.filter(navigation, data => _.get(data, 'fields.showInNavigation'))

  return (
    <nav className={className.nav}>
      {
        filteredNav?.map(item => {
          if (_.get(item, 'parentId') === 0){
            const subNav = _.filter(filteredNav, data => data.parentId === item.id);

            if (subNav.length === 0) {
              return (
                <ButtonLink
                  close={close}
                  className={className.link}
                  navigation={navigation}
                  data={{
                    button: {
                      url: _.get(item, 'fields.nav.url') ? _.get(item, 'fields.nav.url') : item.slug,
                      text: item.name,
                      target: _.get(item, 'fields.nav.target'),
                    },
                    buttonPageLink: _.get(item, 'fields.pageLink'),
                  }}
                  key={item.name}
                />
              )
            }

            return (
              <SubNav
                navigation={navigation}
                item={item}
                subNav={subNav}
                key={item.name}
              />
            )
          }
        })
      }
    </nav>
  )
}

export const SubNav = ({ navigation, className, item, subNav }) => {
  return (
    <Popover
      className="group relative"
    >
      {({ open }) => (
        <>
          <Popover.Button styles={{ border: 'none !important;' }} className="cursor-pointer w-full text-gray-900 hover:bg-gray-100">
            <span className="flex items-center w-full py-2 pl-8 pr-4 uppercase tracking-wide ">
              <span>{item.name}</span>
              <svg
                className={`group-hover/child-nav:text-link-hover text-link ml-2 h-5 w-5 fill-current transition-transform ${open ? 'rotate-180 text-link-hover' : ''}`}
                x-description="Heroicon name: solid/chevron-down"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              className="block"
              static
            >
              {({ close }) => (
                <div className="relative grid">
                  {
                    subNav?.map(subItem => {
                      if (_.get(subItem, 'fields.showInNavigation')) 
                        return (
                          <div
                            onClick={() => close()}
                            key={subItem.name}
                          >
                            <SubNavButton
                              className="group/child-nav flex items-center hover:bg-gray-100"
                              data={{
                                button: {
                                  url: _.get(subItem, 'fields.nav.url') ? _.get(subItem, 'fields.nav.url') : subItem.slug,
                                  text: subItem.name,
                                  target: _.get(subItem, 'fields.nav.target'),
                                },
                                buttonPageLink: _.get(subItem, 'fields.pageLink'),
                              }}
                              navigation={navigation}
                            />
                          </div>
                        )
                    })
                  }
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export const ButtonLink = ({ data, className, navigation, close = () => {} }) => {
  let buttonDetails = {
    ..._.get(data, 'button'),
    url: _.get(data, 'button.url') ? _.get(data, 'button.url') : '/'
  }

  if (data.buttonPageLink) {
    const url = _.find(navigation, path => path.id === data.buttonPageLink)

    buttonDetails = {
      ..._.get(data, 'button'),
      url: _.get(url, 'slug') ? _.get(url, 'slug') : '/'
    }
  }

  return (
    <span onClick={() => close()}>
      <Link href={buttonDetails.url} className={className} target={buttonDetails.target}>
        {buttonDetails.text}
      </Link>
    </span>
  )
}

const SubNavButton = ({ data, className, navigation }) => {
  let buttonDetails = {
    ..._.get(data, 'button'),
    url: _.get(data, 'button.url') ? _.get(data, 'button.url') : '/'
  }

  if (data.buttonPageLink) {
    const url = _.find(navigation, path => path.id === data.buttonPageLink)

    buttonDetails = {
      ..._.get(data, 'button'),
      url: _.get(url, 'slug') ? _.get(url, 'slug') : '/'
    }
  }

  return (
    <Link href={buttonDetails.url} className={className} target={buttonDetails.target}>
      <div className="ml-3 flex items-center gap-3 transition-all">
        <p className="group-hover/child-nav:text-black text-gray-700 py-2 pl-8 pr-4 text-[15px]">
          {buttonDetails.text}
        </p>
      </div>
    </Link>
  )
}

export const MobileSubNav = ({ item, subNav, closeMenu, navigation }) => {
  return (
    <Popover
      className="group relative"
    >
      {({ open }) => (
        <>
          <Popover.Button styles={{ border: 'none !important;' }} className="cursor-pointer w-full block">
            <div
              className="flex w-full py-2 pl-8 pr-4 uppercase tracking-wide text-gray-900 hover:bg-gray-100"
            >
              <span>{item.name}</span>
              <svg
                className={`group-hover/child-nav:text-link-hover text-link ml-2 h-5 w-5 fill-current transition-transform ${open ? 'rotate-180 text-link-hover' : ''}`}
                x-description="Heroicon name: solid/chevron-down"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              className="w-full"
              static
            >
              {({ close }) => (
                <div className="relative overflow-hidden">
                  <span
                    className="is-block absolute left-1/2 -top-2 -ml-3"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-[8px] w-[20px] fill-current text-primary-400"
                      viewBox="0 0 5 2"
                      preserveAspectRatio="none"
                    >
                      <path d="M 0 2 L 2.5 0 L 5 2 Z"></path>
                    </svg>
                  </span>
                  <div className="ml-2 relative grid">
                    {
                      subNav?.map((subItem, i) => {
                        return (
                          <div
                            onClick={() => closeMenu()}
                            key={subItem.name}
                          >
                            <SubNavButton
                              className="group/child-nav flex items-center hover:bg-gray-100"
                              data={{
                                button: {
                                  url: _.get(subItem, 'fields.nav.url') ? _.get(subItem, 'fields.nav.url') : subItem.slug,
                                  text: subItem.name,
                                  target: _.get(subItem, 'fields.nav.target'),
                                },
                                buttonPageLink: _.get(subItem, 'fields.pageLink'),
                              }}
                              navigation={navigation}
                            />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}