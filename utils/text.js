const getTruncatedText = (text, maxLength) => {
  const words = text.split(' ');
  return `${words.slice(0, maxLength).join(' ')}...`;
};

export { getTruncatedText as default };
