package ecosentry.control.userservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.userservice.model.EcoNode;

public interface NodeRepo extends JpaRepository<EcoNode, Long>{
    
}
