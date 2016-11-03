#include <CurieBLE.h>

BLEPeripheral blePeripheral; // create peripheral instance
BLEService ledService("19B10010-E8F2-537E-4F6C-D104768A1214"); // create service

// create switch characteristic and allow remote device to read and write
BLECharCharacteristic choice("19B10011-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);

const int inPin = 12;         
const int outPin = 11;
const int pin_datchik_sveta = 10;
const int porog = 200;
char user_choice = 0;
#define SIZE 4       

int state = LOW;      // the current state of the output pin
int reading;           // the current reading from the input pin
int previous = HIGH;    // the previous reading from the input pin

void auto_mode(){

  int light = 0;
  for (int i = 0; i < SIZE; i++){
    light += analogRead(pin_datchik_sveta);
    
  }
  double sred_light = light/SIZE;
  if ( sred_light < porog ){
    state = HIGH;
    user_choice = 1;
  }
  
}

   
void setup()
{
  Serial.begin(9600);
  pinMode(inPin, INPUT);
  pinMode(outPin, OUTPUT);

  // set the local name peripheral advertises
  blePeripheral.setLocalName("Anotole");
  // set the UUID for the service this peripheral advertises:
  blePeripheral.setAdvertisedServiceUuid(ledService.uuid());

  // add service and characteristics
  blePeripheral.addAttribute(ledService);
  blePeripheral.addAttribute(choice);

  choice.setValue(0);

  // advertise the service
  blePeripheral.begin();

  Serial.println("Bluetooth device active, waiting for connections...");
}

void loop()
{ 
  if ( user_choice == 1 ) {
      state = HIGH;
  } 
  if ( user_choice == 0 ) {
    state = LOW; 
  } 

  if( user_choice == 2){
    auto_mode();
  }
  
  reading = digitalRead(inPin);
  if (reading == HIGH && previous == LOW) {
    if (state == HIGH) {
      state = LOW;
      user_choice = 0;
    }
    else {
      state = HIGH;
      user_choice = 1;
    }
  }

  digitalWrite(outPin, state);

  previous = reading;
  
  delay(200);
}

