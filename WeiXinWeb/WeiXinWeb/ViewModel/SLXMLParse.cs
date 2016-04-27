using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using WeiXinWeb.Models;


namespace WeiXinWeb.ViewModel
{
    public class SLXMLParse
    {
        //初步加载xml的内容
        public static void LoadEnterprise(string xmlPath,FuncException<string> func)
        {

          try
          {
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(xmlPath); //加载xml文件
            XmlNode xn = xmlDoc.SelectSingleNode("Enterprise");

            XmlNodeList xnl = xn.ChildNodes;
            XmlNode tokenNode = xnl[0];
            XmlNode aesNode = xnl[1];
            XmlNode corpIdNode = xnl[2];
            XmlNode applicationNode = xnl[3];
            XmlNodeList applicationList = applicationNode.ChildNodes;

            SLEnterPriseClass enterPrise = SLEnterPriseClass.ShareEnterPrise();

            SLEnterpriseModel enterModel = new SLEnterpriseModel();
            enterModel.Token = tokenNode.InnerText;
            enterModel.AesKey = aesNode.InnerText;
            enterModel.CordId = corpIdNode.InnerText;
            enterPrise.enterPeiseModel = enterModel;
                foreach (XmlNode xnf in applicationList)
                {
                    XmlElement xmlModel = (XmlElement)xnf;

                    SLApplicationModel appModel = new SLApplicationModel();
                    appModel.AgentId = xmlModel.GetAttribute("agentid");
                    appModel.Corpsecret = xmlModel.GetAttribute("corpsecret");
                    appModel.Name = xmlModel.GetAttribute("name");
                    enterModel.ApplicationModelList.Add(appModel);
                }
            }

            catch(SystemException e)
            {
                func(e.Message);

            }
           
        }
    }
}