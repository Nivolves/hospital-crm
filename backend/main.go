package main

import (
	"./calculate"
	"./analize"
	"./doctor"
	"./patient"
	"./image"
	"github.com/labstack/echo"
)

func main() {
	e := echo.New()

	e.POST("/analize", analize.AddAnalize)
	e.GET("/analizes", analize.GetAnalizes)
	e.POST("/calculate", calculate.Calculate)
	e.POST("/doctor", doctor.AddDoctor)
	e.GET("/doctor/:id", doctor.GetDoctor)
	e.POST("/image", image.AddImage)
	e.DELETE("/image/:id", image.DeleteImage)
	e.GET("/images", image.GetImages)
	e.POST("/patient", patient.AddPatient)
	e.DELETE("/patient/:id", patient.DeletePatient)
	e.GET("/patients", patient.GetPatients)

	e.Static("/", "../build")
	e.Static("/assets", "assets")
	e.Logger.Fatal(e.Start(":1323"))
}
