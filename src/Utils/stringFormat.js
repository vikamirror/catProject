export const removeHTMLTag = (htmlString) => {
    return htmlString.replace(/<[^>]+>/g, ' ');
}

export const removeHTMLStyle = (htmlString) => {
    return htmlString.replace(/(style="[^>]+)|(class="[^>]+)/g, ''); // 拿掉任何style, class
}

export const convertFromStringToDom = (htmlString) => {
    const d = document.createElement('div');
    d.innerHTML = htmlString;
    return d.firstChild;
}