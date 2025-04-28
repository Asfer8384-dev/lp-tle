export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(`User-agent: *
  Disallow:
  Sitemap: https://www.urbanrisethelakesedge.com/sitemap.xml`);
}
