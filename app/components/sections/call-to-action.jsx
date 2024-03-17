/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import Image from 'next/image'
import _ from 'lodash'
// layouts
import { Section, Container } from '@/app/layouts'
// component
import { ButtonLink } from '@/components/layouts'
import { ImageHolder } from '@/components/shared'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-2xl',
  bgColor: 'white',
  title: {
    size: 'call-to-action',
    style: 'call-to-action'
  },
  subtitle: {
    size: 'call-to-action-subtitle',
    style: 'call-to-action-subtitle'
  },
  bodySize: 'prose',
  extraBodySize: 'prose',
  buttonStyle: 'default',
  buttonStyle2: 'default'
}

export function CallToAction({ data = {}, navigation }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')

  let title = defaults.title
  let subtitle = defaults.subtitle

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  return (
    <Section className="relative" bg={bg}>
      <div className="absolute z-1 left-0 right-0 bottom-32">
        <svg className="w-full fill-current text-primary-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1338 52">
          <path d="m1338,0c-337.33,71.84-662.45,10-964.36,10C130.92,10,0,52,0,52h1338V0Z" />
        </svg>
        
        <svg className="absolute -top-4 left-0 w-full text-secondary-400 fill-current" viewBox="17 0 1320 52">
          <path d="M1338,7l0,-7c-337.33,71.129 -662.45,9.901 -964.36,9.901c-242.72,-0 -373.64,42.099 -373.64,42.099l25.977,0c49.275,-11.971 167.759,-35.099 347.663,-35.099c301.91,-0 627.03,61.228 964.36,-9.901Z" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-primary-700"></div>

      <Container width="default" margin="default" className="relative z-1 py-12 text-center">
        <div className="relative overflow-hidden rounded bg-primary-700 shadow-2xl">
          <div className="pattern-primary absolute inset-0"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 to-75%"></div>

          <div className="relative z-1 grid md:flex md:justify-between">
            <div className="max-w-2xl p-6 py-8 text-left md:p-8 lg:px-12 lg:py-24">
              <h2 className="font-heading text-4xl font-semibold text-white md:text-5xl" dangerouslySetInnerHTML={{__html: _.get(fields, 'body')}}/>

              {
                (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
                  <div className="mt-8 md:space-x-2">
                    {
                      _.get(fields, 'button') && (
                        <ButtonLink
                          data={{
                            button: {
                              ..._.get(fields, 'button'),
                            },
                            buttonPageLink: _.get(fields, 'buttonPageLink')
                          }}
                          className="button button inline-flex w-full bg-secondary-400 text-center text-gray-950 hover:bg-secondary-300 hover:text-black md:w-auto"
                          navigation={navigation}
                        />
                      )
                    }

                    {
                      _.get(fields, 'button-2') && (
                        <ButtonLink
                          data={{
                            button: {
                              ..._.get(fields, 'button-2'),
                            },
                            buttonPageLink: _.get(fields, 'buttonPageLink-2')
                          }}
                          className="mt-2 md:mt-0 utton button inline-flex w-full border-white text-center text-white hover:bg-white hover:text-gray-950 md:w-auto" target="_self"
                          navigation={navigation}
                        />
                      )
                    }
                  </div>
                )
              }
            </div>
            

            <ImageHolder
              image={fields.image} 
              className={{
                figure: "relative flex w-full overflow-hidden md:w-1/3 lg:w-3/5 row-start-1",
                image: "object-bottom-right absolute left-0 top-0 h-full w-full object-cover"
              }}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
