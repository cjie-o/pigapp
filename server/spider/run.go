package spider

import (
	"fmt"
)

var (
	tj = NewTj()
)

func Run() {

	ch := make(chan bool)
	for m := range New().bodyer {
		go tj.Get(New().bodyer[m], 1, ch)
	}
	<-ch
	go tj.Getzx(ch)
	<-ch

	close(ch)
	fmt.Println("spider is ok")

}
