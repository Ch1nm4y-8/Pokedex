// components/EvolutionTree.jsx
import { useEffect, useState } from 'react';
import EvolutionNode from './EvolutionNode';
import Loader from './Loader';

const EvolutionTree = ({ pokemonId }) => {
    const [tree, setTree] = useState(null);
    const [loading, setLoading] = useState(true);

    async function parseEvolutionChain(chain) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}`);
        const data = await res.json();

        return {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default,
            evolves_to: await Promise.all(
                chain.evolves_to.map(child => parseEvolutionChain(child))
            )
        };
    }

    async function getEvolutionTree(id) {
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const speciesData = await speciesRes.json();

        const evoChainRes = await fetch(speciesData.evolution_chain.url);
        const evoChainData = await evoChainRes.json();

        const tree = await parseEvolutionChain(evoChainData.chain);
        return tree;
    }



    useEffect(() => {
        const fetchTree = async () => {
            const data = await getEvolutionTree(pokemonId);
            setTree(data);
            setLoading(false);
        };

        fetchTree();
    }, [pokemonId]);

    if (loading) return <Loader />;

    return (
        <div className="evolution-tree">
            <h2>Evolution Chain</h2>
            <EvolutionNode node={tree} />
        </div>
    );
};

export default EvolutionTree;
