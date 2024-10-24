// `Cards.jsx`
import { useContext, useState } from "react";
import { CardsContext } from './CardsContainer';

const Cards = () => {
    // Acceder al contexto de notas y la función para eliminar
    const { cards, deleteCard } = useContext(CardsContext);

    // Estado para rastrear el índice de la tarjeta actual
    const [currentIndex, setCurrentIndex] = useState(0);

    // Función para ir a la siguiente tarjeta
    const nextCard = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // Función para ir a la tarjeta anterior
    const prevCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Función para eliminar la tarjeta actual
    const handleDelete = () => {
        deleteCard(currentIndex);

        // Ajustar el índice después de eliminar
        if (currentIndex === cards.length - 1 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1); // Retrocede una tarjeta si estás en la última
        }
    };

    return (
        <div>
            {cards.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Mostrar solo la tarjeta en la posición actual */}
                    <div style={{ border: "1px solid #ccc", padding: "20px", width: "300px", textAlign: "center" }}>
                        <h3>{cards[currentIndex].title}</h3>
                        <p>{cards[currentIndex].description}</p>
                    </div>

                    {/* Botones para navegar */}
                    <div style={{ marginTop: "20px" }}>
                        <button onClick={prevCard} disabled={currentIndex === 0}>
                            Anterior
                        </button>
                        <button onClick={nextCard} disabled={currentIndex === cards.length - 1} style={{ marginLeft: "10px" }}>
                            Siguiente
                        </button>
                    </div>

                    {/* Botón para eliminar la tarjeta */}
                    <button 
                        onClick={handleDelete} 
                        style={{ marginTop: "10px", backgroundColor: "red", color: "white", border: "none", padding: "10px", cursor: "pointer" }}>
                        Eliminar
                    </button>

                    {/* Mostrar el índice actual de la tarjeta */}
                    <p>{`Tarjeta ${currentIndex + 1} de ${cards.length}`}</p>
                </div>
            ) : (
                <p>No notes yet.</p>
            )}
        </div>
    );
}

export default Cards;