export default {
  name: 'ambientItem',
  title: 'Ambient Works',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year (optional)',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 1),
    },
    {
      name: 'featured',
      title: 'Show in Works ',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text (optional)'}],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {title: 'title', year: 'year', media: 'image'},
    prepare({title, year, media}) {
      return {
        title: title || 'Ambient',
        subtitle: year ? String(year) : 'Ambient',
        media,
      }
    },
  },
}
