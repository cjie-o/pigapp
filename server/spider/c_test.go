package spider

import (
	"fmt"
	"testing"
)

var (
	aa = NewTj()
)

func Test(t *testing.T) {

	ch := make(chan bool)
	for m := range New().bodyer {
		go aa.Get(New().bodyer[m], 1, ch)
	}
	<-ch
	// for m := range Video().bodyer {
	// 	go aa.Spidervideo(m, Video().bodyer[m], strconv.Itoa(1), ch)
	// 	<-ch
	// }
	close(ch)
	fmt.Println("spider is ok")

}
