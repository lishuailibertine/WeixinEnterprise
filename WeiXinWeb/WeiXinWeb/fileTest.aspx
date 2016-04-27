<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fileTest.aspx.cs" Inherits="WeiXinWeb.fileTest" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form action="SLFileHandle.aspx" method="post" enctype="multipart/form-data">
     <input type="file" name="fileUpload" />
     <input type="submit" value="上传文件" />
     </form>
</body>
</html>
