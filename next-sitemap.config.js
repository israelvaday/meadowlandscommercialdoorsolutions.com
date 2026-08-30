module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://meadowlandscommercialdoorsolutions.com",
  generateRobotsTxt: false, // we ship a custom robots.ts
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/thank-you", "/api/*"],
};
