import org.hibernate.Session;
import org.hibernate.query.Query;

import javax.faces.component.UIComponent;
import javax.faces.component.UIForm;
import javax.faces.component.UIInput;
import javax.faces.context.FacesContext;
import javax.faces.event.ComponentSystemEvent;
import javax.faces.event.ComponentSystemEventListener;
import javax.servlet.ServletContext;
import java.io.FileNotFoundException;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

public class HitTest {
    private LinkedList<Point> points = new LinkedList<>();
    private double x;
    private double y;
    private double r=1.0;
    private boolean ch;

    public void setR(double r) {
        this.r = Math.floor(r*100)/1000;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r*10;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    private void setCh(){
        //ch = (x <= 0 && x >= -r && y >=0 && y <= r) || (x >= 0 && y >=0 && y <= r/2 -x) || (x >= 0 && y <= 0 && x*x + y*y <= r*r);
        ch = x>=-r/2 && x<=0 && y<=0 && x*x+y*y<=r*r/4 || x>=0 && x<=r/2 && y<=r && y>=2*x-r;
    }

    public boolean isCh() {
        return ch;
    }

    public void newPoint(){
        setCh();

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        Point p = new Point();
        p.setR(getR());
          p.setX(getX());
        p.setY(getY());
        p.setDt(LocalDateTime.now());
        p.setCh(isCh());
        setPoint(p);

        session.save(p);
        session.getTransaction().commit();
    }

    private void setPoint(Point p){
        if(points.size() > 0 && !Objects.equals(p.getR(), points.getFirst().getR())) {
            points.clear();
        }
        points.add(p);
        if(points.size() > 5)
            points.removeFirst();
    }

    public LinkedList<Point> getPoints(){ return points; }

}
