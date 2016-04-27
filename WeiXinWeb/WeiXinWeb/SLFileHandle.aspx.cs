using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WeiXinWeb.ViewModel.FileOperation;

namespace WeiXinWeb
{
    public partial class SLFileHandle : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SLFileProcess.ProcessRequest(Context);

        }
    }
}