import javax.faces.bean.ManagedBean;


import java.io.Serializable;

@ManagedBean
public class Point implements Serializable
{
    public Integer getId() {
        return this.id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public void setX(final Double x) {
        this.X = x;
    }


    private Integer id;

    private Double X;

    private Float Y;

    private  Float R;
    private  boolean Flag1;

    public Point() {
    }


    @Override
    public String toString() {
        return "Point{" +
                ", X=" + X +
                ", Y=" + Y +
                ", R=" + R +
                ", Flag=" + Flag1 +
                '}';
    }



    public Double getX() {
        return X;
    }

    public void setX(double x)
    {

        X = x;
    }

    public Float getY() {
        return Y;
    }

    public void setY(Float y) {
        Y = y;
    }

    public Float getR() {
        return R;
    }

    public void setR(Float r) {
        R = r;
    }

    public boolean getFlag1() {
        return Flag1;
    }

    public void setFlag1(boolean flag1) {
        Flag1 = flag1;
    }
}
