package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/guregu/dynamo"
)

var (
	AccessKey string = os.Getenv("DYNAMO_ACCESS_KEY")
	SecretKey string = os.Getenv("DYNAMO_SECRET_KEY")
	Region    string = os.Getenv("DYNAMO_REGION")
	DBName    string = os.Getenv("DB_NAME")
)

func main() {
	printEnv()
	database := connect()
	table := database.Table(DBName)
	// filterにMap指定
	limitedScanner := table.Scan().Filter("info.friendshipStatusChanged = ?", false).SearchLimit(10000)

	var (
		result  = make([]map[string]interface{}, 0)
		pageKey dynamo.PagingKey
		err     error
	)

	for {
		pageKey, err = limitedScanner.StartFrom(pageKey).AllWithLastEvaluatedKey(&result)
		if err != nil {
			log.Fatal(err)
		}
		if len(pageKey) == 0 {
			break
		}
	}

	if err := writeToJSONFile(result); err != nil {
		log.Fatal(err)
	}

	fmt.Println("completed!")
}

func printEnv() {
	fmt.Println("access_key:", AccessKey)
	fmt.Println("secret_key:", SecretKey)
	fmt.Println("region:", Region)
	fmt.Println("db_name:", DBName)
}

func connect() *dynamo.DB {
	var c = credentials.NewStaticCredentials(AccessKey, SecretKey, "")
	var database = dynamo.New(session.New(), &aws.Config{
		Credentials: c,
		Region:      aws.String(Region),
	})
	return database
}

func writeToJSONFile(out interface{}) error {
	data, err := json.Marshal(out)
	if err != nil {
		return err
	}

	file, err := os.OpenFile("out.json", os.O_CREATE|os.O_RDWR, 0666)
	if err != nil {
		return err
	}

	if _, err := file.Write(data); err != nil {
		return err
	}

	return nil
}
