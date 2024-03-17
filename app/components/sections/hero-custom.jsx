/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// layouts
import { Section, Container } from '@/app/layouts'
// components
import { Title, Body, Button, VideoHolder, ImageHolder } from '@/components/shared'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-2xl',
  bgColor: 'primary-500',
  title: {
    size: 'hero-title',
    style: 'hero-title'
  },
  subtitle: {
    size: 'hero-subtitle',
    style: 'hero-subtitle'
  },
  bodySize: 'hero',
  extraBodySize: 'hero',
  buttonStyle: 'hero',
  buttonStyle2: 'hero'
}

export async function HeroCustom({ data, sectionCount }) {
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

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  return (
    <Section className="relative w-full" bg={bg}>
      <div 
        className="absolute inset-0 xl:bg-fixed opacity-40"
        style={{ 
          backgroundImage: `url(https://fluxconsole.com/files/item/1355/174001/pattern-new.svg)`,
          backgroundRepeat: 'repeat',  
          backgroundSize: '5rem', 
          backgroundPosition: 'right center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 from-10%"/>
      <div className="h-20 lg:h-20 xl:h-24"/>

      <Container className="relative" width={width} margin="hero">
        <div className="grid items-center gap-8 lg:grid-cols-2 xl:grid-cols-12">
          <div className="xl:col-span-5">
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
              className={`mt-6 ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
            />

            {/* extra body */}
            <Body
              body={_.get(fields, 'extraBody')}
              size={extraBodySize}
              className={`mt-1 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
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

          <div className="xl:col-span-7">
            {
              (_.get(fields, 'video') || _.get(fields, 'image')) && (
                <div>
                  {
                    _.get(fields, 'video') && (
                      <div>
                        <VideoHolder 
                          video={_.get(fields, 'video.videoUrl')} 
                          className={{
                            figure: "aspect-h-9 aspect-w-16 overflow-hidden rounded",
                            video: "absolute left-0 top-0 h-full w-full object-cover object-center"
                          }}
                        />
                      </div>
                    )
                  }

                  {
                    !_.get(fields, 'video') && _.get(fields, 'image') && (
                      <div
                        variants={fadeInFromBottom}
                      >
                        <ImageHolder 
                          image={fields.image} 
                          className={{
                            figure: "aspect-h-9 aspect-w-16 overflow-hidden rounded",
                            image: "absolute left-0 top-0 h-full w-full object-cover object-center"
                          }}
                        />
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </Container>

      <div className="relative z-1">
        <svg className="w-full fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1338 52">
          <path d="m1338,0c-337.33,71.84-662.45,10-964.36,10C130.92,10,0,52,0,52h1338V0Z" />
        </svg>
        <svg className="absolute -top-4 left-0 w-full text-secondary-300 fill-current" viewBox="17 0 1320 52">
          <path d="M1338,7l0,-7c-337.33,71.129 -662.45,9.901 -964.36,9.901c-242.72,-0 -373.64,42.099 -373.64,42.099l25.977,0c49.275,-11.971 167.759,-35.099 347.663,-35.099c301.91,-0 627.03,61.228 964.36,-9.901Z" />
        </svg>
      </div>
    </Section>
  )
}
