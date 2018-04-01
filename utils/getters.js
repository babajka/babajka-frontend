export const getLocalizedBrand = ({ slug, imageUrl, names }, lang = 'be') => ({
  slug,
  imageUrl,
  name: names[lang],
});

export const getLocalizedBrands = (brands, lang = 'be') =>
  brands && brands.map(brand => getLocalizedBrand(brand, lang));

export const getLocalizedArticle = (article, lang = 'be') => article && article.locales[lang];

export const getLocalizedArticles = (articles, lang = 'be') =>
  articles.map(({ brand, type, locales, author, imageUrl }) => ({
    ...locales[lang],
    author,
    imageUrl,
    brand: getLocalizedBrand(brand, lang),
    type,
  }));
