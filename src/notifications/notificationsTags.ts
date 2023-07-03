import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate(){
  OneSignal.sendTags({
    "user_name":"Bruno",
    "user_email":"bvaleiro@gmail.com"
  })
}