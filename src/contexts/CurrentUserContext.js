import { createContext } from 'react';

export const CurrentUserContext = createContext({
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: 'https://karez79.github.io/mesto/993f3d93348c99403d38.png'
});
