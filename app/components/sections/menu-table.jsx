import React from 'react'
import _ from 'lodash'
// layouts
import { Section, Container } from '@/app/layouts'
// components
import { Title, Body } from '@/components/shared'
// table components
import { BakedBread, ItemPrice, SmallLarge, Dozen, SmallMediumLarge, Pans, Pieces } from '@/components/sections/menu-tables'
// api
import { getCollection } from '@/api/collection'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-lg',
  bgColor: 'transparent',
  title: {
    size: 'menu-table',
    style: 'menu-table'
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

export async function MenuTable({ data, sectionCount }) {
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

  let subCollections = [];

  if (_.get(fields, 'contentCollection')) {
    const collections = await getCollection(_.get(fields, 'contentCollection'))
    subCollections = _.filter(collections[0].items, data => data.fields.active)
  }

  const renderSwitch = (param, itemId) => {
    switch (param) {
      case 'Baked Bread':
        return <BakedBread id={itemId}/>
      case 'Item - Price':
        return <ItemPrice id={itemId}/>
      case 'Sizes (Small and Large)':
        return <SmallLarge id={itemId}/>
      case 'Dozen':
        return <Dozen id={itemId}/>
      case 'Sizes (Small, Medium and Large)':
        return <SmallMediumLarge id={itemId}/>
      case 'Pans':
        return <Pans id={itemId}/>
      case 'Pieces':
        return <Pieces id={itemId}/>
      default:
        return null;
    }
  }

  return (
    <Section className="relative overflow-hidden" bg={bg}>
      <Container width={width} margin="section" className="relative">
        <div className="grid">
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
            className={`mt-2 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
          />
        </div>

        {
          subCollections.length > 0 && (
            <div className="mt-10">
              {
                subCollections?.map((item, i) => (
                  <div className="mt-16" key={i}>
                    {/* title */}
                    <Title
                      title={_.get(item, 'fields.title')}
                      tag="h2"
                      align={defaults.titleAlign}
                      style={defaults.title.style}
                      size={defaults.title.size}
                      className=""
                    />
                    {/* body */}
                    <Body
                      body={_.get(item, 'fields.body')}
                      size="menu-body"
                      className="mt-6"
                    />
                    <Body
                      body={_.get(item, 'fields.body-2')}
                      size="menu-body-2"
                      className="mt-3"
                    />

                    {
                      _.get(item, 'fields.menuItems') && (
                        <div className="mt-10 overflow-x-auto">
                          {
                            renderSwitch(_.get(item, 'fields.type'), _.get(item, 'fields.menuItems'))
                          }
                        </div>
                      )
                    }
                  </div>
                ))
              }
            </div>
          )
        }
      </Container>
    </Section>
  )
}
