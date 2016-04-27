using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;
using System.Web.UI;
using System.Web.UI.WebControls;
using Tencent;
using WeiXinWeb.Util;
using WeiXinWeb.ViewModel;


namespace WeiXinWeb
{
    public partial class WebCallBack : System.Web.UI.Page
    {
      
        protected void Page_Load(object sender, EventArgs e)
        {
            SLXMLParse.LoadEnterprise("D:\\测试服务\\WeiXinWeb\\WeiXinWeb\\SLGlobalPage.xml", (string message) =>
            {

                Console.Write("{0}", message);


            });
            //获得accessToken
            SLRequestDataOpertion requestOper = new SLRequestDataOpertion(this.Request, this.Response);

            if (this.Request.RequestType =="GET")
            {

                requestOper.GetRequest();

            }

            if (this.Request.RequestType == "POST")
            {

                requestOper.PostRequest();

            }

            
        }

    }
}