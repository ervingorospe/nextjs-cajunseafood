import React from 'react'
// layouts
import { Section, Container } from "@/app/layouts"

export async function DefaultHero({ data }) {
  return (
    <Section className="relative w-full" bg="primary-500">
      <div className="pattern-primary absolute inset-0 xl:bg-fixed"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 from-10%"></div>
      <div className="h-20 lg:h-20 xl:h-24"></div>

      <Container className="relative" width="max-w-screen-2xl" margin="hero">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-semibold text-white md:text-5xl xl:text-6xl">{data.name}</h1>
        </div>
      </Container>
      
      <div className="relative z-1">
        <svg className="w-full fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1338 52">
          <path d="m1338,0c-337.33,71.84-662.45,10-964.36,10C130.92,10,0,52,0,52h1338V0Z" />
        </svg>
        <svg className="absolute -top-4 left-0 w-full text-secondary-300 fill-current" viewBox="10 0 1338 52">
          <path d="M1338,7l0,-7c-337.33,71.129 -662.45,9.901 -964.36,9.901c-242.72,-0 -373.64,42.099 -373.64,42.099l25.977,0c49.275,-11.971 167.759,-35.099 347.663,-35.099c301.91,-0 627.03,61.228 964.36,-9.901Z" />
        </svg>
      </div>
    </Section>
  )
}
