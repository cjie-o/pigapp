package main

import (
	"server/application"
	"server/config"
	"server/database"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func init() {
}
func main() {
	config.Init()
	database.Init()
	// spider.Run()
	application.Run()

	// // 1. 初始化mysql(自动调用init)，并设置mysql的关闭函数。
	// if database.DB != nil {
	// 	defer database.DB.Close()
	// }

}
