/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// layouts
import { Section, Container } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder } from '@/components/shared'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-2xl',
  bgColor: 'transparent',
  title: {
    size: 'default-inverted',
    style: 'default-inverted'
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

export async function ImageLeftCustom({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorclassName') === 'default' || !_.get(fields, 'backgroundColorclassName') ? defaults.bgColor : _.get(fields, 'backgroundColorclassName')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : sectionCount === 1 ? 'h1' : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : sectionCount === 1 ? 'h2' : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 
  const extraBodySize = _.get(fields, 'extraBodySize') === 'default' ? defaults.extraBodySize : _.get(fields, 'extraBodySize') 

  let title = defaults.title
  let subtitle = defaults.subtitle

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  return (
    <Section className="relative overflow-hidden" bg={bg}>
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 xl:from-primary-700 xl:to-primary-500 overflow-hidden">
        <svg className="w-full fill-current text-white scale-flipped relative -top-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1338 52">
          <path d="m1338,0c-337.33,71.84-662.45,10-964.36,10C130.92,10,0,52,0,52h1338V0Z" />
        </svg>
      </div>

      <div className="relative bg-primary-600 pb-20 sm:pb-24 xl:pb-0">
        <div className="absolute inset-0 bg-gradient-to-r  from-primary-600 to-primary-500 xl:from-primary-700 xl:to-primary-500 xl:bg-fixed"></div>
        <div className="relative z-1 mx-auto flex max-w-screen-2xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
          <div className="-mt-12 w-full max-w-2xl xl:-mb-12 xl:w-[600px] xl:flex-none">
            <ImageHolder
              image={fields.image} 
              className={{
                figure: "aspect-h-9 aspect-w-16 relative h-full xl:aspect-h-2 xl:aspect-w-3 md:-mx-8 xl:mx-0",
                image: "absolute inset-0 h-full w-full rounded bg-secondary-800 object-cover shadow-2x"
              }}
            />
          </div>
          <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
            <div className="relative isolate">
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
                className={`${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')} mt-6 text-xl font-normal leading-8 text-white sm:text-2xl sm:leading-9`}
              />

              {/* extra body */}
              <Body
                body={_.get(fields, 'extraBody')}
                size={extraBodySize}
                className={`mt-2 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')} text-xl font-normal leading-8 text-white sm:text-2xl sm:leading-9`}
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
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 xl:from-primary-700 xl:to-primary-500 overflow-hidden relative">
        <svg className="w-full fill-current text-white relative -bottom-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1338 52">
          <path d="m1338,0c-337.33,71.84-662.45,10-964.36,10C130.92,10,0,52,0,52h1338V0Z" />
        </svg>
      </div>
    </Section>
  )
}
