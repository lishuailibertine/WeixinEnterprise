using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WeiXinWeb.Models;

namespace WeiXinWeb.ViewModel
{
    public class SLCommonQYXZSRequest:SLBaseRequest
    {

        public string Corpsecret { set; get; }
        public string Agentid { set; get; }

        public SLCommonQYXZSRequest()
        {

            this.Corpsecret =((SLApplicationModel)this.enterPriseClass.GetApplicationModel(0)).Corpsecret;
            this.Agentid = ((SLApplicationModel)this.enterPriseClass.GetApplicationModel(0)).AgentId;
        }
    }
}