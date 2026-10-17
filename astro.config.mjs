// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// ───────── Ajuste estes valores quando criar o repositório ─────────
const SITE = 'https://learn.deividsantos.com.br';
const SITE_PESSOAL = 'https://deividsantos.com.br';
const GITHUB_USER = ''; // ex.: 'deividsantos'. Vazio = sem link do GitHub e sem "Editar página".
const GITHUB_REPO = 'learn';
// ────────────────────────────────────────────────────────────────

const NOME_SITE = 'Modern Workplace na prática';
const DESCRICAO =
  'Tutoriais em português sobre MDM, Jamf Pro, infraestrutura como código e experiência digital do colaborador (DEX) para frotas Apple em ambientes corporativos.';

const autor = {
  '@type': 'Person',
  '@id': `${SITE_PESSOAL}/#deivid`,
  name: 'Deivid Santos',
  url: SITE_PESSOAL,
  jobTitle: 'Especialista em Modern Workplace e gestão de dispositivos Apple',
  knowsAbout: [
    'Gerenciamento de dispositivos Apple',
    'MDM',
    'Jamf Pro',
    'Apple Business Manager',
    'Microsoft Intune',
    'Platform SSO',
    'Infraestrutura como código',
    'Digital Employee Experience',
    'macOS',
  ],
  ...(GITHUB_USER ? { sameAs: [`https://github.com/${GITHUB_USER}`] } : {}),
};

const jsonLdSite = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#site`,
      name: NOME_SITE,
      url: SITE,
      description: DESCRICAO,
      inLanguage: 'pt-BR',
      publisher: { '@id': autor['@id'] },
    },
    autor,
  ],
};

export default defineConfig({
  site: SITE,
  integrations: [
    starlight({
      title: NOME_SITE,
      description: DESCRICAO,
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: { root: { label: 'Português', lang: 'pt-BR' } },
      lastUpdated: true,
      routeMiddleware: './src/routeData.ts',
      customCss: [
        '@fontsource-variable/sora',
        '@fontsource-variable/public-sans',
        '@fontsource/jetbrains-mono/400.css',
        '@fontsource/jetbrains-mono/500.css',
        './src/styles/custom.css',
      ],
      social: GITHUB_USER
        ? [{ icon: 'github', label: 'GitHub', href: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}` }]
        : [],
      ...(GITHUB_USER
        ? { editLink: { baseUrl: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/edit/main/` } }
        : {}),
      head: [
        { tag: 'meta', attrs: { name: 'author', content: 'Deivid Santos' } },
        { tag: 'meta', attrs: { property: 'og:locale', content: 'pt_BR' } },
        { tag: 'meta', attrs: { property: 'og:image', content: `${SITE}/og.png` } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE}/og.png` } },
        { tag: 'link', attrs: { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'llms.txt' } },
        { tag: 'script', attrs: { type: 'application/ld+json' }, content: JSON.stringify(jsonLdSite) },
      ],
      sidebar: [
        {
          label: 'Comece por aqui',
          items: [
            { label: 'Roadmap das trilhas', slug: 'roadmap' },
            { label: 'Sobre o autor e o site', slug: 'sobre' },
          ],
        },
        { label: 'Fundamentos de MDM e ABM', items: [{ autogenerate: { directory: 'fundamentos' } }] },
        { label: 'Jamf Pro na prática', items: [{ autogenerate: { directory: 'jamf-pro' } }] },
        { label: 'IaC para dispositivos', items: [{ autogenerate: { directory: 'iac' } }] },
        { label: 'DEX: experiência do colaborador', items: [{ autogenerate: { directory: 'dex' } }] },
        { label: 'Modern Workplace', items: [{ autogenerate: { directory: 'modern-workplace' } }] },
      ],
    }),
  ],
});
