# Cafe Finder

## Demo 影片連結
https://youtu.be/hHq5gmMKiEA

## 描述這個服務在做什麼
這是一個三人小組所製作，以網路社群方式運作的咖啡廳評價網，使用者在登入後可以自行添加任何想評論的咖啡廳，
被添加的咖啡廳就能被所有其他使用者一起評價。<br>
進入每一家咖啡廳的頁面，會有四個部分:<br>
一: 咖啡廳的基本資料<br>
二: 咖啡廳的各項細項評分，而評分的項目則由使用者自行添加<br>
三: 留言區，使用者可以給出自己對這間咖啡廳的整體評論，並加上留言<br>
四: 2D平面圖，使用者可以用不同顏色標出整個咖啡廳內部的大致分布<br>

## Deploy 連結 (已停用)
https://wpfinalproject-production-28aa.up.railway.app/

## 其他說明
咖啡廳review頁面在輸入並送出後，可能需要重新整理頁面才會刷新。<br>
comment和review頁面，為了避免有人刷評價，同個帳號的重複留言和評分僅會保留最後輸入的<br>
而2D平面圖的部分，因每個人畫出的圖不同，所以按下看其他的圖，就會隨機跳出其中一位使用者畫的圖<br>
因目前添加的咖啡廳很少，如果要搜尋可以打: 西雅圖、伯朗咖啡、starbucks、行路...等咖啡廳（只要餐廳名稱有包含搜尋字串都會顯示）

## 使用與參考之框架/模組/原始碼
Mui template

## 使用之第三方套件、框架、程式碼
後端：graphQL, mongoose
前端：antd, react, react-router-dom, mui, styled-components

## 如何在 localhost 安裝與測試之詳細步驟
複製 cafe-finder 資料夾後，進入 frontend 資料夾打入 yarn install，再進入 backend 資料夾打入 yarn install。
接著要在 backend 資料夾中加上自己的 .env 檔，
最後在 cafe-finder 資料夾中打入 yarn start 開啟前端，打入 yarn server 開啟後端，
此時網頁就應該可以正常操作。<br>
進入網頁後可自行 sign up 一個帳號，再登入就可以使用所有功能了。