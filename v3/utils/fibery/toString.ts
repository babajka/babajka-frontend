// Ported from legacy `utils/fibery/toString.js`: the plain text of a Fibery document.
export type FiberyMark = { type: string; attrs?: { href?: string; title?: string } };

export type FiberyNode = {
  type: string;
  text?: string;
  content?: FiberyNode[];
  marks?: FiberyMark[];
  attrs?: FiberyAttrs;
};

export type FiberyAttrs = {
  guid?: string;
  level?: number;
  src?: string;
  alt?: string;
  title?: string;
  colspan?: number;
  rowspan?: number;
  background?: string;
  id?: string;
  typeId?: string;
};

type Options = { useBreak?: boolean };

const convertNode = (node: FiberyNode, options: Options): string => {
  if (node.type === 'text') {
    return node.text ?? '';
  }
  if (node.type === 'paragraph') {
    return `${fiberyToString(node.content, options)}${options.useBreak ? '\n' : ''}`;
  }
  return '';
};

export function fiberyToString(content: unknown, options: Options = {}): string {
  if (!Array.isArray(content)) {
    return '';
  }
  return (content as FiberyNode[]).map(node => convertNode(node, options)).join('');
}
