const path = require('path')
const fs = require('fs')
const glob = require('glob')
const deepmerge = require('deepmerge')

const config = require('../docs/.vuepress/config.js')

const cwd = path.resolve(__dirname, '..', 'docs', '.vuepress', 'dist')

const files = glob
  .sync('**/*.html', { cwd })
  .filter(f => f.indexOf('404.html') === -1)

let headers = []

for (let x = 0; x < files.length; x++) {
  const file = fs.readFileSync(`${cwd}/${files[x]}`)
  const regex = /<link.*rel=(?:'|")(preload|prefetch)(?:'|").*>/g
  const found = file.toString('utf-8').match(regex)

  if (!found) continue

  const lines = found[0].split('<link').filter(x => x)
  let values = []
  lines.forEach(line => {
    /*
     * we care about order
     * line.match(/rel=(?:'|")(.*)(?:'|")\shref=(?:'|")(.*)(?:'|")\sas=(?:'|")(.*)(?:'|")/)
     */

    const rel = line.match(/rel=(?:'|")(.*?)(?:'|")/)
    const type = line.match(/as=(?:'|")(.*?)(?:'|")/)
    const href = line.match(/href=(?:'|")(.*?)(?:'|")/)
    let value = `<${href[1]}>; rel=${rel[1]}`

    if (type) {
      value += `; as=${type[1]}`
    }

    values.push(value)
  })

  headers.push({
    path: '/' + files[x].replace(/index\.html$/, ''),
    header: values.join(', '),
  })
}

const netlify = process.env.NETLIFY || process.env.NETLIFY_REPO_URL
if (netlify) {
  console.log(`netlify detected: ${netlify}`)
  console.log(`creating file: ${cwd}/_headers`)
  const netlifyHeader = headers.map(h => `${h.path}\n\tLink: ${h.header}`)
  fs.appendFileSync(cwd + '/_headers', '\n' + netlifyHeader.join('\n'))
} else {
  console.log(`netlify not detected`)
  console.log(`updating file: ./firebase.json`)
  const fath = path.resolve(__dirname, '..', 'firebase.json')
  let firebase = fs.readFileSync(fath)
  firebase = JSON.parse(firebase.toString())

  const pushHeader = headers.map(h => {
    return {
      source: h.path,
      headers: [
        {
          key: 'Link',
          value: h.header,
        },
      ],
    }
  })

  firebase = deepmerge(firebase, { hosting: { headers: pushHeader } })

  fs.writeFileSync(fath, JSON.stringify(firebase, null, 2))
}
