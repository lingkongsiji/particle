const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');

const balls = Array.from({ length: 49 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
    color1: Math.random() * 255,
    color2: Math.random() * 255,
    color3: Math.random() * 255,
}));

while (1) {
    let t = 0;
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const a = balls[i];
            const b = balls[j];
            const distance = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
            if (distance < 16) {
                t++;
                a.x = Math.random() * canvas.width;
                a.y = Math.random() * canvas.height;
                b.x = Math.random() * canvas.width;
                b.y = Math.random() * canvas.height;
            }
        }
    }
    if (t == 0) {
        break;
    }
}

setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //黑洞引力
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = `rgb(90,90,90)`;
    ctx.fill();

    balls.forEach(ball => {
        ball.x += ball.vx;
        ball.y += ball.vy;
        
        if (ball.x < 0) ball.vx = -ball.vx;
        if (ball.x > canvas.width) ball.vx = -ball.vx;
        if (ball.y < 0) ball.vy = -ball.vy;
        if (ball.y > canvas.height) ball.vy = -ball.vy;
        });

    balls.forEach(ball => {
        const distance = Math.sqrt((ball.x - canvas.width / 2) ** 2 + (ball.y - canvas.height / 2) ** 2);
        if (distance < 48) {
            if (ball.x < canvas.width / 2) {
                ball.vx += 0.5;
            } else {
                ball.vx += -0.5;
            }

            // if (ball.y < canvas.height/2) {
            //     ball.vy += 0.5;
            // }else{
            //     ball.vy += -0.5;
            // }
        };

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 4, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = `rgba(${ball.color1} ,${ball.color2},${ball.color3} , 0.5)`;
        ctx.fill();
    });

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const a = balls[i];
            const b = balls[j];
            const distance = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
            if (distance < 8) {
                [a.vx,b.vx] = [b.vx,a.vx];
                [a.vy,b.vy] = [b.vy,a.vy];
            }
            if (distance < 160) {
                ctx.beginPath()
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.closePath();
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = `rgba(${(a.color1 + b.color1) / 2} ,${(a.color2 + b.color2) / 2},${(a.color3 + b.color3) / 2} , 0.5)`;
                ctx.stroke();
            }
        }
    }
}, 1000 / 60);

canvas.addEventListener('mousemove', function (evt) {
    const x = evt.offsetX;
    const y = evt.offsetY;
    
balls[0]={
    x: x,
    y: y,
    vx: 0,
    vy: 0,
    color1: 128,
    color2: 128,
    color3: 128,
}
})

canvas.addEventListener('click', function (evt) {
    const x = evt.offsetX;
    const y = evt.offsetY;

    balls.forEach(v => {
        const distance = Math.sqrt((v.x - x) ** 2 + (v.y - y) ** 2);
        if (distance < 48) {
            if (v.x < x) {
                v.vx += -1;
            } else {
                v.vx += 1;
            }

            if (v.y < y) {
                v.vy += -1;
            } else {
                v.vy += 1;
            }
        }
    })
});