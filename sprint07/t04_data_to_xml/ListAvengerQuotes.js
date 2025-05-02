import { AvengerQuote } from './AvengerQuote.js';
import { Comment } from './Comment.js';

export class ListAvengerQuotes
{
    constructor(quotes = []) {
        this.quotes = quotes;
    }

    toXML()
    {
        let xml = `<avengerQuotes>\n`;
        for (const quote of this.quotes) {
            xml += `  <avengerQuote>\n`;
            xml += `    <author>${quote.author}</author>\n`;
            xml += `    <quote>${quote.quote}</quote>\n`;
            xml += `    <photos>\n`;
            for (const photo of quote.photo) {
                xml += `      <photo>${photo}</photo>\n`;
            }
            xml += `    </photos>\n`;
            xml += `    <publishDate>${quote.publishDate}</publishDate>\n`;
            xml += `    <comments>\n`;
            for (const comment of quote.comments) {
                xml += `      <comment>\n`;
                xml += `        <date>${comment.date}</date>\n`;
                xml += `        <text>${comment.comment}</text>\n`;
                xml += `      </comment>\n`;
            }
            xml += `    </comments>\n`;
            xml += `  </avengerQuote>\n`;
        }
        xml += `</avengerQuotes>`;
        return xml;
    }

    static fromXML(xmlStr)
    {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlStr, "application/xml");
        const quotes = [];

        const avengerQuoteElems = xml.querySelectorAll('avengerQuote');
        avengerQuoteElems.forEach(aq => {
            const author = aq.querySelector('author')?.textContent || '';
            const quote = aq.querySelector('quote')?.textContent || '';
            const photos = Array.from(aq.querySelectorAll('photos > photo')).map(p => p.textContent);
            const publishDate = aq.querySelector('publishDate')?.textContent || '';
            const comments = Array.from(aq.querySelectorAll('comments > comment')).map(c =>
                    new Comment(
                            c.querySelector('date')?.textContent || '',
                            c.querySelector('text')?.textContent || ''
                    )
            );

            quotes.push(new AvengerQuote(author, quote, photos, publishDate, comments));
        });

        return new ListAvengerQuotes(quotes);
    }
}
