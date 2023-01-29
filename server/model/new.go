package model

import (
	"fmt"
	"log"
	"server/cobug"
	"server/database"
)

//插入
func (xinwendata *XinwenData) Create() bool {
	// rs, err := database.DB.Exec("INSERT IGNORE into XinWen (docid,title,url,imgsrc,typesrc,source,ptime,body) value (?,?,?,?,?,?,?,?)", spider.Md5(xinwendata.Url)+spider.Md5(xinwendata.Typesrc), xinwendata.Title, xinwendata.Url, xinwendata.Imgsrc, xinwendata.Typesrc, xinwendata.Source, xinwendata.Ptime, xinwendata.Body)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// id, err := rs.LastInsertId()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// return id
	tx, err := database.DB.Begin()

	if err != nil {
		fmt.Println("tx fail", err)
		return false
	}
	stmt, err := tx.Prepare("INSERT IGNORE INTO xinwen(`docid`,`title`,`url`,`imgsrc`,`typesrc`,`source`,`ptime`,`body`,`videourl`) VALUES (?,?,?,?,?,?,?,?,?)")
	if err != nil {
		fmt.Println("Prepare fail", err)
		return false
	}
	_, err = stmt.Exec(cobug.Md5(xinwendata.Url)+cobug.Md5(xinwendata.Typesrc), xinwendata.Title, xinwendata.Url, xinwendata.Imgsrc, xinwendata.Typesrc, xinwendata.Source, xinwendata.Ptime, xinwendata.Body, xinwendata.Videourl)
	if err != nil {
		fmt.Println("Exec fail", err)
		return false
	}
	_ = tx.Commit()
	return true
}

// 查询一条记录
func (p *XinwenData) GetRow() (xinwendata XinwenData, err error) {
	xinwendata = XinwenData{}
	err = database.DB.QueryRow("select * from xinwen where docid = ?", p.Docid).Scan(&xinwendata.Id, &xinwendata.Docid, &xinwendata.Title, &xinwendata.Url, &xinwendata.Imgsrc, &xinwendata.Typesrc, &xinwendata.Source, &xinwendata.Ptime, &xinwendata.Body, &xinwendata.Videourl)
	return
}

// 查询随机50条记录
func (xinwendata *XinwenData) GetRowNew() (xinwendatas []XinwenData, err error) {

	rowsnumber := 0
	rows, err := database.DB.Query("select count(*) from xinwen")
	for rows.Next() {
		err := rows.Scan(&rowsnumber)
		if err != nil {
			log.Fatal(err)
		}
		// number := rowsnumber
	}
	for _, t := range cobug.GenerateRandomNumber(1, rowsnumber, 50) {
		rows1, _ := database.DB.Query("select * from xinwen where id = ?", t)
		for rows1.Next() {
			xinwendata := XinwenData{}
			err := rows1.Scan(&xinwendata.Id, &xinwendata.Docid, &xinwendata.Title, &xinwendata.Url, &xinwendata.Imgsrc, &xinwendata.Typesrc, &xinwendata.Source, &xinwendata.Ptime, &xinwendata.Body, &xinwendata.Videourl)
			if err != nil {
				log.Fatal(err)
			}
			xinwendatas = append(xinwendatas, xinwendata)
		}
		rows1.Close()
	}
	rows.Close()
	return
}

// 查询随机50条记录
// 注意有问题
func (xinwendata *XinwenData) GetRowVideo() (xinwendatas []XinwenData, err error) {

	rowsnumber := 0
	rows, err := database.DB.Query("(select count(*) from xinwen where body='')as number")
	for rows.Next() {
		err := rows.Scan(&rowsnumber)
		if err != nil {
			log.Fatal(err)
		}
		// number := rowsnumber
	}
	for _, t := range cobug.GenerateRandomNumber(1, rowsnumber, 20) {
		fmt.Println(t)
		rows1, _ := database.DB.Query("select * from number where id = ? and body=''", t)
		for rows1.Next() {
			xinwendata := XinwenData{}
			err := rows1.Scan(&xinwendata.Id, &xinwendata.Docid, &xinwendata.Title, &xinwendata.Url, &xinwendata.Imgsrc, &xinwendata.Typesrc, &xinwendata.Source, &xinwendata.Ptime, &xinwendata.Body, &xinwendata.Videourl)
			if err != nil {
				log.Fatal(err)
			}
			xinwendatas = append(xinwendatas, xinwendata)
		}
		rows1.Close()
	}
	rows.Close()
	return
}

// 查询总数记录
func GetRowNumber() (number int, err error) {
	rowsnumber := 0
	rows, err := database.DB.Query("select count(*) from xinwen")
	for rows.Next() {
		err := rows.Scan(&rowsnumber)
		if err != nil {
			log.Fatal(err)
		}
		number = rowsnumber
	}
	rows.Close()
	return
}

// 查询type
func (xinwendata *XinwenData) GetRowTS() (xinwendatas []XinwenData, err error) {
	rows, err := database.DB.Query("select * from xinwen where typesrc = ?", xinwendata.Typesrc)
	for rows.Next() {
		xinwendata := XinwenData{}
		err := rows.Scan(&xinwendata.Id, &xinwendata.Docid, &xinwendata.Title, &xinwendata.Url, &xinwendata.Imgsrc, &xinwendata.Typesrc, &xinwendata.Source, &xinwendata.Ptime, &xinwendata.Body, &xinwendata.Videourl)
		if err != nil {
			log.Fatal(err)
		}
		xinwendatas = append(xinwendatas, xinwendata)
	}
	rows.Close()
	return
}

// 查询body为空
func (xinwendata *XinwenData) GetRowBody() (xinwendatas []XinwenData, err error) {
	rows, err := database.DB.Query("select * from xinwen where body = ''")
	for rows.Next() {
		xinwendata := XinwenData{}
		err := rows.Scan(&xinwendata.Id, &xinwendata.Docid, &xinwendata.Title, &xinwendata.Url, &xinwendata.Imgsrc, &xinwendata.Typesrc, &xinwendata.Source, &xinwendata.Ptime, &xinwendata.Body, &xinwendata.Videourl)
		if err != nil {
			log.Fatal(err)
		}
		xinwendatas = append(xinwendatas, xinwendata)
	}
	rows.Close()
	return
}

// //查询所有记录
func (xinwendata *XinwenData) GetRows() (xinwendatas []XinwenData, err error) {
	rows, err := database.DB.Query("select * from xinwen")
	for rows.Next() {
		xinwendata := XinwenData{}
		err := rows.Scan(&xinwendata.Id, &xinwendata.Docid, &xinwendata.Title, &xinwendata.Url, &xinwendata.Imgsrc, &xinwendata.Typesrc, &xinwendata.Source, &xinwendata.Ptime, &xinwendata.Body, &xinwendata.Videourl)
		if err != nil {
			log.Fatal(err)
		}
		xinwendatas = append(xinwendatas, xinwendata)
	}
	rows.Close()
	return
}

// //修改
// func (xinwendata *XinwenData) Update() int64 {
// 	rs, err := database.DB.Exec("update users set telephone = ? where id = ?", xinwendata.Telephone, xinwendata.Id)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	rows, err := rs.RowsAffected()
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	return rows
// }

// //删除一条记录
// func Delete(id int) int64 {
// 	rs, err := database.DB.Exec("delete from users where id = ?", id)
// 	if err != nil {
// 		log.Fatal()
// 	}
// 	rows, err := rs.RowsAffected()
// 	if err != nil {
// 		log.Fatal()
// 	}
// 	return rows
// }
