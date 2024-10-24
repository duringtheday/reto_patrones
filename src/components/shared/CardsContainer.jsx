// `CardsContainer.jsx`
import { createContext, useState } from "react";
import Cards from './Cards';

// Crear el contexto para manejar las notas
export const CardsContext = createContext();

const CardContainer = () => {
    // Estado para almacenar las tarjetas existentes
    const [cards, setCards] = useState([]);

    // Estado para manejar la nueva tarjeta que se está creando (título y descripción)
    const [newCard, setNewCard] = useState({ title: '', description: '' });

    // Función para agregar una nueva tarjeta a la lista
    const addCard = () => {
        // Solo agregar la tarjeta si el título y la descripción no están vacíos
        if (newCard.title && newCard.description) {
            // Se agrega la nueva tarjeta a la lista de tarjetas existentes
            setCards([...cards, newCard]);
            // Limpiar los campos de la nueva tarjeta después de agregarla
            setNewCard({ title: '', description: '' });
        }
    };

    // Función para eliminar una tarjeta específica según su índice
    const deleteCard = (indexToRemove) => {
        // Filtrar la lista de tarjetas, excluyendo la tarjeta con el índice proporcionado
        const updatedCards = cards.filter((_, index) => index !== indexToRemove);
        // Actualizar el estado con la nueva lista de tarjetas
        setCards(updatedCards);
    };

    // Función para manejar el evento de la tecla Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addCard(); // Si la tecla presionada es Enter, agregar la tarjeta
        }
    };

    return (
        // Proveer el contexto con el estado de las tarjetas, la nueva tarjeta y las funciones
        <CardsContext.Provider value={{ cards, newCard, setNewCard, addCard, deleteCard }}>
            <div>
                <h1>Notes</h1>
                {/* Formulario para agregar una nueva tarjeta */}
                <div>
                    {/* Campo de entrada para el título de la nueva tarjeta */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={newCard.title}
                        onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                        onKeyDown={handleKeyPress} // Captura la tecla Enter
                    />
                    {/* Campo de entrada para la descripción de la nueva tarjeta */}
                    <input
                        type="text"
                        placeholder="Description"
                        value={newCard.description}
                        onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                        onKeyDown={handleKeyPress}
                    />
                    {/* Botón para agregar la nueva tarjeta */}
                    <button onClick={addCard}>Add Note</button>
                </div>
                {/* Componente Cards para mostrar las tarjetas creadas */}
                <Cards />
            </div>
        </CardsContext.Provider>
    );
}

export default CardContainer;
