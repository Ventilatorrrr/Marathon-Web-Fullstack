class Timer
{
    constructor(title, delay, stopCount)
    {
        this.title = title;
        this.delay = delay;
        this.stopCount = stopCount;
    }

    tick()
    {
        this.stopCount = this.stopCount - 1;
        console.log(`Timer ${this.title} Tick! | cycles left ${this.stopCount}`);
        if(this.stopCount === 0)
        {
            this.stop();
        }
    }

    start()
    {
        console.log(`Timer ${this.title} started (delay=${this.delay},  stopCount=${this.stopCount})`);
        this.timer = setInterval(() => this.tick(), this.delay);
    }

    stop()
    {
        clearInterval(this.timer);
        console.log(`Timer ${this.title} stopped`);
    }
}

function runTimer(id, delay, counter)
{
    let timer = new Timer(id, delay, counter);
    timer.start();
}

// runTimer("Bleep", 1000, 5);