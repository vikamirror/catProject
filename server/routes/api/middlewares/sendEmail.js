import nodemailer from 'nodemailer';

function certificateLetter(newMember) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const options = {
        from: process.env.EMAIL_ACCOUNT,
        to: newMember.email,
        subject: '註冊成功', // 標題
        text: '恭喜註冊成功', // 純文字
        html: '<div>恭喜您</div>', // html內文
    };

    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log('發送郵件出現錯誤, 錯誤訊息:', error);
        } else {
            console.log('郵件已成功送出, 訊息:', info.response);
        }
    });
}

export default certificateLetter;