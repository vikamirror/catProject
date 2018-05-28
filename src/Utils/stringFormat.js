export const removeHTMLTag = (htmlString) => {
    return htmlString.replace(/<[^>]+>/g, ' ');
}

export const removeHTMLStyle = (htmlString) => {
    return htmlString.replace(/(style="[^>]+)|(class="[^>]+)/g, ''); // 拿掉任何style, class
}

export const removeImgLinkTag = (htmlString) => {
    return htmlString.replace(/(<img[^>]+>)|(<a[^>]+>)|(<\/a>)/gm, ''); // 拿掉<img /><a></a>
};

export const convertFromStringToDom = (htmlString) => {
    const d = document.createElement('div');
    d.innerHTML = htmlString;
    return d.firstChild;
}

export const baseUrl = "http://localhost:3000";