using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WeiXinWeb.Models;
using WeiXinWeb.ViewModel;

namespace WeiXinWeb.DLLServers
{
    /// <summary>
    /// SLMessageServer 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    // [System.Web.Script.Services.ScriptService]
    public class SLMessageServer : System.Web.Services.WebService
    {

        [WebMethod]
        public string SendMessageToUserID(string userId, int agentId, string messageContent)
        {

            string mm = null;//错误信息 

            string str = System.AppDomain.CurrentDomain.BaseDirectory;

            string pathStr = string.Format("{0}SLGlobalPage.xml", str);

            SLXMLParse.LoadEnterprise(pathStr, (string message) =>
            {

                Console.Write("{0}", message);
                mm = message;

            });
            if (mm != null)
            {

                return mm;

            }
            SLMessageRequest re = new SLMessageRequest();

            SLMessageModel model = new SLMessageModel();
            model.Touser = userId;
            model.Msgtype = "text";
            model.Agentid = agentId;
            model.Safe = "0";

            SLMessageContent con = new SLMessageContent();
            con.ContentType = "text";

            con.ContentDic.Add("content", messageContent);

            model.MessageContent = con;

            re.PostWeixin("", model, (string message) =>
            {

                mm = message;

            });

            return mm;
        }
    }
}
