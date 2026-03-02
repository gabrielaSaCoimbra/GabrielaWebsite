export default {
  name: 'worksOverview',
  title: 'Works Overview (Landing Page)',
  type: 'document',
  fields: [
    {
      name: 'tiles',
      title: 'Tiles',
      type: 'array',
      validation: (Rule) => Rule.required().min(4).max(4),
      of: [
        {
          name: 'tile',
          title: 'Tile',
          type: 'object',
          fields: [
            {
              name: 'key',
              title: 'Section',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  {title: 'Ambient', value: 'ambient'},
                  {title: 'Architecture', value: 'architecture'},
                  {title: 'Product', value: 'product'},
                  {title: 'Exhibition', value: 'exhibition'},
                ],
                layout: 'dropdown',
              },
            },
            
            {
              name: 'image',
              title: 'Thumbnail image',
              type: 'image',
              options: {hotspot: true},
              fields: [{name: 'alt', title: 'Alt text (optional)', type: 'string'}],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'enabled',
              title: 'Enabled',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              title: 'title',
              key: 'key',
              media: 'image',
            },
            prepare({title, key, media}) {
              return {
                title: title || (key ? key.toUpperCase() : 'Tile'),
                subtitle: 'Landing tile',
                media,
              }
            },
          },
        },
      ],
    },
  ],
}
