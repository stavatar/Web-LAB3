import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator ("formValidator")
public class Util implements Validator
{



    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException
    {
        {
            try{
                if(o.toString().length()==0){return;}
                if(o.toString().trim()==""){return;}
                Double val= Double.parseDouble(o.toString());
                if(val==7){return;}
                if(val>=5||val<=-3){
                    FacesMessage msg =new FacesMessage("Проверьте, промежуток!");
                    msg.setSeverity(FacesMessage.SEVERITY_ERROR);
                    throw new ValidatorException(msg);
                }
            }
            catch(IllegalArgumentException e){
                FacesMessage msg =new FacesMessage("Проверьте,что вы ввели именно число!");
                msg.setSeverity(FacesMessage.SEVERITY_ERROR);
                throw new ValidatorException(msg);
            }
        }
    }
}
