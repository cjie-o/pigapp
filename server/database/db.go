package database

import (
	"database/sql"
	"fmt"
	"strings"
)

const (
	USERNAME = "root"
	PASSWORD = ""
	HOST     = "127.0.0.1"
	PORT     = "3306"
	DBNAME   = "pig"
)

var DB *sql.DB

func InitDB() {

	path := strings.Join([]string{USERNAME, ":", PASSWORD, "@tcp(", HOST, ":", PORT, ")/", DBNAME, "?charset=utf8"}, "")
	fmt.Println(path)
	DB, _ = sql.Open("mysql", path)
	DB.SetConnMaxLifetime(10)
	DB.SetMaxIdleConns(5)
	if err := DB.Ping(); err != nil {
		fmt.Println("opon database fail")
		return
	}
	fmt.Println("connnect success")

}
