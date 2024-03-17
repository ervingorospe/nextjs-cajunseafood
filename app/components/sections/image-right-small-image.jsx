import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
// layouts
import { Section, Container } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder } from '@/components/shared'

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

export async function ImageRightSmallImage({ data, sectionCount }) {
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
    <Section className="relative" bg={bg}>
      {
        sectionCount == "3" ? (
          <div className="absolute -top-4 xl:-top-20 -left-8 xl:-left-10">
            <Image
              src="https://fluxconsole.com/files/item/1355/174000/crawfish.svg"
              alt="Cajun Seafood"
              width={1500}
              height={1500}
              className="sm:h-[170px] h-[100px] md:h-[200px] lg:h-[150px] xl:h-[200px] w-full -scale-x-100"
            />
          </div>
        ): ""
      }
      <Container width={width} margin="section" className="relative">
        <div className="mt-6 grid items-center lg:grid-cols-2 xl:grid-cols-12 lg:gap-8">
          {
            fields.image && (
              <div className="mx-auto relative xl:col-span-5">
                <ImageHolder
                  image={fields.image} 
                  className={{
                    figure: "",
                    image: "h-full w-full object-center rounded"
                  }}
                />
              </div>
            )
          }

          <div className="xl:col-span-7 lg:row-start-1 mt-2 lg:mt-0">
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
        </div>
      </Container>
    </Section>
  )
}
