javascript:
(function (articleUrl) {
    const contentKey = 'JNMPA_js_10e5117550f34647aee540b4dad9566c';
    const timestampKey = 'JNMPA_ts_c0bf9c435e704e75a3f59b215b1525c8';
    var appendEinScriptWithGivenText = function (js_) {
        var scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.innerHTML = js_;
        document.body.appendChild(scriptElement);
    };
    var useCached = function () {
        appendEinScriptWithGivenText(localStorage[contentKey]);
    };
    var useNew = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', articleUrl, true);
        xhr.onload = function (e) {
            var articleDocument = document.implementation.createHTMLDocument();
            articleDocument.write(e.target.responseText);
            localStorage[contentKey] = atob(articleDocument.querySelectorAll('.section-content p')[0].innerHTML.replace(/\s/g, ''));
            localStorage[timestampKey] = (new Date()).getTime();
            useCached();
        };
        xhr.send();
    };
    if (localStorage[contentKey]
        && Number(localStorage[timestampKey]) > (new Date()).getTime() - 30*60*1000) {
        useCached();
    } else {
        useNew();
    }
})('https://medium.com/@joyneop/test-e4ec4ea3512b')
