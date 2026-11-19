'use client';

import Script from 'next/script';
import { useEffect } from 'react';

import Spinner from '@/components/ui/Spinner';

declare global {
  interface Window {
    Playbuzz?: { render: () => void };
  }
}

/** Legacy features/ex-co-quiz. `onReady` also runs when the SDK is already on the page. */
export const ExCoQuiz = ({ id }: { id: string }) => (
  <>
    <Script
      id="playbuzz-sdk"
      src="https://embed.ex.co/sdk.js"
      onReady={() => window.Playbuzz?.render()}
    />
    <div className="playbuzz" data-id={id} data-show-share="false" data-show-info="false">
      <div className="flex flex-row justify-center text-primary">
        <Spinner className="text-[2em]" />
      </div>
    </div>
  </>
);

const FILLOUT_SDK_ID = 'fillout-sdk';

/**
 * Legacy features/fillout-quiz. The SDK only scans the page when it runs, so it's added again on
 * every mount, which `next/script` doesn't do: it loads a script once per page session.
 */
export const FilloutQuiz = ({ id }: { id: string }) => {
  useEffect(() => {
    document.getElementById(FILLOUT_SDK_ID)?.remove();
    const script = document.createElement('script');
    script.id = FILLOUT_SDK_ID;
    script.src = 'https://server.fillout.com/embed/v1/';
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="w-full"
      data-fillout-id={id}
      data-fillout-embed-type="standard"
      data-fillout-inherit-parameters
      data-fillout-dynamic-resize
    />
  );
};
