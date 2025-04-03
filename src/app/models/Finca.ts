export class Finca {
    constructor(
        public id: number = 0,
        public nombre: string = "",
        public tipoIngreso: string = "",
        public descripcion: string = "",
        public habitaciones: number = 0,
        public banos: number = 0,
        public mascotas: boolean = false,
        public piscina: boolean = false,
        public asador: boolean = false,
        public valorNoche: number = 0,

        public idAdministrador: number | null = null,
        public idDepartamento: number | null = null,
        public idMunicipio: number | null = null,
        public idFoto: number | null = null
    ) {}
}
