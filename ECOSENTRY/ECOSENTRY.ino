#include <DHT.h>
#include <WiFiS3.h>
#include "Adafruit_PM25AQI.h"
// Make sure this is appropriate for your board. For ESP8266/ESP32 this is correct.

// WiFi and Server Configuration
const char* ssid = "";
const char* password = "";
const char* host = "202.65.64.38";
const int httpPort = 9069;
const char* sentryId = "4ccbdcb5-7271-43bf-985b-2ab564227234";

//Additional type initialization
Adafruit_PM25AQI aqi = Adafruit_PM25AQI();


enum MeasurementType {
  MEASURE_TEMPERATURE,
  MEASURE_HUMIDITY,
  MEASURE_0_3UM,
  MEASURE_0_5UM,
  MEASURE_1_0UM,
  MEASURE_2_5UM,
  MEASURE_5_0UM,
  MEASURE_10_0UM
};

struct SensorConfig {
  uint8_t pin;               // Pin number where the sensor is connected
  uint8_t type;              // Type of DHT sensor (e.g., DHT11)
  MeasurementType measurementType;  // Enum to select temperature or humidity
  String sensorId;           // ID for the sensor
  DHT* dht;                  // Pointer to a DHT sensor object
  
};


// Sensor array configuration
const int numSensors = 8; // Adjust based on the number of sensors
SensorConfig sensors[numSensors] = {
  {2, DHT11, MEASURE_TEMPERATURE, "045e1a92-bbeb-4688-bfdb-3408b86123d6", nullptr},
  {2, DHT11, MEASURE_HUMIDITY, "11f8f53e-a066-4513-8164-2aee325485a2", nullptr},

  {0, DHT11, MEASURE_0_3UM, "316f7cd8-f425-4854-b352-131fc74cc479", nullptr},
  {0, DHT11, MEASURE_0_5UM, "1a63ef59-fda4-4ea3-b720-c5e00eb4fe6b", nullptr},
  {0, DHT11, MEASURE_1_0UM, "14b2cb98-b46a-4129-80bc-96b3aec675bf", nullptr},
  {0, DHT11, MEASURE_2_5UM, "5d1b5340-7806-4300-9d3a-0fc4972c3113", nullptr},
  {0, DHT11, MEASURE_5_0UM, "715468c5-0476-436e-9857-23aa22eeb4ed", nullptr},
  {0, DHT11, MEASURE_10_0UM, "7cdae26e-defc-48f3-b3a5-c047c18b9426", nullptr},
};

WiFiClient client;  // Ensure you have the right library




void setup() {
  Serial.begin(115200);
  while (!Serial) delay(10);
  Serial.println("STARTUP");

  // Initialize DHT sensors
  for (int i = 0; i < numSensors; i++) {
    if (sensors[i].type == DHT11) {
      sensors[i].dht = new DHT(sensors[i].pin, sensors[i].type);
      sensors[i].dht->begin();
    }
  }

  // Startup for Plantower Sensor
  Serial1.begin(9600);
  if (!aqi.begin_UART(&Serial1)) {
    Serial.println("Could not find PM 2.5 sensor!");
    while (1) delay(10);
  } else {
    Serial.println("PM 2.5 sensor initialized successfully!");
  }

  connectToWiFi();
  delay(3000); // Additional delay for sensor warmup
}
void loop() {
  // Reading AQI data
  PM25_AQI_Data data;
  if (!aqi.read(&data)) {
    Serial.println("Could not read from AQI sensor.");
    delay(1000);
    return;
  }

  // Ensuring WiFi connectivity
  if (WiFi.status() != WL_CONNECTED) {
    connectToWiFi(); // Attempt to reconnect if not connected
  }

  // Process sensor data for each sensor
  for (int i = 0; i < numSensors; i++) {
    float value = NAN; // Initialize with Not-A-Number

    // Determine what data to read based on sensor's configuration
    switch (sensors[i].measurementType) {
      case MEASURE_TEMPERATURE:
        value = sensors[i].dht->readTemperature();
        break;
      case MEASURE_HUMIDITY:
        value = sensors[i].dht->readHumidity();
        break;
      case MEASURE_0_3UM:
        value = data.particles_03um;
        break;
      case MEASURE_0_5UM:
        value = data.particles_05um;
        break;
      case MEASURE_1_0UM:
        value = data.particles_10um;
        break;
      case MEASURE_2_5UM:
        value = data.particles_25um;
        break;
      case MEASURE_5_0UM:
        value = data.particles_50um;
        break;
      case MEASURE_10_0UM:
        value = data.particles_100um;
        break;
      default:
        Serial.print("Unknown measurement type for sensor ID: ");
        Serial.println(sensors[i].sensorId);
        continue;
    }

    // Check if the sensor reading was successful
    if (isnan(value)) {
      Serial.print("Failed to read data for sensor ID: ");
      Serial.println(sensors[i].sensorId);
      continue;
    }

    // Output the data for debugging
    Serial.print("Sensor ID: ");
    Serial.print(sensors[i].sensorId);
    Serial.print(" - Measurement: ");
    switch(sensors[i].measurementType) {
      case MEASURE_TEMPERATURE: Serial.print("Temperature"); break;
      case MEASURE_HUMIDITY: Serial.print("Humidity"); break;
      case MEASURE_0_3UM: Serial.print("Particles > 0.3um"); break;
      case MEASURE_0_5UM: Serial.print("Particles > 0.5um"); break;
      case MEASURE_1_0UM: Serial.print("Particles > 1.0um"); break;
      case MEASURE_2_5UM: Serial.print("Particles > 2.5um"); break;
      case MEASURE_5_0UM: Serial.print("Particles > 5.0um"); break;
      case MEASURE_10_0UM: Serial.print("Particles > 10.0um"); break;
    }
    Serial.print(" - Value: ");
    Serial.println(value);

    // Optional: Send data to a server
    sendSensorData(sensors[i].sensorId, value);
  }

  delay(5000); // Delay to reduce load and manage timing
}




void connectToWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected.");
}

void sendSensorData(const String& sensorId, float value) {
  String payload = "{\"sensorId\": \"" + sensorId + "\", \"sentryId\":" + sentryId +", \"value\": " + String(value) + "}";

  Serial.println(payload + "\n");

  if (!client.connect(host, httpPort)) {
    Serial.println("Connection failed");
    return;
  }

  client.println("POST /api/send-data HTTP/1.1");
  client.println("Host: " + String(host));
  client.println("Content-Type: application/json");
  client.print("Content-Length: ");
  client.println(payload.length());
  client.println();
  client.println(payload);

  while (client.available()) {
    char c = client.read();
    Serial.write(c);
  }

  if (!client.connected()) {
    Serial.println("Disconnecting from server.");
    client.stop();
  }
}