import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Details from './Details/Details'
import Favorites from './Favorites/Favorites'
import './style.css'
import Home from './Home/Home'
import Guess from './Guess/Guess'
import NotFound from './components/NotFound'
import Landing from './Landing'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const Pokemon = () => {
    const queryClient = new QueryClient();
    const location = useLocation();
    const isLandingPage = location.pathname === "/";

    return (
        <div>
            <>
                <QueryClientProvider client={queryClient}>
                    {!isLandingPage && <Navbar />}
                    <Routes>
                        <Route path='/' element={<Landing />} />
                        <Route path='/pokemons' element={<Home />} />
                        <Route path='/Favorites' element={<Favorites />} />
                        <Route path='/details/:id' element={<Details />} />
                        <Route path='/guess/' element={<Guess />} />
                        <Route path='/404' element={<NotFound />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </QueryClientProvider>
            </>
        </div>
    )
}

export default Pokemon
