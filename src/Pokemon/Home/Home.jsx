import React, { useEffect, useRef, useState, useCallback } from 'react';
import Loader from '../components/Loader';
import Dropdown from '../components/Dropdown';
import '../style.css'
import Pokecard from '../components/Pokecard';
import { useInfiniteQuery, } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import { addIdToLocalStorage, getIdsFromLocalStorageAsSet, removeIdFromLocalStorage } from '../../util/LocalStorageHelper';

const Home = () => {
    const [search, setSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [localStoreIds, setLocalStoreIds] = useState(getIdsFromLocalStorageAsSet)

    const inputRef = useRef();
    const dropdownRef = useRef();

    const fetchData = async (url) => {
        try {
            const r = await fetch(url);
            const jData = await r.json();
            return jData;
        } catch (error) {
            window.alert(error);
        }
    };


    const fetchList = async ({ pageParam = 0 }) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${pageParam}`);
            const jsonData = await response.json();
            const pokemonData = await Promise.all(jsonData.results.map(item => fetchData(item.url)));

            return pokemonData;
        } catch (error) {
            window.alert(error);
        }
    };

    const { data: pokemons, isLoading, isFetching, fetchNextPage, error } = useInfiniteQuery({
        queryKey: ['Poke'],
        queryFn: fetchList,
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60,
        getNextPageParam: (lastPage, allPages) => {
            const nextOffset = allPages.length * 100;
            return nextOffset >= 1001 ? undefined : nextOffset;
        },
    }
    )

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current && !inputRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const togglePokemonFavorite = useCallback((isFavorite, id) => {
        let ids;
        if (isFavorite) {
            ids = removeIdFromLocalStorage(id);
            toast.dismiss();
            toast('❤️Removed From Favorites')
        } else {
            ids = addIdToLocalStorage(id);
            toast.dismiss();
            toast('❤️Added to Favorites')
        }
        setLocalStoreIds(ids);



    }, []);

    const changeHandler = (e) => {
        let query = e.target.value.toLowerCase();
        setSearch(query);
        let tempFilteredPokemons = [];
        if (query.length > 0) {
            tempFilteredPokemons = pokemons?.pages.flat().filter(item => item.name.toLowerCase().startsWith(query)).map(item => ({
                name: item.name,
                id: item.id,
                url: item.sprites.front_default
            }));
            setFilteredPokemons(tempFilteredPokemons);
            setShowDropdown(true);
        } else {
            setFilteredPokemons([]);
            setShowDropdown(false);
        }
    };

    if (isLoading || isFetching) {
        return <Loader />
    }

    if (error) {
        return <h1 style={{ color: "red" }}>{error.message}</h1>
    }

    return (
        <div>
            <div>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap');
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                </style>


                {pokemons &&
                    <>
                        <form onSubmit={(e) => e.preventDefault()} >
                            <div className="inputt" ref={inputRef}>
                                <span className="material-symbols-outlined searchicon" >search</span>
                                <input className="search-input" type="text" value={search} onChange={changeHandler} />
                                <span className='searchhere'>&nbsp; &#8592; &nbsp; </span>
                                <p className='searchhere'>Search here</p>
                            </div>

                            {showDropdown && <Dropdown suggPokemons={filteredPokemons} dropdownRef={dropdownRef} />}
                        </form>

                        <div className="pokemonscard">
                            {pokemons?.pages.flat().map((item) => {
                                const isFavorite = localStoreIds.has(item.id);
                                return (
                                    <div key={item.id}>
                                        <Pokecard item={item} favoriteclickHandler={togglePokemonFavorite} isFavorite={isFavorite} />
                                    </div>
                                )
                            }
                            )}
                        </div>
                        <button className='LoadMore' onClick={() => fetchNextPage()}>Load More</button>
                    </>
                }
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
            />
        </div>
    );
};

export default Home;
