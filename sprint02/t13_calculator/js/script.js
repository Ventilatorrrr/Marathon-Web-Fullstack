function Calculator()
{
    this.result = 0;
    this.init = (num) =>
    {
        this.result = num
        return this
    };
    this.add = (num) =>
    {
        this.result += num
        return this
    };
    this.sub = function(num)
    {
        this.result -= num;
        return this;
    }
    this.mul = (num) =>
    {
        this.result *= num
        return this
    };
    this.div = (num) =>
    {
        if (num === 0)
        {
            alert("Division by zero is not allowed!");
            return this;
        }
        this.result /= num
        return this
    };
    this.alert = function()
    {
        setTimeout(() =>
        {
            alert(`Result: ${this.result}`);
        }, 5000);
        return this;
    }
}