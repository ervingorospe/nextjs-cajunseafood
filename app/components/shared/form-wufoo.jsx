'use client'

import React, { useState, useEffect } from 'react'
import Script from 'next/script'
// functions
import { splitWuffooForm } from '@/function/embed-codes'

export function FormWufoo({ data }) {
  const { fields } = data

  const [wufooForm, setWufooForm] = useState({})

  useEffect(() => {
    if (fields.embed)
      setWufooForm(splitWuffooForm(fields.embed))
  }, [fields.embed])

  return (
    <div>
      {
        fields.embed && (
          <div className="mt-6 lg:mt-0 grid justify-items-center lg:justify-items-center">
            <div className="relative w-full bg-gray-50 lg:max-w-2xl rounded-lg lg:max-w-lg max-w-[600px] min-h-[399px]">
              <div className="px-6 pt-6">
                <div dangerouslySetInnerHTML={{__html: wufooForm.divElement}}/>
                <Script
                  id="form-script"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: eval(`${wufooForm.scriptCode}`),
                  }}
                />
              </div>
              <p className="abosulute text-xs text-center bg-gray-100 border rounded-b-xl p-0 py-7 m-0">
                We care about protecting your data. Read our <strong><a href="/privacy-policy" target="_blank">Privacy Policy.</a></strong>
              </p>
            </div>
          </div>
        )
      }
    </div>
  )
}
