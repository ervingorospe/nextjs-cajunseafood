import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
// layouts
import { Section, Container } from '@/app/layouts'
// components
import { Title, Body, Button, FormWufoo } from '@/components/shared'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-2xl',
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

export function FormRightContact({ data, sectionCount }) {
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
    <Section className="relative overflow-hidden" bg={bg}>
      {
        sectionCount == "2" ? (
          <>
            <div className="absolute top-14 right-32 md:right-48 lg:right-96">
              <Image
                src="https://fluxconsole.com/files/item/1355/174000/crawfish.svg"
                alt="Cajun Seafood"
                width={1500}
                height={1500}
                className="h-[50px]  md:h-[100px] lg:h-[120px] xl:h-[200px] w-full -scale-x-100"
              />
            </div>
            <div className="absolute top-0 -right-4 sm:-right-8 md:-right-10 lg:-right-14 xl:-right-20">
              <Image
                src="https://fluxconsole.com/files/item/1355/174000/crawfish.svg"
                alt="Cajun Seafood"
                width={1500}
                height={1500}
                className="sm:h-[170px] h-[100px] md:h-[200px] lg:h-[300px] xl:h-[400px] w-full"
              />
            </div>
          </>
        ): ""
      }
      <Container width={width} margin="section" className="relative">
        <div className="mt-6 grid lg:gap-12 xl:gap-16 2xl:gap-20 lg:grid-cols-2">
          <div className="mt-2 md:mt-0 relative">
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
          </div>

          <FormWufoo data={data}/>
        </div>
      </Container>

      <div className="relative z-1">
        <svg className="w-full fill-current text-primary-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1338 52">
          <path d="m1338,0c-337.33,71.84-662.45,10-964.36,10C130.92,10,0,52,0,52h1338V0Z" />
        </svg>
      </div>
    </Section>
  )
}
