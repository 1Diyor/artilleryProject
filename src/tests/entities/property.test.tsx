import React from "react";

// addProperties - bu event qandaydur mantiq boicha properties qushadi
// selectProperty - bu event properties tanlashga boglik
// fetchPropertiesFx - async effect, layerni `properties`ni olgani getPropertiesni chaqiradi
// $properties - uzida barcha `properties`ni arraylarini saqlaydi va fetchPropertiesFx effecti yakunlanganda update bo'ladi
// $selectProperties - o'z ichida select qilingan propertieslarni arrayni saqlaydi va selectProperty update bo'lganda update bo'ladi
// *** addProperties eventi ishga tushganda fetchPropertiesFs effecti ishga tushadi