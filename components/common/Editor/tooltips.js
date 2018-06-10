import DanteImagePopover from 'Dante2/lib/components/popovers/image';
import DanteAnchorPopover from 'Dante2/lib/components/popovers/link';
import DanteInlineTooltip from 'Dante2/lib/components/popovers/addButton';
import DanteTooltip from 'Dante2/lib/components/popovers/toolTip';

export default [
  {
    ref: 'insert_tooltip',
    component: DanteTooltip,
    displayOnSelection: true,
    selectionElements: [
      'unstyled',
      'blockquote',
      'ordered-list',
      'unordered-list',
      'unordered-list-item',
      'ordered-list-item',
      'code-block',
      'header-one',
      'header-two',
      'header-three',
      'header-four',
    ],
    widget_options: {
      block_types: [
        // {label: 'p', style: 'unstyled'},
        { label: 'h2', style: 'header-one', type: 'block' },
        { label: 'h3', style: 'header-two', type: 'block' },
        { label: 'h4', style: 'header-three', type: 'block' },
        { label: 'blockquote', style: 'blockquote', type: 'block' },
        { label: 'insertunorderedlist', style: 'unordered-list-item', type: 'block' },
        { label: 'insertorderedlist', style: 'ordered-list-item', type: 'block' },
        { label: 'code', style: 'code-block', type: 'block' },
        { label: 'bold', style: 'BOLD', type: 'inline' },
        { label: 'italic', style: 'ITALIC', type: 'inline' },
      ],
    },
  },
  {
    ref: 'add_tooltip',
    component: DanteInlineTooltip,
  },
  {
    ref: 'anchor_popover',
    component: DanteAnchorPopover,
  },
  {
    ref: 'image_popover',
    component: DanteImagePopover,
  },
];
