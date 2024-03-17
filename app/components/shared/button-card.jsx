import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
// function
import { getNavigationDetails, buttonNav } from '@/function/navigation'
// component
import { ImageHolder } from '@/components/shared'


export async function ButtonCard({ data, className, variants, image }) {
  if (data.button) {
    const navigation = await getNavigationDetails()
    
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
      <div className="cursor-pointer relative overflow-hidden group aspect-h-9 aspect-w-16 w-full border bg-gray">
        <Link className={clsx(className)} href={buttonDetails.url} target={buttonDetails.target}>
          {
            image && (
              <ImageHolder
                image={image}
                className={{
                  figure: "z-0",
                  image: "h-full w-full object-cover object-center"
                }}
              />
            )
          }
          
          <div className="z-1 overlay absolute inset-0 flex items-end">
            <div className="flex items-center bg-white px-4 py-2">
              <p className="mr-3 text-xl text-gray-900 transition-all group-hover:mr-6">{buttonDetails.text}</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-primary-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}
