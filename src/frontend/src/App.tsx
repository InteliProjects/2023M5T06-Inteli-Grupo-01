import { BrowserRouter } from 'react-router-dom';
import Router from './router/router';
import Sidebar from './components/UI/Sidebar/Sidebar';

function App() {
    return (
        <>
            <BrowserRouter>
                <Sidebar />
                <main className='flex flex-col overflow-y-auto w-10/12 bg-white font-inteli'>
                    <Router />
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
