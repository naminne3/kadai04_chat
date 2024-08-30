
// Firebase設定
const firebaseConfig = {
   


    
    };


// Firebase初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const dbRef = db.ref("chat");



$(document).ready(function() {
    // index.html用: 口コミの表示をリアルタイムで更新
    if ($("#output").length) {
        console.log("口コミ");
        dbRef.on("child_added", function(data) {
            const msg = data.val();
            console.log("New MSG追加", msg);
            const h = `
            <p><strong>${msg.uname}</strong><br>
            ${msg.time}<br>
            <strong>Open/Closed：</strong>
            ${msg.openclose}<br>
            <strong>訪問日：</strong>
            ${msg.date}<br>
            <strong>行った？：</strong>
            ${msg.experience}<br>
            <strong>コメント：</strong>
            ${msg.text}</p>`;
            $("#output").prepend(h); // 最新の口コミが上に表示されるようにprependを使用
        });
    }

    // review.html用: 口コミの投稿
    if ($("#send").length) {
        console.log("送信ボタン");
        $("#send").on("click", function() {
            const nowTime = new Date();
            const nowYear = nowTime.getFullYear();
            const nowMonth = ("0" + (nowTime.getMonth() + 1)).slice(-2); // 月を2桁で表示
            const nowDay = ("0" + nowTime.getDate()).slice(-2); // 日を2桁で表示
            const nowHour = ("0" + nowTime.getHours()).slice(-2); // 時を2桁で表示
            const nowMin = ("0" + nowTime.getMinutes()).slice(-2); // 分を2桁で表示
            const nowSec = ("0" + nowTime.getSeconds()).slice(-2); // 秒を2桁で表示

        // 日付と時間を結合して表示
            const formattedTime = `${nowYear}/${nowMonth}/${nowDay} ${nowHour}:${nowMin}:${nowSec}`;

            const msg = {
                uname: $("#uname").val(),
                text: $("#text").val(),
                time: formattedTime,
                openclose: $("#openclose").val(),
                date: $("#date").val(),
                experience: $("#experience").val(),
                
            };

            console.log("投稿", msg);

            const newPostRef = dbRef.push();
            newPostRef.set(msg, function(error) {
                if (error) {
                    console.error("Error saving message:", error);
                } else {
                    console.log("Message saved successfully.");
                    // 投稿後、index.htmlに戻る
                    window.location.href = "index.html";
                }
            });
        });
    }
});



// 写真ポップアップ
