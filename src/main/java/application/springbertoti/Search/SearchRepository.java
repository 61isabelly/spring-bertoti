package application.springbertoti.Search;

import application.springbertoti.Search.Model.Search;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchRepository extends JpaRepository<Search, Integer> {

}
