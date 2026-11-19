import ExternalLink from '@/components/ui/ExternalLink';
import {
  PODCASTS_PLATFORMS,
  YANDEX_MUSIC_EMBED_PREFIX,
  YOUTUBE_EMBED_PREFIX,
} from '@/constants/social';

// Legacy components/common/{VideoPlayer,CoubPlayer,AudioPlayer,AudioButtons}.js. Players can stand
// inside a paragraph of the article, so they're spans: a <div> isn't allowed in a <p>.

const INTERACTIVE =
  'mt-[30px] block touch:mt-10 tablet:mt-[50px] tablet-lg:mt-[60px] desktop:mt-[72px]';

export const VideoPlayer = ({ videoId }: { videoId: string }) => (
  <span className={INTERACTIVE}>
    <span className="block h-[200px] tablet:h-[300px] tablet-lg:h-[400px] desktop:h-[600px]">
      <iframe
        className="block size-full"
        title="YouTube"
        loading="lazy"
        src={`${YOUTUBE_EMBED_PREFIX}/${videoId}`}
        allowFullScreen
      />
    </span>
  </span>
);

export const CoubPlayer = ({ coubId }: { coubId: string }) => (
  <span className={INTERACTIVE}>
    <span className="block size-[200px] touch:size-[240px] tablet:size-[300px] tablet-lg:size-[360px] desktop:size-[480px]">
      <iframe
        className="block size-full"
        title="Coub"
        loading="lazy"
        src={`https://coub.com/embed/${coubId}?muted=false&autostart=false&originalSize=false&startWithHD=true`}
        allow="autoplay"
        allowFullScreen
      />
    </span>
  </span>
);

type PlaylistPlayerProps = { playlistUsername: string; playlistId: string };

/** Heights of the Yandex Music player aren't documented; legacy found them empirically. */
export const PlaylistPlayer = ({ playlistUsername, playlistId }: PlaylistPlayerProps) => (
  <span className={INTERACTIVE}>
    <iframe
      className="block h-[480px] w-full tablet:h-[420px]"
      title="Яндекс Музыка"
      loading="lazy"
      src={`${YANDEX_MUSIC_EMBED_PREFIX}/#playlist/${playlistUsername}/${playlistId}`}
    />
  </span>
);

export const AudioButtons = ({ trackIds }: { trackIds: Record<string, string | undefined> }) => (
  <div className={INTERACTIVE}>
    <div className="mb-[30px] flex h-[150px] flex-col flex-wrap justify-between touch:mb-10 touch:h-[165px] tablet:mb-[50px] tablet:h-auto tablet:flex-row tablet:justify-start tablet-lg:mb-[60px] desktop:mb-[72px]">
      {PODCASTS_PLATFORMS.map(({ id, label, link, badgeLink, episodeLink }) => {
        const trackId = trackIds[id];
        return (
          badgeLink && (
            <div key={id} className="mr-[15px]">
              <ExternalLink href={episodeLink && trackId ? episodeLink(trackId) : link}>
                {/* eslint-disable-next-line @next/next/no-img-element -- a fixed height from a CDN */}
                <img
                  className="inline h-10 max-w-none align-baseline touch:h-[45px] tablet:h-[50px]"
                  src={badgeLink}
                  alt={label}
                  loading="lazy"
                />
              </ExternalLink>
            </div>
          )
        );
      })}
    </div>
  </div>
);
