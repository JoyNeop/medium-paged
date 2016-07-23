# Medium-Paged

## What Is This?

This script allows you to read on Medium in a paged flavor, removing the negative effects of reading scrolling text.

## Usage

Save this as a bookmarklet:

```
javascript:(function(e){const t="JNMPA_js_10e5117550f34647aee540b4dad9566c",n="JNMPA_ts_c0bf9c435e704e75a3f59b215b1525c8";var o=function(e){var t=document.createElement("script");t.setAttribute("type","text/javascript"),t.innerHTML=e,document.body.appendChild(t)},a=function(){o(localStorage[t])},c=function(){var o=new XMLHttpRequest;o.open("GET",e,!0),o.onload=function(e){var o=document.implementation.createHTMLDocument();o.write(e.target.responseText),localStorage[t]=atob(o.querySelectorAll(".section-content p")[0].innerHTML.replace(/\s/g,"")),localStorage[n]=(new Date).getTime(),a()},o.send()};localStorage[t]&&Number(localStorage[n])>(new Date).getTime()-18e5?a():c()})("https://medium.com/@joyneop/test-e4ec4ea3512b")
```

## Like This Tool?

I appreciate if you *like* [this story on Medium](https://medium.com/@joyneop/read-on-medium-in-a-paged-flavor-c7051f44fa9c).

## License

MIT License. As included as `LICENSE` in this repository.
