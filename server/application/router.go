package application

import (
	"server/api"

	"github.com/gin-gonic/gin"
)

// 注册路由器。
func InitRouter() *gin.Engine {
	var tor api.Tor
	var data api.Data

	//新建一个路由
	router := gin.New()

	//注册中间件
	router.Use(gin.Logger(), gin.Recovery())
	router.GET("/", api.Index)
	news := router.Group("api/news")
	{
		news.GET("", tor.ErrTor)
		news.GET("/:type", tor.ErrTor1)
		// news.GET("/sid/:sid", tor.ErrTorSid)
		news.GET("sid/:sid", tor.ErrTorSid)
		// news.GET("/tuijian", api.GetNewTJ)
		// news.GET("/count", api.GetNumber)
		// // users.POST("/add", api.AddUsers)
		// // http://127.0.0.1:19787/api/v1/news/type/xinwen
		// news.GET("/:typesrc", api.GetTS)
		// news.GET("/docid/:docid", api.GetOne)
		// // users.POST("/update", api.UpdateUser)
		// users.POST("/del", api.DelUser)
	}

	video := router.Group("api/video")
	{
		// 	// video.GET("", api.GetVideo)
		// 	// video.GET("/tuijian", api.GetVideoTJ)
		// 	// // departments.POST("/add", api.AddUsers)
		video.GET("url/:video", tor.ErrTorVideo)
		// 	// video.GET("/docid/:docid", api.GetOne)
		// 	// // departments.POST("/update", api.UpdateUser)
		// 	// departments.POST("/del", api.DelUser)
	}

	datas := router.Group("api/datas")
	{
		// 	// video.GET("", api.GetVideo)
		// 	// video.GET("/tuijian", api.GetVideoTJ)
		// 	// // departments.POST("/add", api.AddUsers)
		datas.GET("/", data.ErrData)
		// 	// video.GET("/docid/:docid", api.GetOne)
		// 	// // departments.POST("/update", api.UpdateUser)
		// 	// departments.POST("/del", api.DelUser)
	}

	loginGroup := router.Group("/api/user")
	{
		loginGroup.POST("/login", api.Login)
		loginGroup.POST("/signup", api.Signup)
	}
	protected := router.Group("/api/protected").Use(api.Auth())
	{
		protected.GET("/profile", api.Profile)
	}
	return router
}
