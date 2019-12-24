import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.bean.SessionScoped;

import javax.persistence.*;
@ManagedBean

public class Point
{

    private Integer id;

    private  Float R;



    private double X;

    private Float Y;

    private  Boolean Flag;
    private int count;
    public int getCount() {
        return count;
    }

    @Override
    public String toString() {
        return "Point{" +
                "count=" + count +
                ", X=" + X +
                ", Y=" + Y +
                ", R=" + R +
                ", Flag=" + Flag +
                '}';
    }

    public void setCount(int count) {
        this.count = count;
    }

    public double getX() {
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

    public Boolean getFlag() {
        return Flag;
    }

    public void setFlag(Boolean flag) {
        Flag = flag;
    }
}
