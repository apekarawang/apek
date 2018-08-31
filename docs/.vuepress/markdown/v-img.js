function markdownitLinkifyImages(
  md,
  config = {
    target: '_self',
    classes: ['v-imgify'],
  }
) {
  md.renderer.rules.image = function(tokens, idx, options, env, self) {
    config = config || {}
    const token = tokens[idx]
    const srcIndex = token.attrIndex('src')
    const url = token.attrs[srcIndex][1]
    let title = ''

    const caption = token.content

    if (token.attrIndex('title') !== -1) {
      title = ' title="' + token.attrs[token.attrIndex('title')][1] + '"'
    }

    return `
    <a href="${url}" class="${config.classes.join(' ')}" target="${
      config.target
    }">
      <v-img src="@public${url}" alt="${caption}" ${title} />
    </a>
    `
  }
}

module.exports = markdownitLinkifyImages
