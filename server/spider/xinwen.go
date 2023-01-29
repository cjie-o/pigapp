package spider

import (
	"fmt"
	"log"
	"regexp"
	"server/cobug"
	"server/database"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func (t *Tj) Spider(m string, k string, page string, ch chan bool) {
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
				docDetail2.Find("div.zxxwleft > div.zxxw"). //定位到html页面指定元素
										Each(func(i int, s *goquery.Selection) { //循环遍历每一个指定元素
						r1, _ := regexp.Compile(`来源[^|]+`)
						r2 := r1.FindString(s.Text())
						r3, _ := regexp.Compile(`来源([^\s]+)`)
						rr := r3.FindString(r2)
						source := strings.Replace(rr, `来源：`, "", -1)
						r4, _ := regexp.Compile(`[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}\s*[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}`)
						ptime := r4.FindString(r2)
						s.Find("div.show_content>div>span").RemoveAttr("style")
						s.Find("div.show_content>div>span>span").RemoveAttr("style")
						s.Find("div.show_content>div>span>span>span").RemoveAttr("style")
						s.Find("div.show_content>div").BeforeHtml("<p>" + XinwenData.Title + "</p><p>" + source + "\t" + ptime + "</p>")
						bb, _ := s.Find("div.show_content ").Html()
						body := strings.Replace(bb, `  `, "", -1)
						var img [4]string
						t := 0
						for i := 1; i <= 3; i++ {
							img[i], _ = s.Find("div.show_content>div>img:nth-child(" + strconv.Itoa(i) + ")").Attr("src")
							if img[i] != "" {
								t++
							}
							fmt.Println(img[i])
						}
						imgsrcs := ""
						if t == 3 {
							imgsrcs = img[1] + ";" + img[2] + ";" + img[3]
						}
						XinwenData.Source = source
						XinwenData.Ptime = ptime
						XinwenData.Body = body
						XinwenData.Imgsrcs = imgsrcs
						// InsertSql(XinwenData)
						fmt.Println(XinwenData.Imgsrcs)
					})
			}
		})

	if ch != nil {
		ch <- true
	}
}

func InsertSql(XinwenData XinwenData) bool {

	tx, err := database.DB.Begin()

	if err != nil {
		fmt.Println("tx fail", err)
		return false
	}
	stmt, err := tx.Prepare("INSERT IGNORE INTO xinwen(`docid`,`title`,`url`,`imgsrc`,`typesrc`,`source`,`ptime`,`body`) VALUES (?,?,?,?,?,?,?,?)")
	if err != nil {
		fmt.Println("Prepare fail", err)
		return false
	}
	_, err = stmt.Exec(cobug.Md5(XinwenData.Url)+cobug.Md5(XinwenData.Typesrc), XinwenData.Title, XinwenData.Url, XinwenData.Imgsrc, XinwenData.Typesrc, XinwenData.Source, XinwenData.Ptime, XinwenData.Body)
	if err != nil {
		fmt.Println("Exec fail", err)
		return false
	}
	_ = tx.Commit()
	return true

}
