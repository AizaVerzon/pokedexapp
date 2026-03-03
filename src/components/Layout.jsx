// Layout.jsx
function Layout({ children }) {
  return (
    <div className="layout-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-poke">Poké</span>
            <span className="title-dex">dex</span>
          </h1>
          <p className="app-subtitle">Gotta catch 'em all</p>
        </div>
      </header>
      <main className="main-content">{children}</main>
      <footer className="app-footer">
        <p>Made with ❤️ using PokéAPI</p>
      </footer>
    </div>
  );
}

export default Layout;