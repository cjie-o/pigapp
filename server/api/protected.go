package api

import (
	"server/database"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Profile returns user data
func Profile(c *gin.Context) {
	var user database.User

	phone, _ := c.Get("phone") // from the authorization middleware

	result := database.DB.Where("phone = ?", phone.(string)).First(&user)

	if result.Error == gorm.ErrRecordNotFound {
		c.JSON(404, gin.H{
			"msg": "user not found",
		})
		c.Abort()
		return
	}

	if result.Error != nil {
		c.JSON(500, gin.H{
			"msg": "could not get user profile",
		})
		c.Abort()
		return
	}

	user.Password = ""

	c.JSON(200, user)

	return
}
