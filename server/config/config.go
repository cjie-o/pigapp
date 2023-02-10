package config

import "flag"

type cfg struct {
	DbPath string
}

var Cfg *cfg

func Init() {
	Cfg = &cfg{
		DbPath: "E:/www/pigapp/server/database",
	}
	initFlag()
}

var Port string

func initFlag() {
	flag.StringVar(&Port, "p", "0.0.0.0:39090", "web端口，默认0.0.0.0:39090")
}
