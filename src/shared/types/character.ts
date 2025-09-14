export interface ApiCharacter {
    id: number;
    name: string;
    image: string;
    status: CharacterStatus
    episode: string[]
    species: string
    created: string
    //? There are more fields, but we don't need them for the requirements of the challenge
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export interface Character extends Omit<ApiCharacter, 'created' | 'episode'> {
    episodes: string[]
}
    
