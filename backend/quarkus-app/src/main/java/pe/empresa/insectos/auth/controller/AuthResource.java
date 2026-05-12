package pe.empresa.insectos.auth.controller;

import org.mindrot.jbcrypt.BCrypt;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import pe.empresa.insectos.auth.dto.LoginRequest;
import pe.empresa.insectos.auth.dto.LoginResponse;
import pe.empresa.insectos.entities.Usuario;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @POST
    @Path("/login")
    @Transactional
    public Response login(LoginRequest request) {
        // First find the user by email
        Usuario user = Usuario.find("correoElectronico", request.email).firstResult();

        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"message\": \"Usuario no encontrado\"}")
                    .build();
        }

        // Check password
        // Transition: Check plain text for '0000' OR BCrypt
        boolean passwordMatch = false;
        if ("0000".equals(user.getPasswordHash()) && "0000".equals(request.password)) {
            passwordMatch = true;
            // Proactively hash it for next time
            user.setPasswordHash(BCrypt.hashpw(request.password, BCrypt.gensalt()));
        } else {
            try {
                passwordMatch = BCrypt.checkpw(request.password, user.getPasswordHash());
            } catch (Exception e) {
                // Handle cases where passwordHash is not a valid BCrypt hash
                passwordMatch = false;
            }
        }

        if (!passwordMatch) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"message\": \"Contraseña incorrecta\"}")
                    .build();
        }

        // Return a mock token and the user data
        return Response.ok(new LoginResponse("dummy-jwt-token", user)).build();
    }
}
