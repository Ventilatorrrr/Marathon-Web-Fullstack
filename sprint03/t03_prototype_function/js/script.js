String.prototype.removeDuplicates = function removeDuplicates()
{
    let str = this.replace(/ +(?= )/g,'').trim();
    let res = str.split(' ');

    str = res.filter((item, index, res) => {
        return res.indexOf(item) === index;
    }).join(' ');

    return str;
}
