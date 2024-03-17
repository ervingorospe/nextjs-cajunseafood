/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    REACT_APP_FLUX_API: process.env.REACT_APP_FLUX_API
  },
  async redirects() {
    return [
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'promotions'
          }
          
        ],
        "destination": "/menu",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'best_of_the_best'
          }
          
        ],
        "destination": "/menu-and-events",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'catering_and_event_planning'
          }
          
        ],
        "destination": "/catering-and-events",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'raw_menu'
          }
          
        ],
        "destination": "/raw-menu",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'locations'
          }
          
        ],
        "destination": "/locations",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'locations'
          }
          
        ],
        "destination": "/locations",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'photo_tour'
          }
          
        ],
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'about_us'
          }
          
        ],
        "destination": "/about",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'specials'
          }
          
        ],
        "destination": "/menu",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'guest_book'
          }
          
        ],
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'contact'
          }
          
        ],
        "destination": "/contact",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'comments_and_feedback'
          }
          
        ],
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/main/:path",
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'home'
          }
          
        ],
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/main/slideshow",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/main/slideshow/js/graphics",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/main/slideshow/js",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/main/accordion.php",
        "destination": "/menu",
        permanent: true,
      },
      {
        "source": "/main/slideshow/js/graphics/outlines",
        "destination": "/",
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
