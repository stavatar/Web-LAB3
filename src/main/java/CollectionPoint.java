import org.hibernate.Session;
import org.hibernate.SessionFactory;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.persistence.criteria.CriteriaBuilder;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

@ManagedBean
public class CollectionPoint implements Serializable
{

   private ArrayList<Point> Points=new ArrayList<>();
   private String textCollection=new String();
   private Double X;

    public ArrayList<Point> getPoints()
    {
      //  Session session = HibernateUtil.getSessionFactory().openSession();
      //  CriteriaBuilder build=session.getCriteriaBuilder();
       //return (ArrayList<Point>)build.createQuery(PointTable.class);
       Session session = HibernateUtil.getSessionFactory().openSession();

      //  return (ArrayList<Point>) session.createCriteria(PointTable.class).list();
        return  (ArrayList<Point>) session.createQuery("from PointTable").list();


       // return Points;
    }

    public String getTextCollection() {
        return textCollection;
    }

    public void setTextCollection(String textCollection) {
        this.textCollection = textCollection;
    }

    public  void  getXNewPoint(ActionEvent e)
    {

        UIComponent ui=e.getComponent();
      //  UIComponent ui= UIComponent.getCurrentComponent(FacesContext.getCurrentInstance());

        System.out.println(ui.getAttributes().toString());
       Boolean f= ui.getAttributes().containsKey("alt");

        Map<String, Object> map = ui.getAttributes();

        for (Map.Entry<String, Object> pair : map.entrySet())
        {
            String key = pair.getKey();
            Object value = pair.getValue();
            System.out.println(key + ":" + value.toString());
        }
        Double h = null;
      if (f) h=Double.valueOf((String)ui.getAttributes().get("alt"));
        System.out.println(f+"!!!!!!!!!!!!!!!"+h);
         X= h;
    }

    public  String  addPoints(Point p)
   {
       Session session = HibernateUtil.getSessionFactory().openSession();
       session.beginTransaction();
       PointTable newp=new PointTable();



       if (X!=null&&p!=null)
       {
           p.setX(X);
           Boolean f=CheckHit(p);
           p.setFlag1(f);
           Boolean flag=p.getFlag1();
           newp.setFlag1(flag);
           newp.setX(p.getX());
           newp.setFlag1(p.getFlag1());
           newp.setR(p.getR());
           newp.setY(p.getY());
           session.save(newp);
           session.getTransaction().commit();
           Points.add(p);


       }
       else
           if ((p!=null)&&(p.getX()!=null))
           {
               Boolean f=CheckHit(p);
               p.setFlag1(f);
               Boolean flag=p.getFlag1();
               newp.setFlag1(flag);
               newp.setR(p.getR());
               newp.setY(p.getY());
               newp.setX(p.getX());
               session.save(newp);
               session.getTransaction().commit();
               Points.add(p);

           }
          //session.close();
       return null;
   }
    public void setPoints(ArrayList<Point> points) {
        Points = points;
    }

   public Boolean CheckHit(Point p)
   {
       double x=p.getX();
       double y=p.getY();
       double r=p.getR();
       System.out.println("x="+x+"y="+y+"r"+r);
       System.out.println(Math.sqrt(y*y+x*x));
       if((x >= 0 && y >= 0) && (x<r)&&(y<r/2))
       {
           return true;
       } else if(x <= 0 && y >= 0 && (y <= (x+r))){
           return true;
       } else if (x <= 0 && y <= 0 && (r >= Math.sqrt(y*y+x*x))){
           return true;
       } else
           {
           return false;
       }



   }
}
