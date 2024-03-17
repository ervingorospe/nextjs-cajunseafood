import React from 'react'
import _ from 'lodash'
import Link from 'next/link'
// layouts
import { Section, Container } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder } from '@/components/shared'
// api
import { getLocation } from '@/function/page'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-xl',
  bgColor: 'transparent',
  title: {
    size: 'default',
    style: 'default'
  },
  subtitle: {
    size: 'default-subtitle',
    style: 'default-subtitle'
  },
  bodySize: 'default',
  extraBodySize: 'default',
  buttonStyle: 'default',
  buttonStyle2: 'default'
}

export async function LocationsList({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : sectionCount === 1 ? 'h1' : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : sectionCount === 1 ? 'h2' : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 
  const extraBodySize = _.get(fields, 'extraBodySize') === 'default' ? defaults.extraBodySize : _.get(fields, 'extraBodySize') 

  let title = defaults.title
  let subtitle = defaults.subtitle

  const collections = await getLocation()
  const locations = _.filter(collections[0].items, data => data.fields.active)
  locations.shift()

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  return (
    <Section className="relative overflow-hidden" bg={bg}>
      <Container width={width} margin="section" className="relative">
        <div className="mt-2 md:mt-0 relative md:row-start-1">
          {/* title */}
          <Title
            title={_.get(fields, 'title')}
            tag={titleTag}
            align={titleAlign}
            style={title.style}
            size={title.size}
            className={`${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
          />

          {/* subtitle */}
          <Title
            title={_.get(fields, 'subtitle')}
            tag={subtitleTag}
            align={titleAlign}
            style={subtitle.style}
            size={subtitle.size}
            className={`mt-1 ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
          />

          {/* body */}
          <Body
            body={_.get(fields, 'body')}
            size={bodySize}
            className={`${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
          />

          {/* extra body */}
          <Body
            body={_.get(fields, 'extraBody')}
            size={extraBodySize}
            className={`mt-4 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
          />

          {
            (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
              <div className="mt-6">
                {
                  _.get(fields, 'button') && (
                    <Button
                      data={{
                        button: {
                          ..._.get(fields, 'button'),
                        },
                        buttonPageLink: _.get(fields, 'buttonPageLink')
                      }}
                      styles={defaults.buttonStyle}
                      className=""
                    />
                  )
                }

                {
                  _.get(fields, 'button-2') && (
                    <Button
                      data={{
                        button: {
                          ..._.get(fields, 'button-2'),
                        },
                        buttonPageLink: _.get(fields, 'buttonPageLink-2')
                      }}
                      styles={defaults.buttonStyle2}
                      className=""
                    />
                  )
                }
              </div>
            )
          }

          {
            locations && (
              <div className="relative mt-5 grid gap-3 lg:gap-8 md:mt-7 md:max-w-none lg:grid-cols-2">
                {
                  locations?.map(item => <Location item={item} key={item.id}/>)
                }
              </div>
              
            )
          }
        </div>
      </Container>
    </Section>
  )
}

const Location = ({ item }) => {
  const { fields } = item
  const formatPhone = _.get(fields, 'telephone').replace(/[^A-Z0-9]/gi, '')

  return (
    <div className="group flex w-full flex-col">
      <Link href={fields.googleMapUrl} target="_blank">
        <ImageHolder
          image={{
            imageUrl: _.get(fields, 'googleStaticMap'),
            altText: ''
          }} 
          className={{
            figure: "aspect-w-16 aspect-h-9 overflow-hidden rounded-t-lg",
            image: "absolute left-0 top-0 h-full w-full object-cover object-center"
          }}
        />
      </Link>
     
      <div className="space-y-3 pb-5 rounded-b-lg border px-4 pt-5 text-lg text-gray-600 transition duration-300 group-hover:shadow-lg 2xl:text-base">
        <h2 className="text-xl uppercase md:text-2xl font-heading font-medium text-gray-900">{item.name}</h2>
        {
          _.get(fields, 'address') && (
            <div className="flex">
              <svg className="mt-0.5 h-4 w-4 md:h-6 w-6  2xl:w-5 2xl:h-5 text-secondary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <Link href={fields.googleMapUrl} target="_blank" className="ml-3 space-y-1 hover:underline">
                <p className="text-sm md:text-md">
                  {_.get(fields, 'address.address')}<br />
                  {_.get(fields, 'address.city')}, {_.get(fields, 'address.state')} {_.get(fields, 'address.zip')}
                </p>
              </Link>
            </div>
          )
        }

        {
          _.get(fields, 'telephone') && (
            <div className="flex">
              <svg className="mt-0.5 h-4 w-4 md:h-6 w-6 2xl:w-5 2xl:h-5 text-secondary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>

              <Link href={`tel:${formatPhone}`} className="ml-3 space-y-1 hover:underline hover:text-primary-700">
                <p className="text-sm md:text-md">{_.get(fields, 'telephone')}</p>
              </Link>
            </div>
          )
        }

        {
          _.get(fields, 'email') && (
            <div className="flex">
              <svg className="mt-0.5 h-4 w-4 md:h-6 w-6 2xl:w-5 2xl:h-5 fill-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
              </svg>

              <Link href={`mailto:${_.get(fields, 'email')}`} className="ml-3 mb-5 space-y-1 hover:underline hover:text-primary-700">
                <p className="text-sm md:text-md">{_.get(fields, 'email')}</p>
              </Link>
            </div>
          )
        }

        {
          _.get(fields, 'hours') && (
            <div>
              <p className="text-gray-900 bold text-lg">Store Hours:</p>
              <p className="prose mt-2" dangerouslySetInnerHTML={{__html: _.get(fields, 'hours') }}/>
            </div>
          )
        }

        <Link href={fields.googleMapUrl} target="_blank" className="button-sm mt-6 inline-flex bg-secondary-400 text-gray-900 hover:bg-secondary-300 focus:ring-secondary-400">
          Get Directions
        </Link>
      </div>
    </div>
  )
}
