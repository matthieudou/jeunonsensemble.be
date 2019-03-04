<template>
  <div>
    <h2
      :id="sectionObject.slug"
      class="text-xl font-bold mt-12 anchor"
    >
      <nuxt-link
        :to="{hash: sectionObject.slug}"
        @click.native="$scrollTo(sectionObject.slug)"
        class="text-blue-dark no-underline text-secondary"
      >
        {{ sectionObject.title }}
      </nuxt-link>
    </h2>

    <div
      class="mt-6 tracking-wide leading-normal"
      v-html="renderedHtml"
    />
  </div>
</template>

<script>
  import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
  import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

  export default {
    props: {
      section: {
        type: Object,
        default: () => ({})
      }
    },

    data () {
      return {
        sectionObject: this.section.fields
      }
    },

    computed: {
      document () {
        return this.sectionObject.content
      },
      renderedHtml () {
        return documentToHtmlString(this.document, options)
      }
    }
  }

  const options = {
    renderMark: {
      [MARKS.BOLD]: text => `<b>${text}</b>`,
      [MARKS.UNDERLINE]: text => `<u>${text}</u>`,
      [MARKS.ITALIC]: text => `<i>${text}</i>`,
      [MARKS.CODE]: text => `<code>${text}</code>`
    },

    renderNode: {
      [BLOCKS.HEADING_5]: (node, next) => `
        <h5>${next(node.content)}</h5>
      `,
      [BLOCKS.HEADING_6]: (node, next) => `
        <h6>${next(node.content)}</h6>
      `,
      [BLOCKS.QUOTE]: (node, next) => `
        <blockquote class="border-l-4 border-blue-lighter p-2 pl-4 text-grey-darker -ml-6">${next(node.content)}</blockquote>
      `,
      [BLOCKS.HR]: () => `
        <div class="my-6 border-b-2 border-blue w-24 h-0"></div>
      `,
      [BLOCKS.EMBEDDED_ASSET]: (node) => `
        <div class="my-4">
          <img class="h-48 w-64 max-w-full object-cover rounded-lg shadow-lg" src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}">
        </div>
      `,
      [INLINES.HYPERLINK]: (node, next) => `
        <a class="text-blue underline" href="${node.data.uri}" target="_blank">
          ${next(node.content)}
        </a>
      `,
      [INLINES.ASSET_HYPERLINK]: (node, next) => `
        <a class="text-blue underline" href="${node.data.target.fields.file.url}" target="_blank">
          ${next(node.content)}
        </a>
      `
    }
  }
</script>
