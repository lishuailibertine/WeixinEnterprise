using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace WeiXinWeb.Models
{
    public class SLEnterpriseModel
    {
        public string Token { set; get; }

        public string AesKey { set; get; }
        public string CordId { set; get; }

        public List<object> ApplicationModelList { set; get; }

        public SLEnterpriseModel()
        {
            this.ApplicationModelList = new List<object>();

        }
    }

    public class SLApplicationModel
    {
        public string Name { set; get; }
        public string AgentId { set; get; }
        public string Corpsecret { set; get; }
    }
}