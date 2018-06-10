import ImageBlock from 'Dante2/lib/components/blocks/image';

import { addNewBlockAt } from 'Dante2/lib/model';

const image = {
  title: 'add an image',
  icon: 'image',
  type: 'image',
  block: ImageBlock,
  editable: true,
  renderable: true,
  breakOnContinuous: true,
  wrapper_class: 'graf graf--figure',
  selected_class: 'is-selected is-mediaFocused',
  selectedFn: block => {
    const { direction } = block.getData().toJS();
    switch (direction) {
      case 'left':
        return 'graf--layoutOutsetLeft';
      case 'center':
        return '';
      case 'wide':
        return 'sectionLayout--fullWidth';
      case 'fill':
        return 'graf--layoutFillWidth';
      default:
        return null;
    }
  },
  handleEnterWithoutText(ctx, block) {
    const { editorState } = ctx.state;
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
  },
  handleEnterWithText(ctx, block) {
    const { editorState } = ctx.state;
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
  },
  widget_options: {
    displayOnInlineTooltip: true,
    insertion: 'upload',
    insert_block: 'image',
  },
  options: {
    upload_url: '',
    upload_headers: '',
    upload_formName: '',
    upload_callback: '',
    image_delete_callback: '',
    image_caption_placeholder: '',
  },
};

export default [image];
