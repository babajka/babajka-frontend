import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ErrorMessage from '@/components/layout/ErrorMessage';
import GoUp from '@/components/layout/GoUp';
import LangSwitch from '@/components/layout/LangSwitch';
import Burger from '@/components/layout/Burger';
import Shell from '@/components/layout/Shell';
import SubscribeForm from '@/components/layout/SubscribeForm';
import ShareButtons from '@/components/social/ShareButtons';
import { I18nProvider } from '@/lib/i18n/client';
import { getMessages } from '@/lib/i18n/dict';

vi.mock('next/navigation', () => ({ usePathname: () => '/be/article/kupala' }));

const be = getMessages('be');
const withI18n = (ui: React.ReactNode) => (
  <I18nProvider lang="be" messages={be}>
    {ui}
  </I18nProvider>
);

describe('components/layout', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    document.cookie = 'WIR_LOCALE=; max-age=0; path=/';
  });

  describe('Shell + Burger (off-canvas sidebar)', () => {
    const renderShell = () =>
      render(
        withI18n(
          <Shell
            header={<Burger />}
            sidebar={<a href="https://wir.by/about">about</a>}
            footer={<p>footer</p>}
          >
            <p>content</p>
          </Shell>
        )
      );

    it('should toggle the sidebar with the burger and wire aria-controls', () => {
      renderShell();
      const burger = screen.getByRole('button', { name: be['sidebar.open'] });
      const nav = document.getElementById(burger.getAttribute('aria-controls')!);

      expect(nav?.tagName).toBe('NAV');
      expect(burger).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(burger);
      expect(burger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should close when a sidebar link is followed', () => {
      renderShell();
      const burger = screen.getByRole('button', { name: be['sidebar.open'] });
      fireEvent.click(burger);
      fireEvent.click(screen.getByText('about'));
      expect(burger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should wrap the footer so error pages can hide it', () => {
      renderShell();
      expect(screen.getByText('footer').closest('.wir-footer')).toBeInTheDocument();
      expect(screen.getByRole('main')).toHaveTextContent('content');
    });
  });

  describe('LangSwitch', () => {
    it('should link to the same page in the other locales and remember the choice', () => {
      render(withI18n(<LangSwitch />));
      const ru = screen.getByRole('link', { name: 'по-русски' });

      expect(ru).toHaveAttribute('href', '/ru/article/kupala');
      expect(screen.getByRole('link', { name: 'in english' })).toHaveAttribute(
        'href',
        '/en/article/kupala'
      );
      expect(screen.queryByRole('link', { name: 'па-беларуску' })).not.toBeInTheDocument();

      fireEvent.click(ru);
      expect(document.cookie).toContain('WIR_LOCALE=ru');
    });
  });

  describe('SubscribeForm', () => {
    const type = (value: string) =>
      fireEvent.change(screen.getByRole('textbox'), { target: { value } });

    it('should post the email with the locale and show the confirmation', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ emailAddress: 'a@b.by' }),
      });
      vi.stubGlobal('fetch', fetchMock);
      render(withI18n(<SubscribeForm />));

      type('a@b.by');
      fireEvent.submit(screen.getByRole('textbox').closest('form')!);

      await screen.findByRole('status');
      expect(screen.getByRole('status')).toHaveTextContent('a@b.by');
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/mail',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            emailAddress: 'a@b.by',
            userStatus: 'subscribed',
            language: 'be',
          }),
        })
      );
    });

    it('should not submit an invalid email', () => {
      const fetchMock = vi.fn();
      vi.stubGlobal('fetch', fetchMock);
      render(withI18n(<SubscribeForm />));

      type('not-an-email');
      fireEvent.submit(screen.getByRole('textbox').closest('form')!);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('should show an error when the backend fails', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
      render(withI18n(<SubscribeForm />));

      type('a@b.by');
      fireEvent.submit(screen.getByRole('textbox').closest('form')!);
      expect(await screen.findByText(be['errors.500-title'])).toBeInTheDocument();
    });
  });

  describe('ShareButtons', () => {
    it('should open the network share dialog with the page URL', () => {
      const open = vi.fn();
      vi.stubGlobal('open', open);
      render(withI18n(<ShareButtons basicText="Wir" />));

      fireEvent.click(screen.getByRole('button', { name: be['common.share-telegram'] }));
      const [url] = open.mock.calls[0];
      expect(url).toBe(
        `https://telegram.me/share?url=${encodeURIComponent(`https://wir.by${window.location.pathname}`)}`
      );
    });

    it('should share the site root with noAsPath', () => {
      const open = vi.fn();
      vi.stubGlobal('open', open);
      render(withI18n(<ShareButtons basicText="Wir" noAsPath />));

      fireEvent.click(screen.getByRole('button', { name: be['common.share-vk'] }));
      expect(open.mock.calls[0][0]).toBe(
        'https://vk.com/share.php?url=https%3A%2F%2Fwir.by&title=Wir'
      );
    });
  });

  describe('GoUp', () => {
    beforeEach(() => {
      vi.stubGlobal('matchMedia', () => ({ matches: false }));
    });

    it('should appear after scrolling 160px and scroll back to the top', () => {
      const scrollTo = vi.fn();
      vi.stubGlobal('scrollTo', scrollTo);
      render(<GoUp />);
      const button = screen.getByRole('button', { hidden: true });
      expect(button).toHaveAttribute('aria-hidden', 'true');

      act(() => {
        vi.stubGlobal('scrollY', 400);
        window.dispatchEvent(new Event('scroll'));
      });
      expect(button).toHaveAttribute('aria-hidden', 'false');
      fireEvent.click(button);
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
  });

  describe('ErrorMessage', () => {
    it('should render the localized 404 and mark the page to hide the footer', async () => {
      const { container } = render(<ErrorMessage code={404} lang="ru" />);
      const ru = getMessages('ru');

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        `404 ${ru['errors.404-title']}`
      );
      expect(screen.getByRole('link', { name: ru['errors.go-to-main'] })).toHaveAttribute(
        'href',
        '/ru'
      );
      expect(
        screen.getAllByRole('link', { name: /Facebook|Instagram|Telegram|YouTube/ })
      ).toHaveLength(4);
      expect(container.querySelector('[data-hide-footer]')).toBeInTheDocument();
      await waitFor(() => expect(document.title).toBe(`${ru['errors.404-title']} | Wir.by`));
    });
  });
});
