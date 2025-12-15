package lk.jiat.smarttrade.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "delivery_types")
@NamedQuery(name = "DeliveryType.findByName",query = "FROM DeliveryType dt WHERE dt.name=:name")
public class DeliveryType implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public enum Value {
        WITHIN_CITY("Within City"),
        OUT_OF_CITY("Out of City");
        private final String value;

        Value(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return this.value;
        }
    }
}
