import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Board from './components/Board';
import { ModalContextProvider } from './context/ModalContext';
import { AppContextProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [hideSidebar, setHideSidebar] = useState<boolean>(false);

  return (
    <div className="relative w-full bg-secondary-gray">
      <ErrorBoundary>
        <AppContextProvider>
          <ModalContextProvider>
            <Navbar />
            <main className="relative flex min-h-screen">
              <Sidebar
                sidebarHeight={sidebarHeight}
                setHideSidebar={setHideSidebar}
                hideSidebar={hideSidebar}
              />
              <Board
                setSidebarHeight={setSidebarHeight}
                hideSideBar={hideSidebar}
              />
            </main>
          </ModalContextProvider>
        </AppContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
