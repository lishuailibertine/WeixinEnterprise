using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WeiXinWeb.Models;

namespace WeiXinWeb.ViewModel
{
    public class SLCommonGZLRequest:SLBaseRequest
    {

        public string Corpsecret { set; get; }
        public string Agentid { set; get; }

        public SLCommonGZLRequest()
        {
            this.Corpsecret = ((SLApplicationModel)this.enterPriseClass.GetApplicationModel(1)).Corpsecret;
            this.Agentid = ((SLApplicationModel)this.enterPriseClass.GetApplicationModel(1)).AgentId;
        }
    }
}