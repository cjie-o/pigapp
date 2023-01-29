-- 新闻
CREATE TABLE IF NOT EXISTS `xinwen`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `docid` VARCHAR(255) NOT NULL,
   `title` VARCHAR(255) NOT NULL,
   `url` VARCHAR(255) NOT NULL,
   `imgsrc` VARCHAR(255) NOT NULL,
   `imgsrcis` VARCHAR(255) NOT NULL,
   `imgsrcs` VARCHAR(255) NOT NULL,
   `typesrc` VARCHAR(255) NOT NULL,
   `source` VARCHAR(255) DEFAULT '',
   `ptime` DATETIME NOT NULL,
   `body` TEXT NOT NULL,
   `videourl` VARCHAR(255) DEFAULT '',
   PRIMARY KEY ( `id` ),
   UNIQUE INDEX (`docid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
