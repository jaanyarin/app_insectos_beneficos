package pe.empresa.insectos.auth.dto;

import io.quarkus.runtime.annotations.RegisterForReflection;
import pe.empresa.insectos.entities.Usuario;

@RegisterForReflection
public class LoginResponse {
    private String token;
    private UserDTO user;

    public LoginResponse() {}

    public LoginResponse(String token, Usuario usuario) {
        this.token = token;
        this.user = new UserDTO(usuario);
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public UserDTO getUser() { return user; }
    public void setUser(UserDTO user) { this.user = user; }

    // Inner DTO class for safe serialization
    @RegisterForReflection
    public static class UserDTO {
        private Integer id;
        private String nombreCompleto;
        private String correoElectronico;
        private String rol;

        public UserDTO() {}

        public UserDTO(Usuario usuario) {
            this.id = usuario.getId();
            this.nombreCompleto = usuario.getNombreCompleto();
            this.correoElectronico = usuario.getCorreoElectronico();
            this.rol = usuario.getRol() != null ? usuario.getRol().getNombre() : "Usuario";
        }

        public Integer getId() { return id; }
        public void setId(Integer id) { this.id = id; }
        public String getNombreCompleto() { return nombreCompleto; }
        public void setNombreCompleto(String nombreCompleto) { this.nombreCompleto = nombreCompleto; }
        public String getCorreoElectronico() { return correoElectronico; }
        public void setCorreoElectronico(String correoElectronico) { this.correoElectronico = correoElectronico; }
        public String getRol() { return rol; }
        public void setRol(String rol) { this.rol = rol; }
    }
}
