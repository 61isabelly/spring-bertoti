package application.springbertoti.Search;

import application.springbertoti.Search.Model.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
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
}