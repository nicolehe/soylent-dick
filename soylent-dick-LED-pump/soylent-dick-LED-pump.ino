long startTime;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
//  Serial.setTimeout(10);
  pinMode(11, OUTPUT);
  pinMode(A0, OUTPUT);

}

void loop() {
//  digitalWrite(A0, HIGH);
  if (Serial.available() > 0) {
    char input = Serial.read();  // read first available byte into a variable
    if (input == '0') {          // if the variable equals H, or ASCII 72
      startTime = millis();
      digitalWrite(11, HIGH);
      digitalWrite(A0, HIGH);
    }
  }
  if (millis() - startTime > 3000) {
    digitalWrite(11, LOW);
    digitalWrite(A0, LOW);
  }
}
