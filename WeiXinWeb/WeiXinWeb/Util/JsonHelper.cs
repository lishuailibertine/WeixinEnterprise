using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace Kenel
{
    public static class JsonHelper
    {
        /// <summary>
        /// 对象转化为JSON字符串
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        public static string JsonSerialize(object o)
        {
            if (o == null)
            {
                throw new ArgumentNullException("o");
            }
            return InternalJsonSerialize(o);
        }

        private static string InternalJsonSerialize(object o)
        {
            if (o == null)
            {
                throw new ArgumentNullException("o");
            }
            JavaScriptSerializer seri = new JavaScriptSerializer();
            return seri.Serialize(o);
        }


        /// <summary>
        /// 将json字符串反序列化为对象(支持泛型)
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="s"></param>
        /// <returns></returns>
        public static T JsonDeserialize<T>(string s)
        {
            if (string.IsNullOrEmpty(s))
            {
                throw new ArgumentNullException("s");
            }

            return (T)InternalJsonDeserialize<T>(s);

        }

        private static object InternalJsonDeserialize<T>(string s)
        {
            if (string.IsNullOrEmpty(s))
            {
                throw new ArgumentNullException("s");
            }
            JavaScriptSerializer seri = new JavaScriptSerializer();
            return seri.Deserialize<T>(s);
        }

        public static T Deserialise<T>(string json)
        {
            T obj = Activator.CreateInstance<T>();
            MemoryStream ms = new MemoryStream(Encoding.Unicode.GetBytes(json));
            DataContractJsonSerializer serialiser = new DataContractJsonSerializer(obj.GetType());
            ms.Close();
            return obj;
        }
    }
}
