using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;
using Tencent;
using WeiXinWeb.Util;

namespace WeiXinWeb.ViewModel
{
    public class SLRequestDataOpertion:SLBaseRequest
    {

        string msg_signature;
        string timestamp;
        string nonce;
        int ret;
        public HttpRequest Request { set; get; }

        public HttpResponse Response { set; get; }

        public string CodeStr { set; get; }
        //构造函数
        public SLRequestDataOpertion(HttpRequest request,HttpResponse response)
        {
            this.Request = request;
            this.Response = response;

            msg_signature = this.Request["msg_signature"];
            timestamp = this.Request["timestamp"];
            nonce = this.Request["nonce"];
            ret = 0;
        }

        private string GetPostStr()
        {
            byte[] b = new byte[(int)this.Request.InputStream.Length];
            this.Request.InputStream.Read(b, 0, (int)this.Request.InputStream.Length);
            return Encoding.UTF8.GetString(b);
        }
        //get
        public void GetRequest()
        {
            //企业二次验证
            SLQYXZSRequestAplication qyxzs = new SLQYXZSRequestAplication();
            bool hh = qyxzs.GetCode(this.Request);
            if (hh)
            {
                return;
            }
            //
            string echostr = this.Request["echostr"];

            string sReplyEchoStr = "";

            WXBizMsgCrypt wxVerifyURL = new WXBizMsgCrypt(this.Token, this.AesKey, this.CorpID);

            ret = wxVerifyURL.VerifyURL(msg_signature, timestamp, nonce, echostr, ref sReplyEchoStr);
            if (ret != 0)
            {
                System.Console.WriteLine("ERR: VerifyURL fail, ret: " + ret);
                return;
            }
            Response.ContentType = "Text/HTML";

            Response.Write(sReplyEchoStr);

        }

      
        public void PostRequest()
        {

            string postData = GetPostStr();

            WXBizMsgCrypt wxVerifyURL = new WXBizMsgCrypt(this.Token, this.AesKey, this.CorpID);

            string msg = "";

            ret = wxVerifyURL.DecryptMsg(msg_signature, timestamp, nonce, postData, ref msg);
            if (ret != 0)
            {
                System.Console.WriteLine("ERR: VerifyURL fail, ret: " + ret);
                return;
            }

            ///返回的密文 xml格式
            ///
            XmlDocument doc = new XmlDocument();
            XmlNode root;
            //明文的post数据
            string sEncryptMsg;
            string eventStr;
            try
            {
                doc.LoadXml(msg);
                root = doc.FirstChild;
                sEncryptMsg = root["FromUserName"].InnerText;
                eventStr = root["Event"].InnerText;
                if (eventStr == "enter_agent")
                {
                    SLGZLAplicationRequest gzlc = new SLGZLAplicationRequest();
                    gzlc.CreatMenu((string message)=>
                    {

                        SLLog.WriteLog("", "", message);

                    });

                }

                SLLog.WriteLog("", "", sEncryptMsg);
            }
            catch (Exception)
            {

            }
            string encryptMsg = "";

            Response.Write(encryptMsg);

        }

    }


}
