package database

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {
	var err error
	DB, err = gorm.Open(sqlite.Open("pigDB.db"), &gorm.Config{})
	if err != nil {
		log.Panic("DB connect fail:", err)
	}
	DB.AutoMigrate(&Tor{}, &Data{})
}
