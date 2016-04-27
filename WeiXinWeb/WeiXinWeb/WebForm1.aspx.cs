using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WeiXinWeb.ViewModel;
using WeiXinWeb.Models;
using System.Collections.Specialized;
using WeiXinWeb.Util;
using System.Text;

namespace WeiXinWeb
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SLXMLParse.LoadEnterprise("D:\\测试服务\\WeiXinWeb\\WeiXinWeb\\SLGlobalPage.xml", (string message) =>
             {

                 Console.Write("{0}", message);


             });
            SLMessageRequest re = new SLMessageRequest();

            SLMessageModel model = new SLMessageModel();
            model.Touser = "ishuai";
            model.Msgtype = "text";
            model.Agentid = 3;
            model.Safe = "0";

            SLMessageContent con = new SLMessageContent();
            con.ContentType = "text";

            con.ContentDic.Add("content", "我的<a href=\"http://1492m13p21.iok.la/Weixin/SourceUI/db.html\">流程</a>");

            model.MessageContent = con;


            re.PostWeixin("", model,(string message)=>
            {

                

            });

            // SLAddressRequest requ = new SLAddressRequest();
            // //requ.CreatAddressUser();

            //// requ.UploadForeverFile();

            // requ.SyschronousAddress();

            //xml解析

            //SLXMLParse.LoadEnterprise("D:\\测试服务\\WeiXinWeb\\WeiXinWeb\\SLGlobalPage.xml",(string message)=>
            //{

            //    Console.Write("{0}", message);


            //});

        }

    }
} 