export class RegisterRequest {
    constructor(
        public email: string = "",
        public contrasena: string = "",
        public type: string = "",
        public nombre: string = "",
        public apellido: string = "",
        public telefono: string = ""
    ) {}
}
