package spider

import (
	"log"
	"regexp"
	"server/cobug"
	"server/database"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func (t *Tj) Get(k string, page int, ch chan bool) {
	tor := database.Tor{}
	url := `https://www.yangzhu360.com/` + k + `/` + strconv.Itoa(page) + `.html`
	b := cobug.NewBug().SetHeader(t.header).DisAutoLoacationClien().Get(url, nil)
	defer b.Close()
	if b.Err != nil {
		log.Println("err in tj get", b.Err)
		return
	}
	dom, err := goquery.NewDocumentFromReader(b.Response.Body)
	if err != nil {
		log.Println("err in list get deal of new dom", err)
		return
	}
	dom.Find("div.groom_L>div.groom_item").Each(func(_ int, s *goquery.Selection) {
		title := s.Find("div.groom_con>p.groom_tit>a").Text()
		browse := s.Find("div.groom_con>div.groom_info>span.groom_read").Text()
		time := s.Find("div.groom_con>div.groom_info>span.groom_date").Text()
		photo, _ := s.Find("div.groom_img>a>img").Attr("src")
		typesrc := k
		url, _ := s.Find("div.groom_con>p.groom_tit>a").Attr("href")
		sid := cobug.Md5(url) + cobug.Md5(typesrc)
		tor = database.Tor{
			Sid:    sid,
			Title:  title,
			Browse: browse,
			Photo:  photo,
			Type:   typesrc,
			Url:    url,
			Time:   time,
		}

		t.getDeal(tor)
	})
	// return ts
	if ch != nil {
		ch <- true
	}
}
func (t *Tj) getDeal(tor database.Tor) database.Tor {
	b := cobug.NewBug().SetHeader(t.header).DisAutoLoacationClien().Get(tor.Url, nil)
	defer b.Close()
	if b.Err != nil {
		log.Println("err in list get", b.Err)
		// return
	}
	dom, err := goquery.NewDocumentFromReader(b.Response.Body)
	if err != nil {
		log.Println("err in list get deal of xinwen", err)
		// return
	}
	s1 := dom.Find("div.article_div>div.article_timeT>div.article_time>p>span.author").Text()
	t1 := regexp.MustCompile("[\u4E00-\u9FA5]+")
	source := t1.FindString(s1)
	if s1 == "" {
		s2 := dom.Find("div.article_div>div.article_timeT>div.article_time>p>a>span.author").Text()
		source = t1.FindString(s2)
	}
	introduction := dom.Find("div.article_div>div.daodu_div > span").Text()
	dom.Find("div.article_div>div.article_con>p").RemoveAttr("style")
	dom.Find("div.article_div>div.article_con>p>img").RemoveAttr("style")
	r1 := regexp.MustCompile(`https://(.*?).(gif|jpg|png|bmp|jpeg)`)
	// 内容处理
	contentcf, _ := dom.Find("div.article_div>div.article_con").Html()
	f1, _ := regexp.Compile("16px")
	contentc1 := f1.ReplaceAllString(contentcf, "3rem")
	f2, _ := regexp.Compile("18px")
	contentc2 := f2.ReplaceAllString(contentc1, "3.5rem")
	f3, _ := regexp.Compile("25px")
	content3 := f3.ReplaceAllString(contentc2, "4rem")
	f4, _ := regexp.Compile("55px")
	content4 := f4.ReplaceAllString(content3, "4rem")
	f5, _ := regexp.Compile("36px")
	contentc := f5.ReplaceAllString(content4, "4rem")

	content := "<div>" + tor.Title + "</div><div>" + source + "\t\t\t\t" + tor.Time + "</div><div>" + introduction + "</div>" + contentc
	// image := [4]string{}
	isimage := 0
	image := r1.FindAllString(contentc, -1)
	a := 0
	for i, s := range image {
		image[i] = s
		a += 1
	}
	image0 := ""
	image1 := ""
	image2 := ""
	if a < 3 {
		image0 = ""
		image1 = ""
		image2 = ""
	} else {
		isimage = 1
		image0 = image[0]
		image1 = image[1]
		image2 = image[2]

	}
	videoimage := ""
	video := ""
	isvideo := 0
	videourltx, ok := dom.Find("div.article_div>div.article_con>iframe").Attr("src")
	if ok {

		r2 := regexp.MustCompile(`vid=(.*)`)
		videourlnum := r2.FindString(videourltx)
		videotihuan := strings.Replace(videourlnum, "vid=", "", -1)
		videoimage = "https://puui.qpic.cn/vpic_cover/" + videotihuan + "/" + videotihuan + "_hz.jpg"
		videourltxsp := "http://vv.video.qq.com/getinfo?vids=" + videotihuan + "&platform=101001&charge=0&otype=json"
		txsp := cobug.NewBug().SetHeader(t.header).DisAutoLoacationClien().Get(videourltxsp, nil).Body()
		txspt := regexp.MustCompile(`"fvkey":"(.*?)".*?"fn":"(.*?.mp4)".*?"url":"(.*?)"`)
		videourl := txspt.FindStringSubmatch(string(txsp))

		if videourl != nil {
			videozl := videourl[3] + videourl[2] + "?vkey=" + videourl[1]
			cobug.DownLoad(videozl)
			video = "http://192.168.2.6:19787/api/video/url/" + cobug.Md5(videozl) + ".mp4"
			isvideo = 1
		}
	}
	tor = database.Tor{
		Sid:          tor.Sid,
		Title:        tor.Title,
		Browse:       tor.Browse,
		Photo:        tor.Photo,
		Type:         tor.Type,
		Url:          tor.Url,
		Time:         tor.Time,
		Source:       source,
		Introduction: introduction,
		Image1:       image0,
		Image2:       image1,
		Image3:       image2,
		Isimage:      isimage,
		Content:      content,
		Videoimage:   videoimage,
		Video:        video,
		Isvideo:      isvideo,
	}
	database.NewTor().CreateByTors(&tor)
	// fmt.Println(tor)
	return tor
}
