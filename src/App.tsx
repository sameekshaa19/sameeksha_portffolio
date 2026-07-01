import { useState } from 'react';
import { Navbar } from './components/navbar/Navbar';
import { Landing } from './pages/Landing/Landing';
import { About } from './pages/About/About';
import { BootSequence } from './components/transitions/BootSequence';
import { ScrollManager } from './components/transitions/ScrollManager';

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <BootSequence onComplete={() => setBooted(true)} />
      
      <ScrollManager locked={!booted}>
        {booted && (
          <>
            <Navbar />
            <main className="w-full">
              <Landing />
              <About />
            </main>
          </>
        )}
      </ScrollManager>
    </>
  );
}

export default App;
