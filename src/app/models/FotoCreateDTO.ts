export class FotoCreateDTO {
    constructor(
        public imagenUrl: string = "",

        public idFinca: number | null = null
    ) {}
}