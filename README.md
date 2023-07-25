# Vue3 博客后端管理系统

# 前言

之前发布了博客前台页面，是基于.NET6编写的。同样其实还有一个后台管理系统，原作者是基于Vue2写的，然后我是在他的基础上改成了Vue3，虽然代码有很多冗余，但是能用。

# 配套后端项目地址

[Personalblog: 可以上传md文件的.net6个人博客系统。 (github.com)](https://github.com/ZyPLJ/personalblog)

# 项目部分截图

## 文章列表

## ![图1](https://gitee.com/zyplj/personalblog-vue/raw/master/博客后台截图/图1.png)

## 分类列表

## ![图2](https://gitee.com/zyplj/personalblog-vue/raw/master/博客后台截图/图2.png)

## 系统主页

## ![图3](https://gitee.com/zyplj/personalblog-vue/raw/master/博客后台截图/图3.png)

## 图片列表

## ![图4](https://gitee.com/zyplj/personalblog-vue/raw/master/博客后台截图/图4.png)

# 下载依赖

```
npm install
```

## 运行

```
npm run serve
```

## 打包

```
npm run build
```

# 运行必看

## 1.修改请求地址

修改目录`src->http->axios.ts`下的请求地址

![请求地址1](https://gitee.com/zyplj/personalblog-vue/raw/master/博客后台截图/请求地址1.png)

![请求地址2](https://gitee.com/zyplj/personalblog-vue/raw/master/博客后台截图/请求地址2.png)

将请求地址修改为你博客后端项目的地址

## 2.修改`vue-waterfall`组件源文件

注意图片中的路径，你首先需要下载依赖才会用`node_modules`目录

如果出现图片访问不到，将下面红框内的代码删除即可。

![图片请求报错解决](https://gitee.com/zyplj/personalblog-vue/raw/master/博客后台截图/图片请求报错解决.png)

## 3.替换`codemirror`依赖

`codemirror`依赖下载地址：[codemirror](http://47.113.150.96:4608/UpLoad/DownloadFile?filepath=%2Fwwwroot%2FUploadFolder%2Fcodemirror.zip)

也可以直接在git上下载，我会放在文件根目录`codemirror`文件夹里面

将`node_modules`目录原来的`codemirror`依赖文件夹删除掉，将下载下来的新的copy进去，如图所示，如果`node_modules`目录下的`codemirror`目录如下则代表成功

![修改依赖](https://gitee.com/zyplj/personalblog-vue/raw/master/博客后台截图/修改依赖.png)

# Docker部署

`Dockerfile`文件已经在目录中，可以直接使用

`default.conf`为`nginx`配置文件，需要根据自己需求修改listen和server_name

![nginx配置](https://gitee.com/zyplj/personalblog-vue/raw/master/博客后台截图/nginx配置.png)

## 将Vue部署到Docker中，请查看该文章

[记录一次vue部署docker步骤 - 妙妙屋（zy） - 博客园 (cnblogs.com)](https://www.cnblogs.com/ZYPLJ/p/17103691.html)

# 声明

**原作者：**[Deali-Axy/StarBlog: ☀☀支持Markdown导入的博客。后端基于最新的.Net6和Asp.Net Core框架，遵循RESTFul接口规范，前端基于Vue+ElementUI开发，可作为 .Net Core 入门项目学习~ (github.com)](https://github.com/Deali-Axy/StarBlog)
