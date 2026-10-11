package evento.Enuns;

public enum Roles {
    Admin(1),
    Publico(2),
    Desativado(3);
    private final int codigo;
    Roles(int codigo){
        this.codigo = codigo;
    }
    public int getCodigo(){
        return codigo;
    }
}
