import ImageBlock from 'Dante2/lib/components/blocks/imageByLink';
import PlaceholderBlock from 'Dante2/lib/components/blocks/placeholder';
import { resetBlockWithType, addNewBlockAt } from 'Dante2/lib/model';

import { IMAGE_CLASS_BY_DIR } from './config';

const image = {
  type: 'image',
  icon: 'embed',
  title: 'add image by link',
  block: ImageBlock,
  renderable: true,
  editable: true,
  breakOnContinuous: true,
  wrapper_class: 'graf graf--figure',
  selected_class: 'is-selected is-mediaFocused',
  widget_options: {
    displayOnInlineTooltip: true,
    insertion: 'placeholder',
    insert_block: 'image',
  },
  options: {
    imageCaptionPlaceholder: 'Add Capture',
    placeholder: 'Paste a link to image and press Enter',
  },
  selectedFn: block => {
    const { direction } = block.getData().toJS();
    return IMAGE_CLASS_BY_DIR[direction] || null;
  },
  handleEnterWithoutText(ctx, block) {
    const { editorState } = ctx.state;
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
  },
  handleEnterWithText(ctx, block) {
    const { editorState } = ctx.state;
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
  },
};

const placeholder = {
  type: 'placeholder',
  block: PlaceholderBlock,
  renderable: true,
  editable: true,
  wrapper_class: 'is-embedable',
  selected_class: ' is-selected is-mediaFocused',
  widget_options: {
    displayOnInlineTooltip: false,
  },
  handleEnterWithText(ctx, block) {
    const { editorState } = ctx.state;
    const data = {
      provisory_text: block.getText(),
      endpoint: block.getData().get('endpoint'),
      type: block.getData().get('type'),
    };

    return ctx.onChange(resetBlockWithType(editorState, data.type, data));
  },
};

export default [image, placeholder];
