package spider

import (
	"fmt"
	"server/database"
	"strconv"
)

var (
	tj = NewTj()
)

func Run() {

	ch := make(chan bool)

	for m := range New().bodyer {
		go tj.Spider(m, New().bodyer[m], strconv.Itoa(1), ch)
		<-ch
	}
	for m := range Video().bodyer {
		go tj.Spidervideo(m, Video().bodyer[m], strconv.Itoa(1), ch)
		<-ch
	}
	close(ch)
	fmt.Println("spider is ok")
	database.DB.Close()

}
