import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { PokeColors } from './Constants';

const Pokecard = ({ item, favoriteclickHandler, isFavorite }) => {
    const navigate = useNavigate();

    const pokecardClickHandler = (id) => {
        navigate(`/details/${id}`);
    };

    const favoriteClickHandler = (e) => {
        e.stopPropagation();
        favoriteclickHandler(isFavorite, item.id);
    };

    return (
        <div>
            <div className="pokecard" onClick={() => { pokecardClickHandler(item.id) }}>
                <div className="shape" style={{ backgroundColor: PokeColors[item.types[0].type.name] }}>{ }</div>
                <div onClick={favoriteClickHandler}>
                    {
                        isFavorite
                            ? <FavoriteIcon className='hearticon redcol' />
                            : <FavoriteBorderIcon className='hearticon blackcol' />
                    }
                </div>
                <img src={item.sprites.other.dream_world.front_default} alt="" />
                <div className='pokecontent'>
                    <h1>{item.name}</h1>
                    <div>
                        {item.types.map((types, index) => <span key={index} className='types'>{types.type.name}</span>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MemoizedPokecard = React.memo(Pokecard);
MemoizedPokecard.displayName = "Pokecard";

export default MemoizedPokecard;
