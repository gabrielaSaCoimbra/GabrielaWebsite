export default {
  name: 'project',
  title: 'Architecture, Product, Exhibition Works',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Architecture Works', value: 'architecture'},
          {title: 'Product Works', value: 'product'},
          {title: 'Exhibition Works', value: 'exhibition'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'featured',
      title: 'Show in Works (Selected)',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'year',
      title: 'Year (optional)',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 1),
    },
    {
      name: 'client',
      title: 'Client (optional)',
      type: 'string',
    },

    {
      name: 'description',
      title: 'Description (optional)',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {name: 'href', type: 'url', title: 'URL'},
                  {name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: true},
                ],
              },
            ],
          },
        },
      ],
    },

    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Alt text (optional)'}],
        },
      ],
      validation: (Rule) => Rule.min(1),
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'images.0',
    },
    prepare({title, subtitle, media}) {
      const map = {
        architecture: 'Architecture',
        product: 'Product',
        exhibition: 'Exhibition',
      }
      return {
        title,
        subtitle: map[subtitle] || subtitle,
        media,
      }
    },
  },
}
