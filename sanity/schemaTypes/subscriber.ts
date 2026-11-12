import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'subscriber',
  title: 'Newsletter subscriber',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'subscribed',
      options: {
        list: [
          { title: 'Subscribed', value: 'subscribed' },
          { title: 'Unsubscribed', value: 'unsubscribed' },
          { title: 'Bounced', value: 'bounced' },
        ],
      },
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Subscribed from',
      type: 'url',
      description: 'Which post or page drove the signup.',
    }),
    defineField({ name: 'createdAt', title: 'Subscribed at', type: 'datetime' }),
  ],
  orderings: [
    { title: 'Newest first', name: 'createdAtDesc', by: [{ field: 'createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'email', subtitle: 'sourceUrl' },
  },
});
