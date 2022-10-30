import '../styles/globals.css';

// This request should be cached with a lifetime of 10 seconds.
// Similar to `getStaticProps` with the `revalidate` option.
// fetch(URL, { next: { revalidate: 10 } });

const HomePage = () => {
  return <h1>Welcome to Babajka v3</h1>;
};

export default HomePage;
