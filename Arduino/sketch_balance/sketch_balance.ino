#include <AccelStepper.h>  // from https://www.airspayce.com/mikem/arduino/AccelStepper/
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h" //Provide the token generation process info.
#include "addons/RTDBHelper.h" //Provide the RTDB payload printing info and other helper functions.

// Firebase connection data

#define API_KEY "AIzaSyAbayEsSI9NgzFiRI8WfDxDvuGzl2w7or4"
#define DATABASE_URL "https://firecode-56ca4-default-rtdb.europe-west1.firebasedatabase.app"

// Define Firebase Data object

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
unsigned long sendDataPrevMillis = 0;
bool signupOK = false; 

// constants for the wifi connection

const char* ssid = "EMPTY"; //need to be adjusted accordingly
const char* password = "EMPTY"; //need to be adjusted accordingly

// https://www.rapidtables.com/web/color/RGB_Color.html for the colour codes

AccelStepper stepper1(AccelStepper::DRIVER, 18, 5);  //STEP then DIR

const float MS = 16.00;    // Put the Number of Microsteps defined through the 3 pins on the A4988 here. remember to add two decimals: "xx.00"
const float SPR = 200.00;  // Put the Number of Steps your specific stepper takes per revolution. remember to add two decimals: "xx.00"

//The Ratio allows to input the desired position in revolutions instead of steps.
const float Ratio1 = ((MS * (SPR / 360.00)) * 360.00);  //((MicroSteps * (full steps per revolution / full revolution in degrees)) || Decimal places for more precise float values

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// init for demonstration flag

bool isDemo = false;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//LED Setup

int pinR = 15;
int pinG = 2;
int pinB = 4;

byte ValR = 0; // red value for fadetocolour
byte ValG = 0; // green value for fadetocolour
int counter = 0; //counter for offset for fadetocolour function

bool isWhite = true; // bool for termination check leds
bool doesRotate = true; // bool for termination check motor

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// trial rates 

//Pulse

int HR = 10; // trial heart rate
int baserate = 60; //trial base rate

// scalation for switch cases for heart rate.

int IR = (int)HR / baserate * 100; // computes individual pulse index

// scalation for Perceived Stress level 

int stress = 100; // stress value for test

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


// Colour stages for intialisation - to be adjusted later

// Stage 1 (Red): 

int R_0 = 255;
int G_0 = 0;
int B_0 = 0;

int R_1 = 0;
int G_1 = 0;
int B_1 = 255;

// Stage 2 (Deep Blue):

int R_2 = 51;
int G_2 = 51;
int B_2 = 255;

// Stage 3 (Light Blue):

int R_3 = 102;
int G_3 = 102;
int B_3 = 255;


// Stage 4 (White): 

int R_4 = 255;
int G_4 = 160;
int B_4 = 160;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//Acceleration

float AC = 3000.00; // init for acceleration
byte stepcount = 1;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//Mutex Semaphore init

SemaphoreHandle_t taskMutex;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

void getWLAN() {
    Serial.println("Connecting to WiFi...");
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        Serial.println("Connecting...");
    }
    Serial.println("Connected to the WiFi network");
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

void connectToFirebase() {
  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;

    Firebase.begin(&config, &auth);
  }
  else  {
    Serial.printf("Error Message %s\n", config.signer.signupError.message.c_str());
  }
}

