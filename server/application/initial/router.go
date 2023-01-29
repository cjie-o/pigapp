package initial

import (
	"server/api"

	"github.com/gin-gonic/gin"
)

// 注册路由器。
func InitRouter() *gin.Engine {

	//新建一个路由
	router := gin.New()

	//注册中间件
	router.Use(gin.Logger(), gin.Recovery())
	router.GET("/", api.Index)
	news := router.Group("api/v1/news")
	{
		news.GET("", api.GetAll)
		news.GET("/tuijian", api.GetNewTJ)
		news.GET("/count", api.GetNumber)
		// users.POST("/add", api.AddUsers)
		// http://127.0.0.1:19787/api/v1/news/type/xinwen
		news.GET("/:typesrc", api.GetTS)
		news.GET("/docid/:docid", api.GetOne)
		// users.POST("/update", api.UpdateUser)
		// users.POST("/del", api.DelUser)
	}

	video := router.Group("api/v1/video")
	{
		video.GET("", api.GetVideo)
		video.GET("/tuijian", api.GetVideoTJ)
		// departments.POST("/add", api.AddUsers)
		video.GET("/:typesrc", api.GetTS)
		video.GET("/docid/:docid", api.GetOne)
		// departments.POST("/update", api.UpdateUser)
		// departments.POST("/del", api.DelUser)
	}

	return router
}
