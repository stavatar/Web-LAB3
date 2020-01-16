import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
import java.io.File;

public class HibernateUtil {
    private static final SessionFactory sessionFactory;
    static {
        try {
            ServletContext ctx = (ServletContext) FacesContext
                    .getCurrentInstance().getExternalContext().getContext();
            String deploymentDirectoryPath = ctx.getRealPath("/");
//            sessionFactory = new Configuration()
////                    .configure(new File(deploymentDirectoryPath+"/WEB-INF/hibernate.cfg.xml"))
////                    .buildSessionFactory();
//            sessionFactory = new Configuration().configure("/res/hibernate.cfg.xml").buildSessionFactory();
//            sessionFactory = new Configuration().configure("WEB-INF/hibernate.cfg.xml").buildSessionFactory();
           // sessionFactory = new Configuration().configure("main/resources/").buildSessionFactory();
            sessionFactory = new Configuration().configure(new File(deploymentDirectoryPath+"/main/resources/hibernate.cfg.xml"))
                    .buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}