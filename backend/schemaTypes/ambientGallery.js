export default {
  name: 'ambientGallery',
  title: 'Ambient Works (imagens)',
  type: 'document',
  fields: [
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
    },
  ],
}
