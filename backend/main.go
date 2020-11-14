package main

import (
	"./calculate"
	"./analizes"
	"./patient"
	"./image"
	"github.com/labstack/echo"
)

func main() {
	e := echo.New()

	e.POST("/analize", analizes.AddAnalize)
	e.GET("/analizes", analizes.GetAnalizes)
	e.POST("/calculate", calculate.Calculate)
	e.POST("/image", image.AddImage)
	e.GET("/images", image.GetImages)
	e.POST("/patient", patient.AddPatient)
	e.GET("/patients", patient.GetPatients)

	e.Static("/", "../build")
	e.Static("/assets", "assets")
	e.Logger.Fatal(e.Start(":1323"))
}
