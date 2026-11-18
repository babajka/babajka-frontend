import TagCard from '@/components/cards/TagCard';
import { TAG_CARD_LARGE, TAG_CARD_SMALL } from '@/components/cards/sizes';
import type { Lang, Topic } from '@/constants';
import { cn } from '@/lib/utils/cn';
import type { LocalizedTag } from '@/utils/getters';

import BlockWrapper from './BlockWrapper';
import { TopicLink } from './TopicLink';

type TagsByTopicProps = {
  topic: Topic;
  style: '1-2' | '2-1';
  tags: LocalizedTag[];
  lang: Lang;
  inViewport?: boolean;
};

// The corners that face the outside of the block. Below `tablet` the two small cards are stacked.
const RADIUS = {
  '1-2': {
    top: '[--r-tl:3px] [--r-tr:3px] tablet:[--r-tl:0px]',
    bottom: '[--r-bl:3px] [--r-br:3px] tablet:[--r-bl:0px]',
    large: '[--r-tl:3px] [--r-bl:3px]',
  },
  '2-1': {
    top: '[--r-tl:3px] [--r-tr:3px] tablet:[--r-tr:0px]',
    bottom: '[--r-bl:3px] [--r-br:3px] tablet:[--r-br:0px]',
    large: '[--r-tr:3px] [--r-br:3px]',
  },
};

/** Legacy blocks/tags/TagsByTopic.js. */
const TagsByTopic = ({ topic, style, tags, lang, inViewport }: TagsByTopicProps) => {
  const [top, bottom, large] = tags;
  if (!top || !bottom || !large) {
    return null;
  }
  const radius = RADIUS[style];

  return (
    // Legacy: the `2-1` style overrode the block's flex, so its label stays on top on phones.
    <BlockWrapper className={style === '2-1' ? 'block' : 'flex flex-col'}>
      <div className="order-1 mt-[30px] mb-[25px] w-full text-center text-sm tracking-[1px] uppercase touch:text-left tablet:order-none tablet:mt-0 tablet:text-right">
        <TopicLink lang={lang} topic={topic} />
      </div>
      <div className="flex flex-row justify-between">
        <div className={cn('flex flex-col justify-between', style === '1-2' && 'order-1')}>
          <div className="mb-0.5 tablet:mb-0">
            <TagCard
              tag={top}
              lang={lang}
              sizeClassName={cn(TAG_CARD_SMALL, radius.top)}
              inViewport={inViewport}
            />
          </div>
          <div>
            <TagCard
              tag={bottom}
              lang={lang}
              sizeClassName={cn(TAG_CARD_SMALL, radius.bottom)}
              inViewport={inViewport}
            />
          </div>
        </div>
        <div className="hidden tablet:block">
          <TagCard
            tag={large}
            lang={lang}
            sizeClassName={cn(TAG_CARD_LARGE, radius.large)}
            inViewport={inViewport}
          />
        </div>
      </div>
    </BlockWrapper>
  );
};

export default TagsByTopic;
