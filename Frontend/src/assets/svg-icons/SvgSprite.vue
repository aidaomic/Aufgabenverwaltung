<template>
  <svg width="0" height="0" style="display: none;" v-html="$options.svgSprite" />
</template>

<script>
const svgContext = require.context(
  '!svg-inline-loader?' + 
  'removeTags=true' + // remove title tags, etc.
  '&removeSVGTagAttrs=true' + // enable removing attributes
  '&removingTagAttrs=fill' + // remove fill attributes
  '!@/assets/svg-icons/tabler-icons', // search this directory
  true, // search subdirectories
  /\w+\.svg$/i // only include SVG files
)
const symbols = svgContext.keys().map(path => {
    let fileContent = svgContext(path)

    const id = path.replace(/^\.\/(.*)\.\w+$/, '$1')

    fileContent = fileContent
		.replace(/<svg[^>]+>/g, "")
		.replace(/<\/svg>/g, "")
		.replace(/\n+/g, "")
		.replace(/>\s+</g, "><")
		.trim();

    let svgContent = `<symbol id="${id}" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${fileContent}</symbol>`;
    return svgContent
})
export default {
  name: 'SvgSprite',
  svgSprite: symbols.join('\n'), // concatenate all symbols into $options.svgSprite
}
</script>