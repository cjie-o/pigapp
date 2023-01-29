package model

type XinwenData struct {
	Id       int    `json:"id"`
	Docid    string `json:"docid"`
	Title    string `json:"title"`
	Url      string `json:"url"`
	Imgsrc   string `json:"imgsrc"`
	Imgsrcis string `json:"imgsrcis"`
	Imgsrcs  string `json:"imgsrcs"`
	Typesrc  string `json:"typesrc"`
	Source   string `json:"source"`
	Ptime    string `json:"ptime"`
	Body     string `json:"body"`
	Videourl string `json:"videourl"`
}
