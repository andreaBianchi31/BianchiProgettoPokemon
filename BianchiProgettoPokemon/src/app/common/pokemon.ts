export class Pokemon
{
    name: string;
    officialArtworkNormal: string;
    officialArtworkShiny: string;

    constructor(name: string, officialArtworkNormal: string, officialArtworkShiny: string)
    {
        this.name = name;
        this.officialArtworkNormal = officialArtworkNormal;
        this.officialArtworkShiny = officialArtworkShiny;
    }
}
