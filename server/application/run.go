package application

func Run() {
	router := InitRouter()

	// 这里还可以创建其他的服务
	// ...
	// router := gin.New()
	// router.Use(gin.Logger(), gin.Recovery())
	// router.POST("/login", v1.Login)
	router.Run(":19787")
}
