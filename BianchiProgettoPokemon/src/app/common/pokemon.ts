export class Pokemon
{
    id: number;
    name: string;
    officialArtworkNormal: string;
    officialArtworkShiny: string;

    constructor(id: number, name: string, officialArtworkNormal: string, officialArtworkShiny: string)
    {
        this.id = id;
        this.name = name;
        this.officialArtworkNormal = officialArtworkNormal;
        this.officialArtworkShiny = officialArtworkShiny;
    }
}
