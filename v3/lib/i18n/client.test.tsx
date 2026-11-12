import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ClientText, I18nProvider, useLang, useT } from '@/lib/i18n/client';
import { getMessages, type DictKey } from '@/lib/i18n/dict';

const Probe = ({ id }: { id: DictKey }) => {
  const t = useT();
  return (
    <p>
      {useLang()}:{t(id)}
    </p>
  );
};

describe('lib/i18n/client', () => {
  it('should translate with the provided locale', () => {
    render(
      <I18nProvider lang="en" messages={getMessages('en')}>
        <Probe id="footer.rss" />
      </I18nProvider>
    );
    expect(screen.getByText(`en:${getMessages('en')['footer.rss']}`)).toBeInTheDocument();
  });

  it('should render the first || part by default and all parts with render', () => {
    const messages = getMessages('be');
    const [first, second] = messages['common.motto'].split('||');
    render(
      <I18nProvider lang="be" messages={messages}>
        <span data-testid="default">
          <ClientText id="common.motto" />
        </span>
        <span data-testid="render">
          <ClientText id="common.motto" render={(a, b) => `${a}|${b.trim()}`} />
        </span>
      </I18nProvider>
    );
    expect(screen.getByTestId('default')).toHaveTextContent(first);
    expect(screen.getByTestId('render')).toHaveTextContent(`${first}|${second.trim()}`);
  });

  it('should render the key without a provider', () => {
    render(<Probe id="footer.rss" />);
    expect(screen.getByText('be:footer.rss')).toBeInTheDocument();
  });
});
