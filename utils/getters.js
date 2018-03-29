export const getLocalizedBrand = (brand, lang = 'be') => ({
  slug: brand.slug,
  name: brand.names[lang],
});

export const getLocalizedBrands = (brands, lang = 'be') =>
  brands && brands.map(brand => getLocalizedBrand(brand, lang));

export const getAuthor = author => author && `${author.firstName} ${author.lastName}`;

export const getLocalizedArticle = (article, lang = 'be') => article && article.locales[lang];

export const getLocalizedArticles = (articles, lang = 'be') =>
  articles.map(({ brand, type, locales, author }) => ({
    ...locales[lang],
    brand: getLocalizedBrand(brand, lang),
    author: getAuthor(author),
    type,
  }));
