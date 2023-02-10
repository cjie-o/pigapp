package database

import (
	"errors"

	"gorm.io/gorm"
	// "fa4/web/controller/param"
)

type Tor struct {
	gorm.Model
	Id           int    `gorm:"primaryKey"`
	Sid          string `gorm:"unique"`
	Title        string
	Browse       string
	Photo        string
	Type         string
	Url          string
	Source       string
	Time         string
	Introduction string
	Image1       string
	Image2       string
	Image3       string
	Isimage      int
	Content      string
	Videoimage   string
	Video        string
	Isvideo      int
}

type Data struct {
	gorm.Model
	Id      int   `gorm:"primaryKey"`
	Sid     int64 `gorm:"unique"`
	Content string
}

func NewTor() *Tor {
	return &Tor{}
}
func NewData() *Data {
	return &Data{}
}

func (t *Tor) Creat() error {
	return DB.Omit("id").Create(t).Error
}

func (t *Tor) Updata() error {
	return DB.Updates(t).Error
}
func (t *Tor) Save() error {
	return DB.Save(t).Error
}

func (t *Tor) Delete() error {
	return DB.Delete(t).Error
}

func (t *Tor) QueryById() error {
	return DB.First(t, t.Id).Error
}
func (t *Data) SelectData() ([]*Data, error) {
	ts := make([]*Data, 0, 100)
	err := DB.First(&ts).Error
	return ts, err
}

func (t *Tor) Select() ([]*Tor, error) {
	ts := make([]*Tor, 0, 100)
	err := DB.Order("id desc").Where(t).Find(&ts).Error
	return ts, err
}
func (t *Tor) SelectAll() ([]*Tor, error) {
	ts := make([]*Tor, 0, 100)
	err := DB.Order("id desc").Find(&ts).Error
	return ts, err
}
func (t *Tor) ListWhere(k string) ([]*Tor, error) {
	ts := make([]*Tor, 0, 100)
	err := DB.Where("type =  ?", k).Order("id desc").Find(&ts).Error
	return ts, err
}
func (t *Tor) ListWhereSid(k string) ([]*Tor, error) {
	ts := make([]*Tor, 0, 100)
	err := DB.Find(&ts, "sid = ?", k).Error
	return ts, err
}

func (t *Tor) GetBySids(sids []int) ([]*Tor, error) {
	ts := make([]*Tor, 0, 100)
	err := DB.Order("id desc").Where("sid in  ?", sids).Find(&ts).Error
	return ts, err
}

func (t *Tor) CreateByTors(tors *Tor) error {
	return DB.Create(&tors).Error
}
func (t *Data) CreateByDatas(datas *Data) error {
	return DB.Create(&datas).Error
}

func (t *Tor) SaveALL(tors []*Tor) error {
	if len(tors) == 0 {
		return errors.New("null []*Tor")
	}
	return DB.Save(tors).Error
}

func (t *Tor) GetByStatus(i int) []*Tor {
	ts := make([]*Tor, 0, 100)
	DB.Where("statu = ? ", i).Find(&ts)
	return ts
}

// func (t *Tor) ErrUp() {
// 	DB.Where("statu = ? ", TorStatuUping).Updates(&Tor{Statu: TorStatuUpErr})
// }

// func (t *Tor) WebList(p *param.Page, list *[]*Tor) int {
// 	q := DB.Model(t)
// 	if p.Statu != "" && p.Statu != "-1" {
// 		q.Where("status = ?", p.Statu)
// 	}
// 	var Count int64
// 	q.Count(&Count)
// 	q.Order("id desc").Limit(p.PageSize).Offset((p.PageNum - 1) * p.PageSize).Find(&list)
// 	return int(Count)
// }
