using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WeiXinWeb.Models
{
    public class EventType
    {
        public static string Scancode_waitmsg ()
        {

            return "scancode_waitmsg";

        }
        public static string Scancode_push()
        {

            return "scancode_push";

        }
        public static string Pic_sysphoto()
        {

            return "pic_sysphoto";

        }
        public static string Pic_photo_or_album()
        {

            return "pic_photo_or_album";

        }
        public static string Pic_weixin()
        {

            return "pic_weixin";

        }
    }
    //url跳转
    public class SLMenuModel
    {
        public SLMenuModel()
        {
            this.button = new List<object>();

        }
        [DataMember]
        public List<object> button { set; get; }

    }
    public class ClickButton
    {
        [DataMember]
        public string type { set; get; }
        [DataMember]
        public string name { set; get; }

        [DataMember]
        public string key { set; get; }

    }

    public class ViewButton
    {
        [DataMember]
        public string type { set; get; }
        [DataMember]
        public string name { set; get; }

        [DataMember]
        public string url { set; get; }


    }
    public class EventButton
    {
        [DataMember]
        public string type { set; get; }
        [DataMember]
        public string name { set; get; }

        [DataMember]
        public string url { set; get; }
        [DataMember]
        public List<object> sub_button { set; get; }

        public EventButton()
        {
            this.sub_button = new List<object>();

        }

    }
    public class MoreButton
    {
        [DataMember]
        public string name { set; get; }
        [DataMember]
        public List<object> sub_button { set; get; }

        public MoreButton()
        {
            this.sub_button = new List<object>();

        }

    }
   
}