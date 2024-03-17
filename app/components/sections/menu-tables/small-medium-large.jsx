import React from 'react'
// api
import { getCollection } from '@/api/collection'


export async function SmallMediumLarge({ id }) {
  let menuList = [];

  const collections = await getCollection(id)
  menuList = _.filter(collections[0].items, data => data.fields.active)

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-primary text-white font-heading font-semibold text-right">
          <td>
            
          </td>
          <td className="px-2 py-1">
            Small
          </td>
          <td className="px-2 py-1">
            Medium
          </td>
          <td className="px-2 py-1">
            Large
          </td>
          <td className="px-2 py-1">
            Extra Large
          </td>
        </tr>
      </thead>
      <tbody>
        {
          menuList?.map(menu => 
            _.get(menu, 'fields.addOns') ?
              (
                <>
                  <tr className="text-sm" key={menu.id}>
                    <td className="p-2">
                      <span className="text-sm italic inline-flex ml-12 font-semibold text-gray-500">
                        {_.get(menu, 'fields.title')}
                      </span>
                    </td>
                    <td className="text-right p-2">
                      {_.get(menu, 'fields.small')}
                    </td>
                    <td className="text-right p-2">
                      {_.get(menu, 'fields.medium')}
                    </td>
                    <td className="text-right p-2">
                      {_.get(menu, 'fields.large')}
                    </td>
                    <td className="text-right p-2">
                      {_.get(menu, 'fields.extraLarge')}
                    </td>
                  </tr>
                  {
                    _.get(menu, 'fields.description') && (
                      <tr className="border-b text-sm">
                        <td className="px-2 pb-2">
                          <span className={`text-sm italic inline-flex ${_.get(menu, 'fields.code') ? 'ml-12' : 'ml-4'} font-semibold text-gray-500`}>
                            {_.get(menu, 'fields.description')}
                          </span>
                        </td>
                      </tr>
                    )
                  }
                </>
                
              )
              :
              (
                <>
                  <tr className={`${_.get(menu, 'fields.description') ?? 'border-b'} text-sm`} key={menu.id}>
                    <td className="p-2">
                      {
                        _.get(menu, 'fields.code') && (
                          <span className="inline-flex rounded-full bg-secondary-300 w-7 h-7 text-gray-950 items-center justify-center border-secondary-400 border text-[11px] font-medium">
                            {_.get(menu, 'fields.code')}
                          </span>
                        )
                      }
                      <span className="inline-flex ml-3 font-semibold text-gray-900">
                        {_.get(menu, 'fields.title')}
                      </span>
                    </td>
                    <td className="text-right p-2">
                      {_.get(menu, 'fields.small')}
                    </td>
                    <td className="text-right p-2">
                      {_.get(menu, 'fields.medium')}
                    </td>
                    <td className="text-right p-2">
                      {_.get(menu, 'fields.large')}
                    </td>
                    <td className="text-right p-2">
                      {_.get(menu, 'fields.extraLarge')}
                    </td>
                  </tr>
                  {
                    _.get(menu, 'fields.description') && (
                      <tr className="border-b text-sm">
                        <td className="px-2 pb-2">
                          <span className={`text-sm italic inline-flex ${_.get(menu, 'fields.code') ? 'ml-12' : 'ml-4'} font-semibold text-gray-500`}>
                            {_.get(menu, 'fields.description')}
                          </span>
                        </td>
                      </tr>
                    )
                  }
                </>
              )
          )
        }
      </tbody>
    </table>
  )
}
