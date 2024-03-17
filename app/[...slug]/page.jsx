import _ from 'lodash'
import Script from 'next/script'
// function
import { pageDetails, getGeneralInfo, getSettings } from '@/function/page'
import { generateStaticRoutes, checkRoute } from '@/function/navigation'
import { sectionsComponent, formatComponentName } from '@/function/formatting'
// component
import * as ComponentSection from '@/components/sections'
import { DefaultHero } from '@/components/sections'

export async function generateMetadata({ params }) {
  const general = await getGeneralInfo()
  const path = await checkRoute(`${params.slug.join("/")}`)

  if (path) {
    const { fields } = path
    const metaTitle = _.get(fields, 'metaTitle') ? _.get(fields, 'metaTitle') : _.get(general, 'defaultMetaTitle')

    return {
      title: `${metaTitle}`,
      description: `${_.get(fields, 'metaDescription')}`,
      openGraph: {
        title: `${metaTitle}`,
        description: `${_.get(fields, 'metaDescription')}`,
        images: [`${_.get(fields, 'ogImage.imageUrl')}`],
        url: `${_.get(general, 'url')}${path.slug}`,
        site_name: _.get(general, 'organizationName')
      },
      alternates: {
        canonical: `${_.get(general, 'url')}${path.slug}`,
      },
    };
  }
}

export default async function Page({ params }) {
  const path = await checkRoute(`${params.slug.join("/")}`)
  const settings = _.first(await getSettings())
  const general = await getGeneralInfo()

  if (path) {
    const pageData = await pageDetails(path.id)

    return (
      <>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${_.get(general, 'analyticsId')}`}
        />
        
        <Script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${_.get(general, 'analyticsId')}', {
                page_path: window.location.pathname,
              });
              gtag('config', '${_.get(settings, 'fields.googleTagManagerId')}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {
          _.size(pageData.activeSections) > 0 ? (
            pageData.activeSections?.map((item, i) => {
              const componentName = sectionsComponent(item)

              if (componentName) {
                const ComponentType = ComponentSection[formatComponentName(componentName)] ? ComponentSection[formatComponentName(componentName)] : null

                if (ComponentType) {
                  return <ComponentType 
                    data={item} 
                    key={item.name} 
                    marginTop={`py-24 lg:py-28`} 
                    sectionCount={i+1} 
                  />
                }
              }
            })
          ) :
          (
            <DefaultHero data={path}/>
          )
        }
      </>
    )
  }
}

export async function generateStaticParams() {
  return await generateStaticRoutes()
}
