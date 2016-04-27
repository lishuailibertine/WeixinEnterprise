using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WeiXinWeb.Models
{
    public class SLAddressListModel
    {

    }

    public class SLDepartmentModel
    {

        public string name { set; get; }
        public string parentid { set; get; }

        public string order { set; get; }

        public string id { set; get; }

    }

    public class SLUserModel
    {
        public string userid { set; get; }
        public string name { set; get; }
        public Dictionary<string, object> department { set; get; }
        public string position { set; get; }
        public string mobile { set; get; }
        public string gender { set; get; }
        public string email { set; get; }
        public string weixinid { set; get; }
        public string avatar_mediaid { set; get; }

        public SLUserModel()
        {

            this.department = new Dictionary<string, object>();

        }
    }
}