void fetchDataFromFirebase() {
  Serial.println("FetchData");
  if (Firebase.RTDB.getInt(&fbdo, "/HeartRate/value")) { // schema according to Darren(?!)
    if (fbdo.dataType() == "int") {
      HR = fbdo.intData();
      Serial.println(HR);
      IR = (int) HR / baserate * 100; 
    }
  }
  else {
    Serial.println(fbdo.errorReason());
  }
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

void setColor() {

  // depending on IR switch state - maybe needs to be adjusted for fine tune later; also refer to IR calc.
  
    Serial.print("Der IR ist: ");
    Serial.println(IR);

    switch(IR) {
    
      case 0 ... 69:
        ValR = 255;
        ValG = 30;
        analogWrite(pinR, R_0);
        analogWrite(pinG, G_0);
        analogWrite(pinB, B_0);
        break;

      case 70 ... 114:
        ValR = R_1;
        ValG = G_1;
        analogWrite(pinR, R_1);
        analogWrite(pinG, G_1);
        analogWrite(pinB, B_1);
        break;

      case 115 ... 164:
        ValR = R_2;
        ValG = G_2;
        analogWrite(pinR, R_2);
        analogWrite(pinG, G_2);
        analogWrite(pinB, B_2);   
        break;

      case 165 ... 204:
        ValR = R_3;
        ValG = G_3;
        analogWrite(pinR, R_3);
        analogWrite(pinG, G_3);
        analogWrite(pinB, B_3);    
        break;

      case 205 ... 500:
        ValR = R_4;
        ValG = G_4;
        analogWrite(pinR, R_4);
        analogWrite(pinG, G_4);
        analogWrite(pinB, B_4);     
        break;
    }
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

void setup() {
  
  Serial.begin (115200);

  getWLAN();
  connectToFirebase();
  fetchDataFromFirebase();

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––  

  //For LED
  pinMode(pinR, OUTPUT);
  pinMode(pinG, OUTPUT);
  pinMode(pinB, OUTPUT);


if (isDemo){

// led init with demonstration values; here stage 4

    ValR = R_4;
    ValG = G_4;
    analogWrite(pinR, R_4);
    analogWrite(pinG, G_4);
    analogWrite(pinB, B_4);    

// rotation speed init, here for medium speed (2000)

    stepper1.setMaxSpeed(2000);
  
} else {
  setColor();

  
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// for rotation speed - updates max speed level in relation to the perceived stress level

    switch(stress){

      case 0 ... 19:
        stepper1.setMaxSpeed(1960);

      case 20 ... 39:
        stepper1.setMaxSpeed(1970);

      case 40 ... 59:
        stepper1.setMaxSpeed(1980);

      case 60 ... 79:
        stepper1.setMaxSpeed(1990);

      case 80 ... 100:
        stepper1.setMaxSpeed(2000);
    }

}   
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    //For Motor -> needs to be adjusted for different rotation speeds
    stepper1.setAcceleration(AC);
    stepper1.run();

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

 // init for concurrency
 
  taskMutex = xSemaphoreCreateMutex(); 

  xTaskCreatePinnedToCore(
      stepmotor,
      "stepmotor",
      1000,
      NULL,
      1,
      NULL,
      1);

  xTaskCreatePinnedToCore(
      leds,
      "leds",
      1000,
      NULL,
      0,
      NULL,
      0);
}


void stepmotor(void *pvParameters) {
  while (1) {
    xSemaphoreTake(taskMutex, portMAX_DELAY);

      if (doesRotate){
        stepper1.run();
        stepper1.moveTo(stepcount * Ratio1);  //go to a new position, in this case always 1 rotation further in same direction
        stepcount = stepcount + 1;            //adjust stepcount accordingly        
      } else {
        stepper1.stop();      
      }
    xSemaphoreGive(taskMutex);
  }
}

void leds(void *pvParameters) {
  
  while (1) {
    
    xSemaphoreTake(taskMutex, portMAX_DELAY);

    if (isWhite) {
      counter = counter + 3;   // normal offset, maybe needs to be adjusted for time
      fadetocolour(pinR, pinG);

    } else {

      // the last colour
      analogWrite(pinR, LOW);
      analogWrite(pinG, LOW);
      analogWrite(pinB, LOW);    
      
    }

    xSemaphoreGive(taskMutex);
    
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}

void loop() {
  // delay(1000); // 1 Seconds
}


void fadetocolour (int pin1, int pin2) { //gradually decreases both green and red light so everything turns bluer and bluer
  byte ValA = ValR - counter;
  byte ValB = ValG - counter;

  analogWrite(pin1, ValA);
  analogWrite(pin2, ValB);

  if (ValA <= 30 || ValB <= 30) { // break condition motor
    doesRotate = false;
    if (ValA <= 20 || ValB <= 20){ // break condition leds
      isWhite = false;
    }
  }
}
