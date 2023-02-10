package spider

type Tj struct {
	// cookie string
	header map[string]string
}
type Nw struct {
	// cookie string
	bodyer map[string]string
}

func NewTj() *Tj {
	t := &Tj{}
	t.header = map[string]string{
		`User-Agent`:                `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0`,
		`Accept`:                    `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8`,
		`Accept-Language`:           `zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2`,
		`Referer`:                   `https://www.yangzhu360.com/`,
		`Content-Type`:              `application/x-www-form-urlencoded`,
		`Origin`:                    `https://www.yangzhu360.com/`,
		`Alt-Used`:                  `yangzhu360.com`,
		`Connection`:                `keep-alive`,
		`Upgrade-Insecure-Requests`: `1`,
		`Sec-Fetch-Dest`:            `document`,
		`Sec-Fetch-Mode`:            `navigate`,
		`Sec-Fetch-Site`:            `same-origin`,
		`Sec-Fetch-User`:            `?1`,
		`Pragma`:                    `no-cache`,
		`Cache-Control`:             `no-cache`,
		`TE`:                        `trailers`,
	}
	return t
}

func New() *Nw {
	return &Nw{
		bodyer: map[string]string{
			`头条`:   `toutiao`,
			`国内`:   `guonei`,
			`国际`:   `guoji`,
			`政策`:   `zhengce`,
			`点评`:   `dianping`,
			`企业`:   `qiye`,
			`展会报道`: `zhanhui`,

			`生猪价格`: `shengzhu`,
			`分析`:   `fenxi`,
			`仔猪价格`: `zizhu`,
			`猪评`:   `zhuping`,
			`饲料价格`: `siliao`,
			`种猪价格`: `zhongzhu`,
			`猪肉价格`: `zhuru`,

			`非洲猪瘟`:  `zhuwen`,
			`生物安全`:  `shenwuanquan`,
			`猪场建设`:  `zcjianshe`,
			`猪病防治`:  `zhubing`,
			`饲料营养`:  `siyang`,
			`繁育技术`:  `fanyu`,
			`猪场管理`:  `zcguanli`,
			`养猪新技术`: `xinjishu`,

			// 爬不到视频
			// short_video 短视频可以爬取
			`新闻视频`: `xinwensp`,
			`猪价播报`: `zhujiabobao`,
			`技术视频`: `jishusp`,
			`企业视频`: `qiyesp`,
			`人物访谈`: `fangtan`,
			`直播养猪`: `zhibo`,

			`时事`: `shishi`,
			`技术`: `jisuzl`,
			`观点`: `guandian`,
			`品牌`: `pinpai`,
			`营销`: `yingxiao`,
			`电商`: `dianshang`,
			`管理`: `guanli`,
			`供求`: `gongqiu`,
		},
	}
}
