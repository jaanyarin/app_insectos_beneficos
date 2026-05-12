package pe.empresa.insectos;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import pe.empresa.insectos.entities.Rol;
import pe.empresa.insectos.entities.Usuario;

import java.util.List;

@Path("/verify")
@Produces(MediaType.APPLICATION_JSON)
public class DataVerificationResource {

    @Inject
    EntityManager em;

    @GET
    @Path("/roles")
    public List<Rol> getRoles() {
        return Rol.listAll();
    }

    @GET
    @Path("/usuarios")
    public List<Usuario> getUsuarios() {
        return Usuario.listAll();
    }
}
