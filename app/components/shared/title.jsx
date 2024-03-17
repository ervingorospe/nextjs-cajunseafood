'use client'

import React from 'react'
import clsx from 'clsx'
// component
import * as TitleComponent from '@/components/shared/title-tags'
// function
import { formatComponentName } from '@/function/formatting'

const titleAlign = {
  'default': '',
  'text-left': 'text-left',
  'text-center': 'text-center',
  'text-right': 'text-right',
  'text-justify': 'text-justify'
}

const titleSizes = {
  'default': 'text-2xl md:text-6xl',
  'default-subtitle': 'text-xl md:text-2xl',
  'default-inverted': 'text-3xl md:text-6xl',
  'default-subtitle-inverted': 'text-xl md:text-2xl',
  'hero-title': 'text-2xl md:text-6xl',
  'hero-subtitle': 'text-base md:text-2xl',
  'call-to-action': 'text-4xl md:text-6xl',
  'call-to-action-subtitle': 'text-xl md:text-2xl',
  'menu-table': 'text-2xl md:text-5xl',
  'text-xs': 'text-xs',
  'text-sm': 'text-sm',
  'text-base': 'text-base',
  'text-lg': 'text-lg',
  'text-xl': 'text-xl',
  'text-2xl': 'text-2xl',
  'text-3xl': 'text-3xl',
  'text-4xl': 'text-4xl',
  'text-5xl': 'text-5xl',
  'text-6xl': 'text-6xl',
  'text-7xl': 'text-7xl',
  'text-8xl': 'text-8xl',
  'text-9xl': 'text-9xl'
}

const titleStyle = {
  'default': 'capitalize font-heading font-medium text-gray-900',
  'default-subtitle': 'text-base font-bold uppercase tracking-wide text-primary-600',
  'default-inverted': 'capitalize font-heading font-medium text-secondary-300',
  'default-subtitle-inverted': 'font-normal uppercase tracking-wide ',
  'hero-title': 'capitalize font-heading font-medium text-white',
  'hero-subtitle': 'font-bold uppercase tracking-wide text-secondary-300',
  'call-to-action-subtitle': 'font-normal uppercase tracking-wide text-primary-300',
  'call-to-action': 'capitalize max-w-5xl font-heading text-white',
  'menu-table': 'font-heading font-medium text-gray-900'
}

export function Title({ title, tag = "default", align = "default", style = "default", size = "default", className }) {
  if (title) {
    const TitleType = TitleComponent[formatComponentName(tag)];

    return (
      <div>
        <TitleType title={title} styles={clsx(titleStyle[style], titleSizes[size], titleAlign[align], className)}/>
      </div>
    )
  }
}
