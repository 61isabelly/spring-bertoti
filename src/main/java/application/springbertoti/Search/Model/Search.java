package application.springbertoti.Search.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "search")
public class Search {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Integer id;

    @Column (name = "name")
    private String name;

    @Column (name = "description")
    private String description;

    @Column (name = "category")
    private String category;
}