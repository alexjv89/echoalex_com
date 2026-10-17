// Project kinds and statuses. Kept free of Node imports so client components can use them too.

// `label` is the type filter on /projects/ (in this order); `tag` is the label shown on each project.
export const PROJECT_KINDS = [
  { id: 'build', label: 'Things I built', tag: 'Build' },
  { id: 'software', label: 'Software', tag: 'Software' },
  { id: 'adventure', label: 'Adventures', tag: 'Adventure' },
  { id: 'hobby', label: 'Hobbies', tag: 'Hobby' },
  { id: 'venture', label: 'Ventures', tag: 'Venture' },
  { id: 'talk', label: 'Talks', tag: 'Talk' },
];

export const PROJECT_STATUSES = ['active', 'dormant', 'done', 'dead'];
