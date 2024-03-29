/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: 'https://www.cajunseafoodnola.com/',
  generateRobotsTxt: true, // (optional)
  changefreq: 'daily',
  generateIndexSitemap: false,
  exclude: ['/home']
  // ...other options
}

module.exports = config