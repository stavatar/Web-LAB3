import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.bean.ViewScoped;
import javax.faces.component.UIComponent;
import javax.faces.event.ActionEvent;
import java.util.ArrayList;
@ManagedBean
@SessionScoped
public class CollectionPoint
{

   private ArrayList<Point> Points=new ArrayList<>();
   private ArrayList MasX;
   private String textCollection=new String();
   private Double X;

    public ArrayList<Point> getPoints() {

        return Points;
    }
    public  void getMasX()
    {
        ArrayList newmas=new ArrayList<Double>();

        for (Point CurrentPoint: Points)
        {
            newmas.add(CurrentPoint.getX());
        }
        MasX=newmas;
    }
    public  void getStrings()
        {
            String f=new String();
            for (int i=0;i<Points.size();i++)
            {
                f+=Points.get(i).toString()+" ";
            }
        textCollection=f;
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
       // ui.getAttributes().remove("onclick");
        ui.getAttributes().remove("href");
    X= Double.valueOf((String)ui.getAttributes().get("value"));
    }

    public  String  addPoints(Point p)
   {
       p.setX(X);
        Points.add(p);
        return null;
   }
    public void setPoints(ArrayList<Point> points) {
        Points = points;
    }


}
