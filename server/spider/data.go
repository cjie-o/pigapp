package spider

import (
	"log"
	"server/cobug"
	"server/database"
	"time"

	"github.com/PuerkitoBio/goquery"
)

func (t *Tj) Getzx(ch chan bool) {
	url := "https://www.yangzhu360.com/zhujia/chazhujia"
	a := cobug.NewBug().SetHeader(t.header).DisAutoLoacationClien().Get(url, nil)
	defer a.Close()
	if a.Err != nil {
		log.Println("err in tj get", a.Err)
		return
	}
	dom, err := goquery.NewDocumentFromReader(a.Response.Body)
	if err != nil {
		log.Println("err in list get deal of new dom", err)
		return
	}
	content1, _ := dom.Find("div.zj-trend>div.zj-trend-L").Html()
	url2 := "https://www.yangzhu360.com/zhujia/chazhujia"
	b := cobug.NewBug().SetHeader(t.header).DisAutoLoacationClien().Get(url2, nil)
	defer b.Close()
	if b.Err != nil {
		log.Println("err in tj get", b.Err)
		return
	}
	dom2, err := goquery.NewDocumentFromReader(b.Response.Body)
	if err != nil {
		log.Println("err in list get deal of new dom", err)
		return
	}
	content2, _ := dom2.Find("div.zj-trend").Html()
	content := content1 + content2
	timeUnixNano := time.Now().UnixNano()
	datas := database.Data{
		Sid:     timeUnixNano,
		Content: content,
	}
	database.NewData().CreateByDatas(&datas)
	if ch != nil {
		ch <- true
	}
}
