using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace WeiXinWeb.Models
{
    public class SLMessageModel
    {
        [JsonProperty(PropertyName ="touser")]
        public string Touser { set; get; }

        [JsonProperty(PropertyName = "toparty")]
        public string Toparty { set; get; }

        [JsonProperty(PropertyName = "totag")]
        public string Totag { set; get; }

        [JsonProperty(PropertyName = "msgtype")]
        public string Msgtype { set; get; }

        [JsonProperty(PropertyName = "agentid")]
        public int Agentid { set; get; }

        [JsonProperty(PropertyName = "safe")]
        public string Safe { set; get; }

        [JsonIgnore]
        public SLMessageContent MessageContent { set; get; }

        public SLMessageModel()
        {

            this.MessageContent = new SLMessageContent();

        }
    }
    public  class SLMessageContent
    {

        public string ContentType { set; get; }

        public Dictionary<string, object> ContentDic { set; get; }


        public SLMessageContent()
        {

            this.ContentDic = new Dictionary<string, object>();

        }
    }
}