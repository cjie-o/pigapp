package spider

import (
	"fmt"
	"log"
	"server/cobug"
	"server/database"
	"time"

	"github.com/PuerkitoBio/goquery"
)

func (t *Tj) Spidervideo(m string, k string, page string, ch chan bool) {
	var XinwenData XinwenData //实例化结构体
	url := `https://zhuwang.cc/` + m + `/list-` + k + `-` + page + `.html`
	resp := cobug.NewBug().SetHeader(t.header).DisAutoLoacationClien().Get(url, nil)

	if resp.Err != nil {
		log.Fatal(resp.Err)
	}
	defer resp.Close()
	docDetail, err := goquery.NewDocumentFromReader(resp.Response.Body)
	if err != nil {
		fmt.Println("fatal err")
		log.Fatal(err)
	}
	docDetail.Find("div.zxleft3 >ul > li"). //定位到html页面指定元素
						Each(func(i int, s *goquery.Selection) { //循环遍历每一个指定元素
			title := s.Find("p.zxleft31 > a").Text()
			url, ok1 := s.Find("a").Attr("href")
			imgsrc, ok2 := s.Find("a > img").Attr("src")
			if ok1 && ok2 { //将爬取到的内容放进结构体中
				XinwenData.Title = title
				XinwenData.Url = url
				XinwenData.Imgsrc = imgsrc
				XinwenData.Typesrc = m
				// 下一页
				urlchild := XinwenData.Url
				resp2 := cobug.NewBug().SetHeader(t.header).DisAutoLoacationClien().Get(urlchild, nil)

				if resp2.Err != nil {
					log.Fatal(resp2.Err)
				}
				defer resp2.Close()
				docDetail2, err := goquery.NewDocumentFromReader(resp2.Response.Body)
				if err != nil {
					fmt.Println("fatal err")
					log.Fatal(err)
				}
				docDetail2.Find("div.main > div.articleft > div.contant"). //定位到html页面指定元素
												Each(func(i int, s *goquery.Selection) { //循环遍历每一个指定元素
						ptime := s.Find("p.cishu > span:nth-child(2)").Text()
						videourl, ok := s.Find("iframe").Attr("src")
						// body, _ := s.Find("div.show_content").Html()
						if ok {
							XinwenData.Ptime = ptime
							XinwenData.Videourl = videourl
							InsertSqlVideo(XinwenData)
						}
					})
			}
		})
	time.Sleep(2 * time.Second)

	if ch != nil {
		ch <- true
	}
}

func InsertSqlVideo(XinwenData XinwenData) bool {

	tx, err := database.DB.Begin()

	if err != nil {
		fmt.Println("tx fail", err)
		return false
	}
	stmt, err := tx.Prepare("INSERT IGNORE INTO xinwen(`docid`,`title`,`url`,`imgsrc`,`typesrc`,`ptime`,`videourl`) VALUES (?,?,?,?,?,?,?)")
	if err != nil {
		fmt.Println("Prepare fail", err)
		return false
	}
	_, err = stmt.Exec(cobug.Md5(XinwenData.Url)+cobug.Md5(XinwenData.Typesrc), XinwenData.Title, XinwenData.Url, XinwenData.Imgsrc, XinwenData.Typesrc, XinwenData.Ptime, XinwenData.Videourl)
	if err != nil {
		fmt.Println("Exec fail", err)
		return false
	}
	_ = tx.Commit()
	return true

}
