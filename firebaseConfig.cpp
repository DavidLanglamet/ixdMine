// necessary Firebase headers

#include <iostream>
#include <string>
#include "firebase/app.h"
#include "firebase/analytics.h"

using namespace firebase;

int main() {
    // web app's Firebase configuration
    firebase::AppOptions options = firebase::AppOptions();
    options.set_api_key("AIzaSyAqfKrWkemEdjzj1ar8ZmDtSrvvq7ClXCQ");
    options.set_auth_domain("balance-40f00.firebaseapp.com");
    options.set_project_id("balance-40f00");
    options.set_storage_bucket("balance-40f00.appspot.com");
    options.set_messaging_sender_id("108809610562");
    options.set_app_id("1:108809610562:web:4eba752c6b3ae6497b94db");
    options.set_measurement_id("G-FDYBGBK8P3");

    // Initialize Firebase
    firebase::App* app = firebase::App::Create(options);
    firebase::analytics::Initialize(*app);

    // other Firebase services if it was needed ??

    return 0;
}
