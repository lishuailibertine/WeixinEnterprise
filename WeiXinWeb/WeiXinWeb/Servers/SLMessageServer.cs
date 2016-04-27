using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WeiXinWeb.Models;
using WeiXinWeb.ViewModel;

namespace WeiXinWeb.Servers
{
    public class SLMessageServer
    {

        public void SendMessageToUserID(string userId, string messageContent)
        {

            SLMessageRequest re = new SLMessageRequest();

            SLMessageModel model = new SLMessageModel();
            model.Touser = userId;
            model.Msgtype = "text";
            model.Agentid = 1;
            model.Safe = "0";

            SLMessageContent con = new SLMessageContent();
            con.ContentType = "text";

            con.ContentDic.Add("content", messageContent);

            model.MessageContent = con;


            re.PostWeixin("", model,(string message)=>
            {



            });

        }

    }
}