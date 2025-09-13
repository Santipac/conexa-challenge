export interface ApiCharacter {
    name: string;
    image: string;
    status: CharacterStatus
    episodes: string[]
    species: string
    created: string
    //? There are more fields, but we don't need them for the requirements of the challenge
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type Character = Omit<ApiCharacter, 'created'>;
    
