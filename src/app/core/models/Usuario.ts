export class Usuario {
    public Id: number;
    public Nome: string;
    public Senha: string;
    public Email: string;
    public Cpf: string;
    public DtNascimento: Date;
    public constructor(
        id?: number,
        nome?: string,
        senha?: string,
        email?: string,
        cpf?: string,
        dtnascimento?: Date,
    ){
        this.Id = id || 0;
        this.Nome = nome || '';
        this.Senha = senha || '';
        this.Email = senha || '';
        this.Cpf = cpf || '';
        this.DtNascimento = dtnascimento || new Date();

    }

}