package application.springbertoti.Search;

import application.springbertoti.Search.Model.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/searches")

public class SearchController {

    @Autowired
    private SearchRepository searchRepository;


    @GetMapping
    public List<Search> getAllSearches (){
        return searchRepository.findAll();
    }
    @PostMapping
    public Search addSearch (@RequestBody Search search){
        return searchRepository.save(search);
    }

    @PutMapping("/{id}")
    public Search updateSearch (@PathVariable Integer id, @RequestBody Search updatedSearch){
        return searchRepository.findById(id).map(search -> {
            search.setName(updatedSearch.getName());
            search.setDescription(updatedSearch.getDescription());
            search.setCategory(updatedSearch.getCategory());
            return searchRepository.save(search);
        }).orElseThrow(() -> new RuntimeException("Search not found"));

        }

        @DeleteMapping("/{id}")
        public void deleteSearch (@PathVariable Integer id){
        searchRepository.deleteById(id);
    }
}