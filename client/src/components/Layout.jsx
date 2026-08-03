import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <Outlet />
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>GrooveShelf</strong>
            <p>Una vitrina simple para discos que merecen volver a sonar.</p>
          </div>
          <span>Proyecto demostrativo MERN · Checkout simulado</span>
        </div>
      </footer>
    </div>
  );
}
