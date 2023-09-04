package ecosentry.control.registration.EcoNode;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EcoNodeTokenRepo extends JpaRepository<NodeToken, Long> {
    NodeToken findByToken(String token);
}
