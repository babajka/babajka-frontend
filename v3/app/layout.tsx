interface Props {
  children: React.ReactNode;
}

const CoreLayout = ({ children }: Props) => {
  return (
    <div>
      <nav>Header</nav>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default CoreLayout;
