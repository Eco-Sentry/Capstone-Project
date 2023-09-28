package ecosentry.control.userservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.userservice.model.EcoGroup;

public interface GroupRepo extends JpaRepository<EcoGroup, Long>{
    
}
