import type { ReactNode } from 'react';

import { isKnownTopic } from '@/constants';
import { renderTag, TagLink } from '@/components/tags';
import Link from '@/components/ui/Link';
import { getLang, Text } from '@/lib/i18n/server';
import { getSidebar } from '@/lib/loaders';
import { routes } from '@/lib/routes';
import { localizeData, type LocalizedTag, type RawBlocksData } from '@/utils/getters';

import LangSwitch from './LangSwitch';
import SidebarClose from './SidebarClose';

type SidebarData = {
  blocks: { topic: string; tags: string[] }[];
  data: RawBlocksData;
};

const SidebarSection = ({
  title,
  items,
  footer,
}: {
  title: ReactNode;
  items: { id: string; node: ReactNode }[];
  footer: ReactNode;
}) => (
  <section className="border-t-[0.5px] border-grey pt-[60px] pb-[70px]">
    <ul className="m-0 p-0 text-xl text-primary">
      <li className="list-none py-1.5 text-base tracking-[1px] text-black uppercase">{title}</li>
      {items.map(({ id, node }) => (
        <li key={id} className="list-none py-1.5">
          {node}
        </li>
      ))}
    </ul>
    <span className="mt-[30px] inline-block text-base tracking-[1px] text-primary uppercase">
      {footer}
    </span>
  </section>
);

const loadSidebar = async (): Promise<SidebarData | null> => {
  try {
    return (await getSidebar()) as SidebarData;
  } catch (error) {
    // The sidebar must not take the page down (legacy fetched it client-side and showed nothing).
    console.error('Sidebar: backend request failed', error);
    return null;
  }
};

/**
 * Legacy components/layout/Sidebar.js. The topics and tags come from the backend, now fetched on
 * the server through the cached loader instead of in a useEffect.
 */
const Sidebar = async () => {
  const lang = await getLang();
  const sidebar = await loadSidebar();
  const tagsById = sidebar ? (localizeData(sidebar.data, lang).tags ?? {}) : {};

  return (
    <aside className="relative box-border min-h-screen w-screen max-w-[300px] min-w-[240px] bg-concrete px-6 pt-[21px] pb-[120px] text-base leading-6 tablet:w-[calc(240px+(100vw-1360px)/4)] sidebar:h-full">
      <SidebarClose />
      <LangSwitch />

      <div className="mb-8 tracking-[1px] uppercase">
        <Link href={routes.about(lang)}>
          <Text id="sidebar.about" />
        </Link>
      </div>

      {sidebar?.blocks.map(({ topic, tags }) =>
        isKnownTopic(topic) ? (
          <SidebarSection
            key={topic}
            title={<Text id={`topic.${topic}_essentials`} />}
            items={tags
              .map(id => tagsById[id])
              .filter((tag): tag is LocalizedTag => Boolean(tag))
              .map(tag => ({
                id: tag.id,
                node: (
                  <TagLink lang={lang} topic={tag.topicSlug} tag={String(tag.slug)}>
                    {renderTag(tag)}
                  </TagLink>
                ),
              }))}
            footer={
              <Link href={routes.topic(lang, topic)}>
                <Text id={`topic.${topic}_all_mainPage`} />
              </Link>
            }
          />
        ) : null
      )}
    </aside>
  );
};

export default Sidebar;
