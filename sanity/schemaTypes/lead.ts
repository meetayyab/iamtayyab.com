import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  // Leads are written by the site's API route, never hand-authored.
  readOnly: false,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'company', title: 'Company / product', type: 'string' }),
    defineField({
      name: 'projectType',
      title: 'Project type',
      type: 'string',
      options: {
        list: [
          { title: 'New build (web)', value: 'new-web' },
          { title: 'New build (mobile)', value: 'new-mobile' },
          { title: 'Add to an existing product', value: 'existing' },
          { title: 'Fix / rescue a stalled project', value: 'rescue' },
          { title: 'Ongoing retainer', value: 'retainer' },
          { title: 'Something else', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'budget',
      title: 'Budget range',
      type: 'string',
      options: {
        list: [
          { title: 'Under $5k', value: 'under-5k' },
          { title: '$5k – $15k', value: '5-15k' },
          { title: '$15k – $50k', value: '15-50k' },
          { title: '$50k+', value: '50k-plus' },
          { title: 'Monthly retainer', value: 'retainer' },
          { title: 'Not sure yet', value: 'unsure' },
        ],
      },
    }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 6 }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Replied', value: 'replied' },
          { title: 'In conversation', value: 'in-conversation' },
          { title: 'Won', value: 'won' },
          { title: 'Lost', value: 'lost' },
          { title: 'Spam', value: 'spam' },
        ],
      },
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Submitted from',
      type: 'url',
      description: 'The page the form was submitted from — shows which post produced the lead.',
    }),
    defineField({ name: 'sourceLabel', title: 'CTA label', type: 'string' }),
    defineField({ name: 'createdAt', title: 'Received', type: 'datetime' }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'company', status: 'status', createdAt: 'createdAt' },
    prepare({ title, subtitle, status, createdAt }: any) {
      const when = createdAt ? new Date(createdAt).toISOString().slice(0, 10) : '';
      return {
        title: `${title || 'Unknown'}${status && status !== 'new' ? ` · ${status}` : ''}`,
        subtitle: [subtitle, when].filter(Boolean).join(' · '),
      };
    },
  },
});
