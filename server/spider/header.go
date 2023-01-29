package spider

type Tj struct {
	// cookie string
	header map[string]string
}
type Nw struct {
	// cookie string
	bodyer map[string]string
}
type Vd struct {
	// cookie string
	bodyer map[string]string
}

func NewTj() *Tj {
	t := &Tj{}
	t.header = map[string]string{
		`User-Agent`:                `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0`,
		`Accept`:                    `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8`,
		`Accept-Language`:           `zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2`,
		`Referer`:                   `https://zhuwang.cc/`,
		`Content-Type`:              `application/x-www-form-urlencoded`,
		`Origin`:                    `https://zhuwang.cc/`,
		`Alt-Used`:                  `zhuwang.cc`,
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
	n := &Nw{}
	n.bodyer = map[string]string{
		`shehuiredian`:   `247`, // 社会热点
		`xinwen`:         `58`,  //  国内新闻
		`qihuo`:          `263`, // 生猪货期
		`guojixinwen`:    `147`, // 国际新闻
		`xingyedianping`: `148`, // 行业点评
		`dujiafenxi`:     `149`, // 原创分析
		`hangqingfenxi`:  `81`,  // 行情分析
		`zhuping`:        `70`,  // 每日猪评
		`zhuchangjs`:     `31`,  // 猪场建设
		`shoujing`:       `32`,  // 繁育管理
		`siliaoyy`:       `91`,  // 饲养管理
		`kxyangzhu`:      `35`,  // 猪场管理
		`zhubingfz`:      `29`,  // 猪病技术
		`shengzhu`:       `63`,  // 生猪价格
		`zizhu`:          `64`,  // 仔猪价格
		`zhurou`:         `65`,  // 猪肉价格
		`shengshi`:       `115`, // 各省市猪价
	}
	return n
}

func Video() *Vd {
	v := &Vd{}
	v.bodyer = map[string]string{
		`xinxi`:         `90`,  // 猪业资讯
		`jishushipin`:   `88`,  // 养猪技术
		`meirizhujia`:   `260`, // 每日猪价
		`jiangzuo`:      `92`,  // 专家讲座
		`fangtanshipin`: `93`,  // 人物访谈
		`qiye`:          `94`,  // 企业宣传
		`qitashipin`:    `111`, // 养猪致富
	}
	return v
}
