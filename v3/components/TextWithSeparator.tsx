import { Fragment, type ReactNode } from 'react';

// Ported from the legacy `lib` submodule (`lib/components/TextWithSeparator.js`): renders `text`
// with `separator` (a <br /> by default) in place of each `symbol`.

type TextWithSeparatorProps = {
  text: string;
  symbol?: '\n' | '<br/>';
  separator?: ReactNode;
};

const TextWithSeparator = ({
  text,
  symbol = '<br/>',
  separator = <br />,
}: TextWithSeparatorProps) => {
  const paragraphs = text.split(symbol);
  const lastIndex = paragraphs.length - 1;

  return paragraphs.map((paragraph, i) => (
    // paragraphs have no stable id, and the list never reorders
    <Fragment key={i}>
      {paragraph}
      {i < lastIndex && separator}
    </Fragment>
  ));
};

export default TextWithSeparator;
