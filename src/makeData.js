import Crawler from 'crawler'


export default function getPromo() {

    var title = "";
    var conc = "[";


    var c = new Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server

                $("article").each((ind, it) => {
                    var obj = new Object();
                    var descricaoProduto = $(it).find(".cept-tt.thread-link").text().replace(/(-|\||\,|\;|\[|\]|\{|\}|\(|\)|\"|\')/g, "").trim();
                    var precoProduto = $(it).find(".thread-price").text().trim();
                    if (descricaoProduto != "") {
                        obj.descricaoProduto = descricaoProduto + "##";
                        obj.precoProduto = precoProduto;
                        var jsonString = JSON.stringify(obj);
                        conc += jsonString + ",";
                    }
                }
                )

                var re = /\}\,\]/g;
                var reMoney = /R\$(\d{1,10}|\d{1,3}\.\d{1,3})##/g;
                var reHashtag = /##/g;
                conc += "]";
                var result = re.exec(conc);
                var resultMon = reMoney.exec(conc);
                conc = conc.replace(re, "}]").replace(reMoney, "").replace(reHashtag, "");
            }
            done();
        }
    });


    // Queue just one URL, with default callback
    c.queue("https://www.pelando.com.br/quente");

    var con = JSON.parse(conc);

 
 
    return con;


}




