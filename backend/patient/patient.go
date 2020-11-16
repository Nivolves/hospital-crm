package patient

import (
	"context"
	"net/http"
	"github.com/labstack/echo"
	"log"
	"../db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Patient struct {
	PatientID  	primitive.ObjectID `bson:"_id" json:"patientId,omitempty"`
	DoctorID 		primitive.ObjectID `json:"doctorId,omitempty"`
	Age 				int `json:"age,omitempty"`
	Height      float32 `json:"height,omitempty"`
	Weight      float32 `json:"weight,omitempty"`
	FirstName   string  `json:"firstName,omitempty"`
	LastName    string  `json:"lastName,omitempty"`
	FathersName string  `json:"fathersName,omitempty"`
	Diagnosis   string  `json:"diagnosis,omitempty"`
}

func AddPatient(c echo.Context) error {
	client, ctx := db.GetDb()
	patient := Patient{}
	
	err := c.Bind(&patient)
  if err != nil {
    log.Printf("Failed POST patient request: %s\n", err)
    return echo.NewHTTPError(http.StatusInternalServerError)
	}

	collection := client.Database("hospital-crm").Collection("patients")
	insertResult, err := collection.InsertOne(context.Background(), map[string]interface{}{
		"doctorId": patient.DoctorID,
		"age": patient.Age,
		"height": patient.Height,
		"weight": patient.Weight,
		"firstName": patient.FirstName,
		"lastName": patient.LastName,
		"fathersName": patient.FathersName,
		"diagnosis": patient.Diagnosis,
	})
	if err != nil {
    log.Printf("Failed POST patient request: %s\n", err)
    return echo.NewHTTPError(http.StatusInternalServerError)
	}

	patient.PatientID = insertResult.InsertedID.(primitive.ObjectID);

	defer client.Disconnect(ctx)

	return c.JSON(http.StatusOK, patient)
}

func DeletePatient(c echo.Context) error {
	patientId := c.Param("id")
	client, ctx := db.GetDb()
	collection := client.Database("hospital-crm").Collection("patients")

	oid, err := primitive.ObjectIDFromHex(patientId)
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

	return c.String(http.StatusOK, patientId)
}

func GetPatients(c echo.Context) error {
	client, ctx := db.GetDb()
	collection := client.Database("hospital-crm").Collection("patients")
	doctorId := c.Request().Header.Get("doctorId")
	oid, err := primitive.ObjectIDFromHex(doctorId)
	if err != nil {
		log.Printf("Failed GET images request: %s\n", err)
    return echo.NewHTTPError(http.StatusInternalServerError)
	}

	cur, err := collection.Find(context.Background(), bson.D{primitive.E{Key: "doctorId", Value: oid}})
	if err != nil {
    log.Printf("Failed GET patients request: %s\n", err)
    return echo.NewHTTPError(http.StatusInternalServerError)
	}
	var patients []*Patient

	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var patient Patient
		err := cur.Decode(&patient)
    if err != nil {
			log.Printf("Failed GET patients request: %s\n", err)
			return echo.NewHTTPError(http.StatusInternalServerError)
    }

    patients = append(patients, &patient)
	}

	if err := cur.Err(); err != nil {
		log.Printf("Failed GET patients request: %s\n", err)
		return echo.NewHTTPError(http.StatusInternalServerError)
	}

	cur.Close(context.Background())

	defer client.Disconnect(ctx)

	return c.JSON(http.StatusOK, patients)
}