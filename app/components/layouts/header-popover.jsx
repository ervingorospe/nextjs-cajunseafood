'use client'

import React, { useState, useEffect } from 'react'
import _ from 'lodash'
// tailwind
import { Popover } from '@headlessui/react'
// components
import { DesktopHeader, MobileHeader } from '@/components/layouts'

export function HeaderPopover({ navigation, general, actionButtons }) {
  const [headerBg, setHeaderBg] = useState("transparent")

  useEffect(() => {
    window.onscroll = async () => {
      if(window.pageYOffset === 0) {
        setHeaderBg('transparent')
      }

      if(window.pageYOffset > 0) {
        setHeaderBg('bg-gradient-to-r from-primary-700 to-primary-600')
      }
    }
  }, [headerBg])

  return (
    <header className={`fixed w-full z-1000 transparent ${headerBg}`}>
      <Popover>
        {({ open }) => (
          <>
            <DesktopHeader navigation={navigation} general={general} actionButtons={actionButtons}/>
            <MobileHeader navigation={navigation} general={general} actionButtons={actionButtons}/>
          </>
        )}
      </Popover>
    </header>
  )
}


