import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name= "POINTS")
public class PointTable implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID", nullable = false)
    private Integer id;
    @Column(name = "X", nullable = false)
    private Double x;
    @Column(name = "Y", nullable = false)
    private Float y;
    @Column(name = "R", nullable = false)
    private Float r;
    @Column(name = "CH", nullable = false)
    private boolean Flag1;

    public PointTable() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public Double getX() {
        return this.x;
    }

    public void setX(final Double x) {
        this.x = x;
    }

    public Float getY() {
        return this.y;
    }

    public void setY(final Float y) {
        this.y = y;
    }

    public Float getR() {
        return this.r;
    }

    public void setR(final Float r) {
        this.r = r;
    }

    public Boolean getFlag1() {
        return this.Flag1;
    }

    public void setFlag1(final Boolean ch) {
        this.Flag1 = ch;
    }
}