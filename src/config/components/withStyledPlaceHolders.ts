import { ELEMENT_H1, ELEMENT_PARAGRAPH, withPlaceholders } from '@udecode/plate'

export const withStyledPlaceHolders = (components: any) =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type / for commands',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H1,
      placeholder: 'Type / for commands',
      hideOnBlur: false,
    },
  ])
