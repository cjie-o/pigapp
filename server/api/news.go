package api

import (
	"net/http"
	"path"
	"server/database"

	"github.com/gin-gonic/gin"
)

//index
func Index(c *gin.Context) {
	c.String(http.StatusOK, "It works")
}

type Tor struct{}

func (t *Tor) ErrTor(c *gin.Context) {
	d, _ := database.NewTor().SelectAll()
	c.JSON(http.StatusOK, d)
}
func (t *Tor) ErrTor1(c *gin.Context) {
	// Get first matched record
	typesrc := c.Param("type")
	d, _ := database.NewTor().ListWhere(typesrc)
	c.JSON(http.StatusOK, d)
}
func (t *Tor) ErrTorSid(c *gin.Context) {
	// Get first matched record
	sid := c.Param("sid")
	d, _ := database.NewTor().ListWhereSid(sid)
	c.JSON(http.StatusOK, d)
}

func (t *Tor) ErrTorVideo(c *gin.Context) {
	video := c.Param("video")
	filename := path.Join("./video/", video)
	//响应一个文件
	c.File(filename)
}

type Data struct{}

func (t *Data) ErrData(c *gin.Context) {
	d, _ := database.NewData().SelectData()
	c.JSON(http.StatusOK, d)
}

// //获得docid一条记录
// func GetOne(c *gin.Context) {
// 	docid := c.Param("docid")
// 	p := model.XinwenData{
// 		Docid: docid,
// 	}
// 	rs, _ := p.GetRow()
// 	c.JSON(http.StatusOK, gin.H{
// 		docid: rs,
// 	})
// }

// //获得new推荐50条记录
// func GetNewTJ(c *gin.Context) {
// 	p := model.XinwenData{}
// 	rs, _ := p.GetRowNew()
// 	c.JSON(http.StatusOK, gin.H{
// 		"tuijian": rs,
// 	})
// }

// //获得video推荐50条记录
// func GetVideoTJ(c *gin.Context) {
// 	p := model.XinwenData{}
// 	rs, _ := p.GetRowVideo()
// 	c.JSON(http.StatusOK, gin.H{
// 		"tuijian": rs,
// 	})
// }

// //获得所有记录
// func GetNumber(c *gin.Context) {
// 	rs, _ := model.GetRowNumber()
// 	c.JSON(http.StatusOK, gin.H{
// 		"count": rs,
// 	})
// }

// // 获取type记录
// func GetTS(c *gin.Context) {
// 	typesrc := c.Param("typesrc")
// 	p := model.XinwenData{
// 		Typesrc: typesrc,
// 	}
// 	rs, _ := p.GetRowTS()
// 	c.JSON(http.StatusOK, gin.H{
// 		typesrc: rs,
// 	})
// }

// // 获取video记录
// func GetVideo(c *gin.Context) {
// 	p := model.XinwenData{}
// 	rs, _ := p.GetRowBody()
// 	c.JSON(http.StatusOK, gin.H{
// 		"": rs,
// 	})
// }

// //获得所有记录
// func GetAll(c *gin.Context) {
// 	p := model.XinwenData{}
// 	rs, _ := p.GetRows()
// 	c.JSON(http.StatusOK, gin.H{
// 		"": rs,
// 	})
// }

// // //增加一条记录
// // func AddUsers(c *gin.Context) {
// // 	name := c.Request.FormValue("name")
// // 	telephone := c.Request.FormValue("telephone")
// // 	fmt.Println("name:", name)
// // 	fmt.Println("telephone:", telephone)
// // 	if name == "" {
// // 		msg := fmt.Sprintf("name字段错误")
// // 		c.JSON(http.StatusBadRequest, gin.H{
// // 			"msg": msg,
// // 		})
// // 		return
// // 	}
// // 	person := Person{
// // 		Name:      name,
// // 		Telephone: telephone,
// // 	}
// // 	id := person.Create()
// // 	msg := fmt.Sprintf("insert 成功 %d", id)
// // 	c.JSON(http.StatusOK, gin.H{
// // 		"msg": msg,
// // 	})
// // }

// // func UpdateUser(c *gin.Context) {
// // 	ids := c.Request.FormValue("id")
// // 	id, _ := strconv.Atoi(ids)
// // 	telephone := c.Request.FormValue("telephone")
// // 	person := Person{
// // 		Id:        id,
// // 		Telephone: telephone,
// // 	}
// // 	row := person.Update()
// // 	msg := fmt.Sprintf("updated successful %d", row)
// // 	c.JSON(http.StatusOK, gin.H{
// // 		"msg": msg,
// // 	})
// // }

// // //删除一条记录
// // func DelUser(c *gin.Context) {
// // 	ids := c.Request.FormValue("id")
// // 	id, _ := strconv.Atoi(ids)
// // 	row := Delete(id)
// // 	msg := fmt.Sprintf("delete successful %d", row)
// // 	c.JSON(http.StatusOK, gin.H{
// // 		"msg": msg,
// // 	})
// // }
