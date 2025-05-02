export class AvengerQuote
{
    constructor(author, quote, photo, publishDate, comments = []) {
        this.author = author;
        this.quote = quote;
        this.photo = photo;
        this.publishDate = publishDate;
        this.comments = comments;
    }
}
