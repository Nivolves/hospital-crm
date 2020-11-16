package image

import (
	"time"
	"encoding/base64"
	"image"
	"strings"
	"os"
	"path/filepath"

	"image/png"
	_ "image/jpeg"
	_ "golang.org/x/image/bmp"

	"github.com/labstack/echo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"../db"
	"net/http"
	"context"
)

type Image struct {
	ImageID   primitive.ObjectID `bson:"_id" json:"imageId,omitempty"`
	PatientID primitive.ObjectID `json:"patientId,omitempty"`
	Name      string `json:"name,omitempty"`
	Type      string `json:"type,omitempty"`
	Date      time.Time `json:"date,omitempty"`
	Link      string `json:"link,omitempty"`
	IsCropped bool `json:"isCropped,omitempty"`
}

func (img *Image) createImage() {
	reader := base64.NewDecoder(base64.StdEncoding, strings.NewReader(img.Link))
	decoded, _, err := image.Decode(reader)
	if err != nil {
		log.Fatal(err)
	}

	filename, err := filepath.Abs("./assets/" + img.Name)
	if err != nil {
		log.Fatal(err)
	}

	file, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE, 0777)
	if err != nil {
		log.Fatal(err)
	}

	err = png.Encode(file, decoded)
	if err != nil {
		log.Fatal(err)
	}

	img.Link = filename
}

func AddImage(c echo.Context) error {
	client, ctx := db.GetDb()
	image := &Image{}
	err := c.Bind(image)
	if err != nil {
    log.Printf("Failed POST image request: %s\n", err)
    return echo.NewHTTPError(http.StatusInternalServerError)
	}

	image.createImage()
	image.Date = time.Now()

	collection := client.Database("hospital-crm").Collection("images")
	insertResult, err := collection.InsertOne(context.Background(), map[string]interface{}{
		"patientId": image.PatientID,
		"name": image.Name,
		"type": image.Type,
		"date": image.Date,
		"isCropped": image.IsCropped,
	})
	if err != nil {
    log.Printf("Failed POST image request: %s\n", err)
    return echo.NewHTTPError(http.StatusInternalServerError)
	}

	image.ImageID = insertResult.InsertedID.(primitive.ObjectID);

	defer client.Disconnect(ctx)

	return c.JSON(http.StatusOK, image)
}

func DeleteImage(c echo.Context) error {
	imagetId := c.Param("id")
	client, ctx := db.GetDb()
	collection := client.Database("hospital-crm").Collection("images")

	oid, err := primitive.ObjectIDFromHex(imagetId)
	if err != nil {
		log.Printf("Failed GET images request: %s\n", err)
    return echo.NewHTTPError(http.StatusInternalServerError)
	}

	_, err = collection.DeleteOne(context.Background(), bson.M{"_id": oid})
	if err != nil {
    log.Printf("Failed DELETE patient request: %s\n", err)
    return echo.NewHTTPError(http.StatusInternalServerError)
	}

	defer client.Disconnect(ctx)

	return c.String(http.StatusOK, imagetId)
}

func GetImages(c echo.Context) error {
	client, ctx := db.GetDb()
	collection := client.Database("hospital-crm").Collection("images")
	patientId := c.Request().Header.Get("patientId")

	oid, err := primitive.ObjectIDFromHex(patientId)
	if err != nil {
		log.Printf("Failed GET images request: %s\n", err)
    return echo.NewHTTPError(http.StatusInternalServerError)
	}

	cur, err := collection.Find(context.Background(), bson.D{primitive.E{Key: "patientId", Value: oid}})
	if err != nil {
    log.Printf("Failed GET images request: %s\n", err)
    return echo.NewHTTPError(http.StatusInternalServerError)
	}
	var images []*Image

	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
    var image Image
    err := cur.Decode(&image)
    if err != nil {
			log.Printf("Failed GET images request: %s\n", err)
			return echo.NewHTTPError(http.StatusInternalServerError)
    }

    images = append(images, &image)
	}

	if err := cur.Err(); err != nil {
		log.Printf("Failed GET images request: %s\n", err)
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	cur.Close(context.Background())

	defer client.Disconnect(ctx)

	return c.JSON(http.StatusOK, images)
}
