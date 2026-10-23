// Rebuilds images that were uploaded to Vercel in parts before the site is built.
// Local layout: image-parts/<image name>/<part>.part. Deployed layout (shorter paths): ip/<id>/<part>,
// with ip/map.json mapping each <id> to its image name. Parts are joined in name order.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

function assemble(dir, name, filter) {
  const parts = readdirSync(dir).filter(filter).sort()
  const out = join('public/images', name)
  writeFileSync(out, Buffer.concat(parts.map((f) => readFileSync(join(dir, f)))))
  console.log(`assembled ${out} from ${parts.length} parts`)
}

if (existsSync('image-parts')) {
  for (const name of readdirSync('image-parts')) assemble(join('image-parts', name), name, (f) => f.endsWith('.part'))
}

if (existsSync('ip/map.json')) {
  const map = JSON.parse(readFileSync('ip/map.json', 'utf8'))
  for (const [id, name] of Object.entries(map)) assemble(join('ip', id), name, () => true)
}
