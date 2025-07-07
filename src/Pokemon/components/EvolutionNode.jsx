import React from 'react';
import { useNavigate } from 'react-router-dom';

const EvolutionNode = ({ node }) => {
    const navigate = useNavigate();

    function navigateHandler(id, event) {
        if (!id) return;
        event.stopPropagation();
        navigate(`/details/${id}`)
    }

    return (
        <div className="evo-node">
            <div className="evo-card" onClick={(e) => navigateHandler(node?.id, e)}>
                <img src={node?.image} alt={node?.name} />
                <p>{node?.name}</p>
            </div>

            {node?.evolves_to?.length > 0 && (
                <>
                    <div className="evo-arrow">↓</div>
                    <div className="evo-children">
                        {(node?.evolves_to || []).map((child) => (
                            <EvolutionNode key={child.id} node={child} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};


export default EvolutionNode;
