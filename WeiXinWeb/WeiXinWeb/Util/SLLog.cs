using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace WeiXinWeb.Util
{
    public class SLLog
    {

        public static void WriteLog(string type, string className, string content)
        {
            try
            {
                var path = "D:\\基础研发系统\\Log";

                if (!Directory.Exists(path))//如果日志目录不存在就创建
                {
                    Directory.CreateDirectory(path);
                }
                string time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");//获取当前系统时间
                string filename = path + "/" + DateTime.Now.ToString("yyyy-MM-dd") + ".txt";//用日期对日志文件命名
                StreamWriter mySw = File.AppendText(filename);
                string write_content = time + "-" + type + "【" + className + "： " + content + "】\r\n";
                mySw.WriteLine(write_content);
                mySw.Close();
            }
            catch (Exception)
            {

            }
        }

    }
}